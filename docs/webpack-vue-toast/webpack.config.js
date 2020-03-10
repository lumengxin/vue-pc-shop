var path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/lib/index.js',
  output: {
    path:path.join(__dirname, './dist'),
    filename:'webpack-vue-toast.js',
    // 指定文件输出格式(amd, cmd, commonjs)。umd 各种格式 window.WebpackVueToast ..
    // libraryTarget: 'amd',
    libraryTarget: 'umd',
    // 打包后库的名字
    library: 'WebpackVueToast'
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.scss$/,
        use:['style-loader','css-loader','sass-loader']
      },
      {
        test:/\.js$/,
        use:'babel-loader',
        exclude:/node_modules/
      },
      {
        test:/\.vue$/,
        use:'vue-loader'
      }
    ]
  },
  plugins: [
    /* vue-loader > 15.x，时需要使用 */
    new VueLoaderPlugin()
  ]
}
