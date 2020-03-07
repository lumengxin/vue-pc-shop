var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Goods = require('../models/goods');

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/vue_pc_shop');

mongoose.connection.on("connected", function() {
  console.log("mongodb connected success..")
})

mongoose.connection.on("error", function() {
  console.log("mogondb connected failed..")
})

mongoose.connection.on("disconnected", function() {
  console.log("mongodb connected disconnected..")
})

// router.get('/', function(req, res, next) {
//   res.send('创建goods路由');
// });

/* 查询商品列表数据 */
router.get("/list", function(req, res, next) {
  // 分页
  let page = parseInt(req.param("page"))
  let pageSize = parseInt(req.param("pageSize"))
  let sort = req.param("sort")
  let skip = (page - 1) * pageSize

  // 价格排序
  let params = {}
  let priceLevel = req.param("priceLevel")
  var priceGt = ''
  var priceLte = ''
  if(priceLevel !== 'All') {
    switch(priceLevel) {
      case '0' : priceGt = 0; priceLte = 100; break;
      case '1' : priceGt = 100; priceLte = 500; break;
      case '2' : priceGt = 500; priceLte = 1000; break;
      case '3' : priceGt = 1000; priceLte = 5000; break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  goodsModel.sort({'salePrice': sort})
  goodsModel.exec(function(err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

/* 添加到购物车 */
router.post("/addCart", function (req,res,next) {
  var userId = '100000077';
  var productId = req.body.productId;
  var User = require('../models/user');
  User.findOne({userId:userId}, function (err,userDoc) {
    if(err){
        res.json({
            status:"1",
            msg:err.message
        })
    }else{
        console.log("userDoc:"+userDoc);
        if(userDoc){
          var goodsItem = '';
          userDoc.cartList.forEach(function (item) {
              if(item.productId == productId){
                goodsItem = item;
                item.productNum ++;
              }
          });
          if(goodsItem){
            userDoc.save(function (err2,doc2) {
              if(err2){
                res.json({
                  status:"1",
                  msg:err2.message
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'suc'
                })
              }
            })
          }else{
            Goods.findOne({productId:productId}, function (err1,doc) {
              if(err1){
                res.json({
                  status:"1",
                  msg:err1.message
                })
              }else{
                if(doc){
                  doc.productNum = 1;
                  doc.checked = 1;
                  userDoc.cartList.push(doc);
                  userDoc.save(function (err2,doc2) {
                    if(err2){
                      res.json({
                        status:"1",
                        msg:err2.message
                      })
                    }else{
                      res.json({
                        status:'0',
                        msg:'',
                        result:'suc'
                      })
                    }
                  })
                }
              }
            });
          }
        }
    }
  })
});

module.exports = router;
