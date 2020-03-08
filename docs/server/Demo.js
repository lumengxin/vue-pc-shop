// node环境完全支持es6语法
let user = require('./User')

console.log(`userName: ${user.userName}`)

console.log(`say(): ${user.sayHello()}`)

/* 创建一个http */
let http = require('http')
// url 模块，解析请求头
let url = require('url')
// 调试
let util = require('util')

let server = http.createServer((req, res) => {
  res.statusCode = 200

  res.setHeader("Content-Type", "text/plain; charset=utf-8")

  // res.end("Hello, node.js")
  // 获取的不是完整的url, parse将url转换为对象
  console.log("url: " + req.url)
  res.end(util.inspect(url.parse(req.url)))

})

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器已经运行，浏览器中访问 http://127.0.0.1:3000')
})
