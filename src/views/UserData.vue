<!-- 订单数据 -->
<template>
  <div id="container">
    <div class="num">
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台总订单数</span>
        </h5>
        <p>132.034.4</p>
      </div>
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台注册用户总数</span>
        </h5>
        <p>132.034.4</p>
      </div>
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台订单金额总数</span>
        </h5>
        <p>132.034.4</p>
      </div>
      <!-- <div>平台注册用户总数</div>
      <div>平台订单金额总数</div>-->
    </div>
    <div class="active">
      <h3>活跃用户数(位)</h3>
      <div id="chart"></div>
    </div>
    <div class="total">
      <h3>注册用户数(位)</h3>
      <div id="chart2"></div>
    </div>
    <div class="retention">
      <h3>留存率(百分比)</h3>
      <div class="progress">
        <div>
          <el-progress
            type="dashboard"
            :percentage="percentage"
            :color="colors"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>次日</p>
        </div>
        <div>
          <el-progress
            type="dashboard"
            :percentage="percentage2"
            :color="colors"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>本周</p>
        </div>
        <div>
          <el-progress
            type="dashboard"
            :percentage="percentage3"
            :color="colors"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>当月</p>
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
      //   进度条数据
      percentage: 10,
      percentage2: 50,
      percentage3: 80,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ]
    };
  },
  mounted() {
    this.initMap();
    this.initChart();
    this.initChart2();
    // window.AMap.ControlBar.prototype.XU = function(a, b) {
    //   console.log("a:" + a + "," + b);
    //   b = (b / 90) * 60;
    //   this.GK || (b = 0);
    //   this.g.su.style.transform = this.g.su.style.WebkitTransform =
    //     "rotateX(-" + b + "deg) rotateZ(" + a + "deg)";
    // };
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
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "category",
          data: ["当日", "本周", "当月"],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            margin: 2, //刻度标签与轴线之间的距离
          }
        },
        series: [
          {
            data: [
              { value: 5002, itemStyle: { color: "#12B6F4" } },
              { value: 13000, itemStyle: { color: "#C21AA1" } },
              { value: 16000, itemStyle: { color: "#01A1EC" } }
            ],
            type: "bar"
          }
        ]
      };
      this.myChart = this.$echarts.init(document.getElementById("chart"));
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
          data: ["当日", "本周", "当月"]
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            margin: 2,
            formatter: function(value, index) {
              // if (value >= 10000 && value < 10000000) {
              //     value = value / 1000 + "k";
              // } else if (value >= 10000000) {
              //     value = value / 1000000 + "k";
              // }
              value = value / 1000 + "k";
              return value;
            }
          }
        },
        // grid: {
        //   left: 35
        // },
        series: [
          {
            data: [
              { value: 5002, itemStyle: { color: "#12B6F4" } },
              { value: 13000, itemStyle: { color: "#C21AA1" } },
              { value: 16000, itemStyle: { color: "#01A1EC" } }
            ],
            type: "bar"
          }
        ]
      };
      this.myChart2 = this.$echarts.init(document.getElementById("chart2"));
      this.myChart2.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
h3 {
  padding: 15px;
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
.active {
  width: 20%;
  // height: 300px;
  position: absolute;
  bottom: 50px;
  left: 0;
  z-index: 999;
  color: #fff;
  opacity: 0.8;
  // border: solid 1px;
  #chart {
    //   width: 300px;
    height: 300px;
  }
}
.total {
  width: 20%;
  position: absolute;
  top: 80px;
  right: 0;
  z-index: 999;
  opacity: 0.8;
  // border: solid 1px;
  color: #fff;
  #chart2 {
    //   width: 300px;
    height: 300px;
    // background: #ccc;
  }
}
.retention {
  width: 25%;
  height: 200px;
  position: absolute;
  bottom: 50px;
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