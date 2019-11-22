var appData = require('./static/shanghai.json')
var wuhanData = require('./static/wuhan.json')
var xianData = require('./static/xian.json')
var haikouData = require('./static/haikou.json')
var chengduData = require('./static/510100.json')
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
    before(app) {
			app.get('/api/region', (req, res) => {
				res.json({
					data: appData
				})
      })
      app.get('/api/wuhan', (req, ress) => {
				ress.json({
					data: wuhanData
				})
      })
      app.get('/api/xian', (req, resxian) => {
				resxian.json({
					data: xianData
				})
      })
      app.get('/api/haikou', (req, reshaikou) => {
				reshaikou.json({
					data: haikouData
				})
      })
      app.get('/api/chengdu', (req, reschengdu) => {
				reschengdu.json({
					data: chengduData
				})
			})
		},
    proxy: {
      "/api": {
        //代理api
        target: "http://10.20.3.177:8989/", //服务器api地址
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
