<!-- 订单监控 -->
<template>
  <div style="width:100%;height:100%;color:#fff">
    <div id="chart"></div>
    <!-- <div class="order_list"> -->
    <!-- <h2>订单列表</h2> -->
    <!-- <ul>
        <li v-for="(item,index) in list" :key="index">{{item}}</li>
    </ul>-->
    <div class="order_info">
      <ul>
        <li>
          <i></i>
          <b>总订单:</b>
          <span>23124</span>
        </li>
        <li>
          <i></i>
          <b>月均订单数:</b>
          <span>23124</span>
        </li>
        <li>
          <i></i>
          <b>月订单数:</b>
          <span>23124</span>
        </li>
        <li>
          <i></i>
          <b>订单总里程:</b>
          <span>23124</span>
        </li>
      </ul>
    </div>

    <div class="info">
      <el-tabs type="card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-truck"></i> 车辆</span>
            <div class="table">
              <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="汽车"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="类型"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="重量">
              </el-table-column>
            </el-table>
          </div>
          </el-tab-pane>
          <el-tab-pane label="订单">
            <span slot="label"><i class="el-icon-tickets"></i> 订单</span>
            <div class="table">
              <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
          </el-tab-pane>
        </el-tabs>
      <!-- <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table> -->
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import "echarts/map/js/china.js";
export default {
  data() {
    return {
      myChart: null,
      list: ["列表1", "列表1", "列表1", "列表1", "列表1", "列表1"],
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },  {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },{
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts图表
      this.myChart = this.$echarts.init(document.getElementById("chart"));
      const option = {
        backgroundColor: "#1b1b1b",
        color: ["gold", "aqua", "lime"],
        tooltip: {
          trigger: "item",
          formatter: "{b}"
        },
        dataRange: {
          show: false,
          min: 0,
          max: 100,
          calculable: true,
          color: ["#ff3333", "orange", "yellow", "lime", "aqua"],
          textStyle: {
            color: "#fff"
          }
        },
        visualMap: {
          show: true,
          min: 0,
          max: 255,
          calculable: true,
          inRange: {
            color: ["aqua", "lime", "yellow", "orange", "#ff3333"]
          },
          textStyle: {
            color: "#12223b"
          }
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          layoutCenter: ["50%", "50%"],
          layoutSize: "130%",
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)"
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#1B1B1B",
              borderColor: "#3B5076"
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4,
              trailLength: 0.02,
              symbol: "arrow",
              symbolSize: 5
            },
            lineStyle: {
              normal: {
                width: 1,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            tooltip: {
              trigger: "item"
            },
            data: [
              {
                fromName: "上海",
                toName: "北京",
                value: 19,
                coords: [[121.48, 31.22], ["116.46", "39.92"]]
              },
              {
                fromName: "深圳",
                toName: "北京",
                value: 17,
                coords: [[114.07, 22.62], ["116.46", "39.92"]]
              },
              {
                fromName: "成都",
                toName: "北京",
                value: 25,
                coords: [[104.06, 30.67], ["116.46", "39.92"]]
              },
              {
                fromName: "四川",
                toName: "北京",
                value: 31,
                coords: [[104.04, 30.4], ["116.46", "39.92"]]
              },
              {
                fromName: "西安",
                toName: "北京",
                value: 12,
                coords: [[108.95, 34.27], ["116.46", "39.92"]]
              },
              {
                fromName: "广州",
                toName: "北京",
                value: 19,
                coords: [[113.23, 23.16], ["116.46", "39.92"]]
              },
              {
                fromName: "郑州",
                toName: "北京",
                value: 18,
                coords: [[113.65, 34.76], ["116.46", "39.92"]]
              },
              {
                fromName: "哈尔滨",
                toName: "北京",
                value: 15,
                coords: [[126.63, 45.75], ["116.46", "39.92"]]
              },
              {
                fromName: "拉萨",
                toName: "北京",
                value: 12,
                coords: [[91.11, 29.97], ["116.46", "39.92"]]
              },
              {
                fromName: "桂林",
                toName: "北京",
                value: 12,
                coords: [[110.28, 25.29], ["116.46", "39.92"]]
              }
            ]
          },
          {
            // name: "收货地址",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4
            },
            tooltip: {
              trigger: "item"
            },
            label: {
              normal: {
                show: true,
                position: "left",
                offset: [-5, 5],
                formatter: "{b}"
              },
              emphasis: {
                show: true
              }
            },
            hoverAnimation: true,
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              normal: {
                show: false,
                color: "#f00"
              }
            },
            data: [
              {
                name: "上海",
                value: [121.48, 31.22, 95]
              },
              {
                name: "深圳",
                value: [114.07, 22.62, 90]
              },
              {
                name: "成都",
                value: [104.06, 30.67, 80]
              },
              {
                name: "四川",
                value: [104.04, 30.4, 70]
              },
              {
                name: "西安",
                value: [108.95, 34.27, 60]
              },
              {
                name: "广州",
                value: [113.23, 23.16, 50]
              },
              {
                name: "郑州",
                value: [113.65, 34.76, 40]
              },
              {
                name: "哈尔滨",
                value: [126.63, 45.75, 30]
              },
              {
                name: "拉萨",
                value: [91.11, 29.97, 20]
              },
              {
                name: "桂林",
                value: [110.28, 25.29, 10]
              }
            ]
          },
          {
            name: "发送地址",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            tooltip: {
              trigger: "item"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#00ffff",
                formatter: "{b}",
                textStyle: {
                  color: "#00ffff"
                }
              },
              emphasis: {
                show: true
              }
            },
            symbol: "circle",
            symbolSize: 20,
            itemStyle: {
              normal: {
                show: true,
                color: "#EE0000"
              }
            },
            data: [
              {
                name: "南京",
                value: [118.796252, 32.0739]
              }
            ]
          }
        ]
      };

      // 为echarts对象加载数据
      this.myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
