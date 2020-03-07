var express = require('express');
var router = express.Router();

var User = require('./../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('users中的二级路由');
});

/* 用户登录 */
router.post('/login', function(req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }

  User.findOne(param, function(err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if(doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000*60*60
        });
        // req.session.user = doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
})

/* 用户登出 */
router.post("/logout", function(req, res, next) {
  res.cookie("userId", "", {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

module.exports = router;
