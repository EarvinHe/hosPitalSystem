const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  transpileDependencies: true,
  lintOnSave:false,

  // 代理跨域
  devServer:{
    proxy:{
      '/':{
        ws:false,
        target: 'http://localhost:8080',
        // pathRewrite:{}target: 'http://localhost:5000',
        // pathRewrite:{'^/api':''},
        changeOrigin:true
      }
    }
  }
})