#chart {
  width: 100%;
  height: 100%;
}
.order_info {
  width: 25%;
  height: 25%;
  border: solid 1px #696d79;
  position: absolute;
  left: 2%;
  top: 15%;
  color: #fff;
  background: #181b2c;
  opacity: 0.8;
  ul {
    padding: 10px 15px;
  }
  ul li {
    padding: 5px;
  }
  i {
    width: 20px;
    height: 10px;
    border: solid 1px;
    display: inline-block;
  }
  b {
    font-weight: 500;
    padding-left: 15px;
  }
  span {
    padding-left: 15px;
  }
  li:nth-child(1) i {
    background: #00a0ea;
  }
  li:nth-child(2) i {
    background: #1e54c1;
  }
  li:nth-child(3) i {
    background: #fe430e;
  }
  li:nth-child(4) i {
    background: #eeeeee;
  }
}

.info {
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #181b2c;
  top: 60%;
  color: #fff;
  opacity: 0.8;
  table {
    width: 100%;
    border-collapse: collapse;
    color:#fff
  }
  tr td {
    height: 50px;
    border: solid 1px #353849;
    text-align: center;
  }
}
// .order_list {
//   width: 200px;
//   height: 500px;
//   background: #181b2c;
//   opacity: 0.8;
//   color: #fff;
//   background: #fff;
//   z-index: 999;
//   position: absolute;
//   top: 80px;
//   left: 0;
//   h2 {
//     font-size: 20px;
//     color: #fff;
//     margin: 15px 0 0 15px;
//     padding-left: 15px;
//     border-left: solid 3px #ffdc76;
//   }
//   ul {
//     margin-top: 30px;
//     li {
//       width: 100px;
//       font-size: 12px;
//       line-height: 30px;
//       margin: auto;
//       border-bottom: solid 1px #ffdc76;
//     }
//   }
// }
</style>
