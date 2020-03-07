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

module.exports = router;