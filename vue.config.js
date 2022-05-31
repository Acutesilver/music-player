const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  // devServer: {
  //   host: 'localhost', // 本地域名/ip地址
  //   port: '8080', // 端口号
  //   proxy: { // 配置跨域
  //     '/apis': {
  //       target: 'localhost:3000/', // 需要代理的地址
  //       changeOrigin: true, // 允许跨域
  //       pathRewrite: {
  //         '^/apis': '', // 路径重写，将前缀/apis转为"/"，也可以理解为"/apis"代替target里面的地址
  //         // 如果本身的接口地址就有"/api"这种通用前缀，也就是说https://www.exaple.com/api，就可以把pathRewrite删掉，如果没有则加上
  //       },
  //     },
  //   },
  // },
  devServer: {
    proxy: 'http://localhost:3000'
  },
  publicPath: './',
  productionSourceMap: false // 调试文件的功能关闭,能加快打包
};



