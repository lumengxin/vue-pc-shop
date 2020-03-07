
// 静态数据 public目录下静态资源不会被webpack处理
// 直接拷贝，可以直接访问该目录下资源
// public/mock/goods.json

module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}

// axios.get('/api/goods.json')
//  .then(res => {
//    cosole.log(res.data)
//  })


// const mockGoodsData = require("./mock/goods.json")
/* const mockGoodsData = require("./public/mock/goods.json")

module.exports = {
    devServer: {
        port: 8080,
        open: true,
        before(app) {
          app.get("/api/goods", (req, res) => {
            res.json(mockGoodsData)
          })
        }
    }
}
 */
