module.exports = {
  configureWebpack: {
    name: "订单监控系统"
  },
  publicPath: "./",
  // 打包输出目录
  outputDir: "static",
  devServer: {
    proxy: {
      "/api": {
        //代理api
        target: "http://192.168.84.211:8080/", //服务器api地址
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
