<!-- 订单监控 -->
<template>
  <div style="width:100%;height:100%;color:#fff">
    <div class="num">
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台总订单数</span>
        </h5>
        <p>{{proMessage.totalOrderCount}}</p>
      </div>
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台注册用户总数</span>
        </h5>
        <p>{{proMessage.registerTotalCount}}</p>
      </div>
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台订单金额总数</span>
        </h5>
        <p>{{proMessage.pay_all}}</p>
      </div>
      <!-- <div>平台注册用户总数</div>
      <div>平台订单金额总数</div>-->
    </div>
    <div class="retention">
      <h3>订单完成率</h3>
      <div class="progress">
        <div>
          <el-progress
            type="dashboard"
            :percentage="percentage"
            color="#f56c6c"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>日均订单数</p>
        </div>
        <div>
          <el-progress
            type="dashboard"
            :percentage="percentage1"
            color="#e6a23c"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>周订单数</p>
        </div>
        <div>
          <el-progress
            type="circle"
            :percentage="percentage2"
            color="#5cb87a"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>月订单数</p>
        </div>
        <div>
          <el-progress
            type="circle"
            :percentage="percentage3"
            color="#6f7ad3"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>订单累计里程总数</p>
        </div>
      </div>
    </div>
    <div id="chart"></div>
  </div>
</template>

