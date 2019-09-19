<!-- 概览 -->
<template>
  <div id="container">
    <div class="left">
      <div class="order_info">
        <h2>订单概况</h2>
        <ul>
          <li>订单总数: 996</li>
          <li>乘车人数: 123</li>
          <li>疲劳报警: 567</li>
        </ul>
        <h2>订单数量变化</h2>
      </div>

      <div id="myChartOne"></div>

      <div id="myChartTwo"></div>

      <div class="warn">
        <h2>疲劳报警</h2>
        <h3>TOP 10</h3>
        <ul>
          <li>xxx1 司机 22h</li>
          <li>xxx2 司机 22h</li>
          <li>xxx3 司机 22h</li>
          <li>xxx4 司机 22h</li>
          <li>xxx5 司机 22h</li>
        </ul>
      </div>
    </div>

    <div class="right">
      <h2>平均行车速度</h2>
      <div id="myChartThree"></div>

      <div class="right_two">
        <h2>拥堵概览</h2>
        <div class="chart">
          <div id="myChartFour"></div>
          <div id="myChartFive"></div>
        </div>
        <div class="info_list">
          <h3>TOP 10</h3>
          <ul>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null
    };
  },
  mounted() {
    // const _this = this;
    // window.onload = function() {
    this.initMap();
    this.initChart();
    this.initChart2();
    this.initChart3();
    this.initChart4();
    this.initChart5();
    console.log("设置正北方向......");
    window.AMap.ControlBar.prototype.XU = function(a, b) {
      console.log("a:" + a + "," + b);
      b = (b / 90) * 60;
      this.GK || (b = 0);
      this.g.su.style.transform = this.g.su.style.WebkitTransform =
        "rotateX(-" + b + "deg) rotateZ(" + a + "deg)";
    };
  },
  methods: {
    initMap() {
      //初始化地图
      var map = new AMap.Map("container", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: false,
        zoom: 17,
        pitch: 65,
        rotation: 45,
        viewMode: "3D", //开启3D视图,默认为关闭
        expandZoomRange: true,
        zoomToAccuracy: true,
        center: [116.333926, 39.997245],
        // mapStyle: "amap://styles/f83c66227b0703fd99732aa8928e6f0e"
        mapStyle: "amap://styles/34eee3392325080eabb764ca4af5f2ab"
      });

      AMap.plugin(["AMap.ControlBar"], function() {
        // 添加 3D 罗盘控制
        map.addControl(new AMap.ControlBar());
      });
    },
    initChart() {
      const option = {
        // legend: {
        //   orient: "vertical",
        //   left: "right",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.myChart = this.$echarts.init(document.getElementById("myChartOne"));
      this.myChart.setOption(option);
    },
    initChart2() {
      const option = {
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          data: ["豪华车", "拼车", "专车", "出租车", "顺风车"]
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: [
              { value: 60, itemStyle: { color: "#00A0E8" } },
              { value: 200, itemStyle: { color: "#00A0E8" } },
              { value: 150, itemStyle: { color: "#00A0E8" } },
              { value: 80, itemStyle: { color: "#00A0E8" } },
              { value: 70, itemStyle: { color: "#00A0E8" } }
            ],
            type: "bar"
          }
        ]
      };
      this.myChart2 = this.$echarts.init(document.getElementById("myChartTwo"));
      this.myChart2.setOption(option);
    },
    initChart3() {
      const option = {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#fff", //边线的颜色
              width: "1" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          },
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三"]
        },
        yAxis: {
          axisLine: {
            type: "value",
            lineStyle: {
              type: "solid",
              color: "#fff",
              width: "1"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201]
          }
        ]
      };
      this.myChart = this.$echarts.init(
        document.getElementById("myChartThree")
      );
      this.myChart.setOption(option);
    },
    initChart4() {
      const option = {
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)"
        // },
        // legend: {
        //   orient: "vertical",
        //   x: "left",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      };
      this.myChart = this.$echarts.init(document.getElementById("myChartFour"));
      this.myChart.setOption(option);
    },
    initChart5() {
      const option = {
        tooltip: {},
        dataset: {
          source: [
            ["1", 43.3, 85.8],
            ["2", 83.1, 73.4],
            ["3", 86.4, 65.2],
            ["4", 72.4, 53.9]
          ]
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }]
      };

      this.myChart = this.$echarts.init(document.getElementById("myChartFive"));
      this.myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
  h2 {
    font-size: 20px;
    color: #fff;
    // margin: 15px;
    margin: 15px 0 15px 15px;
    padding-left: 15px;
    border-left: solid 3px #ffdc76;
    font-weight: 500;
  }
  h3 {
    font-size: 20px;
    font-weight: 300;
    padding: 20px 0 10px 30px;
  }
}
.left {
  width: 20%;
  height: 90%;
  // border: solid 1px #fff;
  position: absolute;
  top: 70px;
  left: 0;
  color: #fff;
  z-index: 999;

  .order_info {
    height: 26%;
    background: #181b2c;
    // background: #ccc;
    opacity: 0.8;
    padding: 1px;
    ul li {
      list-style: outside;
      margin-left: 30px;
      font-size: 12px;
      line-height: 20px;
    }
  }
  #myChartOne,
  #myChartTwo {
    // width: 100%;
    height: 18%;
    margin-top: 10px;
    background: #181b2c;
    // background:#f00;
    opacity: 0.8;
  }
  .warn {
    height: 33%;
    margin-top: 10px;
    background: #181b2c;
    // background: #0f0;
    opacity: 0.8;
    padding: 1px;

    ul li {
      font-size: 12px;
      line-height: 20px;
      margin-left: 30px;
    }
  }
}
.right {
  width: 30%;
  height: 90%;
  position: absolute;
  top: 70px;
  right: 0;
  color: #fff;
  z-index: 999;
  // border: solid 1px #fff;
  #myChartThree {
    height: 25%;
    background: #181b2c;
    // background: #f00;
    opacity: 0.8;
  }
  .right_two {
    height: 65%;
    margin-top: 10px;
    padding: 1px;
    background: #181b2c;

    opacity: 0.8;
    .chart {
      height: 40%;
      #myChartFour,
      #myChartFive {
        width: 50%;
        height: 100%;
        float: left;
        // background: #0f0;
      }
    }
    .info_list {
      height: 47%;
      // background: #ccc;
      ul li {
        // height: 60%;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
        // background: #ccc;
      }
    }
  }
}
</style>
