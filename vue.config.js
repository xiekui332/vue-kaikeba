
module.exports = {
  configureWebpack: {
    name: "订单监控系统",
    externals: {
      'AMap': 'AMap' // 高德地图配置
    }
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
  },
  publicPath: "./",
  // 打包输出目录
  outputDir: "static",
  devServer: {
    proxy: {
      "/api": {
        //代理api
        target: "http://10.20.3.99:8989/", //服务器api地址
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets
        pathRewrite: {
          //重写路径
          "^/api": ""
        }
      }
    }
  }
};