<script>
import "echarts/map/js/china.js";
import $axios from 'axios';
import jsonCity from "echarts/map/json/china-cities";
// import "@/utils/wuhan"
import {proData,srsData} from "@/api"
import util from '@/api/request.js';
import jquery from 'jquery'
export default {
  data() {
    return {
      proMessage: {},
      percentage: 10,
      percentage1: 50,
      percentage2: 70,
      percentage3: 40,
      options:{},
      wuhanOptions:{},
      chengduOptions:{},
      xianOptions:{},
      haikouOptions:{},
      resultData:{},
      colors: [
        { color: "#f56c6c", percentage: 10 },
        { color: "#e6a23c", percentage: 20 },
        { color: "#5cb87a", percentage: 30 },
        { color: "#1989fa", percentage: 40 },
        { color: "#6f7ad3", percentage: 50 },
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ],
      myChart: null,
      list: ["列表1", "列表1", "列表1", "列表1", "列表1", "列表1"]
    };
  },
  methods: {
    getTitleData (){
      util.axios({
        method:"post",
        url:"/didi/pro",
        data:{},
      }).then(res=>{
        if(res.status === 200){
           this.proMessage = res.data[0]
        }
      }) 
      //  await proData({}).then((res) => {
      //   if (res.status === 200){
      //     this.proMessage = res.data[0]
      //   }
      // })
    },
    getRightOrder(){
      console.log(this.$store.state.citycode === '128')
      let citycode = this.$store.state.citycode
      let cityname = ''
      if (citycode === '128') {
        cityname = '湖北省武汉市'
      } else if (citycode === '075'){
        cityname = '四川省成都市'
      }  else if(citycode === '233'){
        cityname = '陕西省西安市'
      } else if(citycode === '海口'){
        cityname = '海南省海口市'
      }
      util.axios({
        method: 'post',
        data:{name: cityname},
        url: '/didi/fspos'
      }).then(res =>{
        this.resultData = res.data[0]
        this.percentage = parseInt((this.resultData._day_comple_rate))
        this.percentage1 = parseInt((this.resultData._week_comple_rate))
        this.percentage2 = parseInt((this.resultData._month_comple_rate))
        this.percentage3 = parseInt((this.resultData._quarter_comple_rate))
        console.log(this.resultData)
      })
    },
    initChart() {
     console.log(this.options)
      var jsonData = jsonCity
      // 基于准备好的dom，初始化echarts图表
      this.myChart = this.$echarts.init(document.getElementById("chart"));
       this.$echarts.registerMap('shanghai', this.options);
      this.myChart.hideLoading();
      var geoCoordMap = {
          '上海市区': [121.430317, 31.222771],
            '闵行区': [121.375972, 31.111658],
          '宝山区': [121.489934, 31.398896],
          '嘉定区': [121.250333, 31.383524],
        '浦东新区': [121.567706, 31.245944],
          '金山区': [121.330736, 30.724697],
          '松江区': [121.223543, 31.03047],
          '青浦区': [121.113021, 31.151209],
          '奉贤区': [121.458472, 30.912345],
          '崇明区': [121.397516, 31.626946],
      }
      var data =  [
              {
                  name: '上海市区',
                  value: 85
              },
              {
                  name: '闵行区',
                  value: 70
              }, {
                  name: '宝山区',
                  value: 75
              }, {
                  name: '嘉定区',
                  value: 80
              }, {
                  name: '浦东新区',
                  value: 78
              }, {
                  name: '金山区',
                  value: 77
              }, {
                  name: '松江区',
                  value: 79
              }, {
                  name: '青浦区',
                  value: 85
              }, {
                  name: '奉贤区',
                  value: 81
              }, {
                  name: '崇明区',
                  value: 83
              }];

      var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                  res.push({
                      name: data[i].name,
                      value: geoCoord.concat(data[i].value)
                  });
              }
          }
          return res;
      };

      const option = {
        backgroundColor: "#1b1b1b",
        tooltip: {
            trigger: 'item',
            backgroundColor: '#09bdb1',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function(params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value;
                res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                return res;
            }
        },
        legend: {
            orient: 'vertical',
            top: 'top',
            left: 'right',
            data: ['credit_pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: { //颜色的设置  dataRange
            show: false,
            x: 'left',
            y: 'center',
            seriesIndex: [1],
            min: 70,
            max: 90,
            text: ['高', '低'], // 文本，默认为数值文本
            textStyle: {
                color: '#fff'
            },
            inRange: {
                color: ['#5cd2c3','#419bd3','#7a95d2','#5dcbdc','#838dcd','#5de9b1','#5dc6df','#5db8ea','#2bbc90','#5dc4e3']

            }
        },
        geo: {
            map: 'shanghai',
            left: '350',
            roam: true,
            itemStyle: { //地图区域的多边形 图形样式
                color: '#fff',
                normal: { //是图形在默认状态下的样式
                    label: {
                        show: true, //是否显示标签
                        textStyle: {
                            color: '#ff0'
                        },
                    },

                    borderWidth: 1,
                    borderColor: 'rgba(37,124,169)',
                    shadowColor: '#e8e8e8',
                    shadowOffsetY: 15,
                    shadowOffsetX: 8,

                },

            },
        },
        series: [{
                name: 'credit_pm2.5',
                type: 'effectScatter',
                left: '150',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function(val) {
                    return val[2] / 5;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'bottom',
                        color:'#fff',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#10f9ff',
                        shadowBlur: 0,
                        shadowColor: '#05C3F9'
                    }
                },
                zlevel: 1
            }, {
                type: 'map',
                mapType: 'shanghai',
                left: '350',
                // zoom: 1.2,
                roam: false, //是否开启鼠标缩放和平移漫游
                itemStyle: { //地图区域的多边形 图形样式
                    // color: ['rgb(11,85,142)', 'rgb(13,106,177)'],
                    normal: { //是图形在默认状态下的样式
                        label: {
                            show: true, //是否显示标签
                            textStyle: {
                                color: 'transparent'
                            },
                        },
                        borderWidth: 1,
                        borderColor: '#28729f',
                        areaColor: '#29b4b7',
                    },
                    emphasis: { //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                        label: {
                            show: false,
                            textStyle: {
                                color: 'transparent'
                            },
                        },
                        borderColor: '#28729f',
                        areaColor: '#9ea9f7',
                    }
                },

                data: data
            }
        ]
    };
      // 为echarts对象加载数据
      this.myChart.setOption(option);
    }
  },
  mounted() {
    this.$store.dispatch('setCityStatus', true)
    this.$store.dispatch('setCitycode', '128')
    this.getTitleData()
    this.getRightOrder()
  },
  created(){
    this.$axios.get('api/region').then((res) => {
      this.options = res.data.data
      this.initChart();
    }, function(err) {
      console.log(err)
    })
    this.$axios.get('/api/wuhan').then((ress) => {
      this.wuhanOptions = ress.data.data
    }, function(err) {
      console.log(err)
    })
    this.$axios.get('/api/xian').then((resxian) => {
      this.xianOptions = resxian.data.data
    }, function(err) {
      console.log(err)
    })
    this.$axios.get('/api/haikou').then((reshaikou) => {
      this.haikouOptions = reshaikou.data.data
    }, function(err) {
      console.log(err)
    })
    this.$axios.get('/api/chengdu').then((reschengdu) => {
      this.chengduOptions = reschengdu.data.data
    }, function(err) {
      console.log(err)
    })
  }
};
</script>
<style lang="less" scoped>
#chart {
  width: 100%;
  height: 100%;
}
.num {
  // margin-top: 80px;
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 999;
  color: #fff;
  //   border: solid 1px;
  opacity: 0.8;
  h5 span {
    padding-left: 20px;
  }
  p {
    padding: 10px 0 0 30px;
    font-size: 20px;
  }
}
.num > div {
  margin: 20px;
  float: left;
}

.retention {
  width: 22%;
  height: 200px;
  position: absolute;
  top: 15%;
  right: 0;
  z-index: 999;
  color: #fff;
  opacity: 0.8;
  //   border: solid 1px;
  .progress {
    div {
      float: left;
      padding: 7px;
    }
    p {
      text-align: center;
    }
  }
}
</style>
