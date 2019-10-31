<!-- 概览 -->
<template>
  <div id="container">
    <div class="left">
      <div class="order_info">
        <h2>订单概况</h2>
        <ul>
          <li>订单总数: {{orderOverview.orderCount}}</li>
          <li>乘车人数: {{orderOverview.orderPassengerCount}}</li>
          <li>累计轨迹点数: {{pointsCount}}</li>
          <!-- <li>疲劳报警: {{orderOverview.fatigueAlarmCount}}</li> -->
        </ul>
        <h2>
          订单数量变化
          <p  @click="dialogTableVisible = true">详情</p>
        </h2>
      </div>

      <div id="myChartOne"></div>

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
    <!-- 日期控件 -->
    <div class="date">
      <el-date-picker
        class="aaa"
        v-model="startTime"
        type="datetime"
        placeholder="选择开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="changeDate(startTime)"
      ></el-date-picker>
    </div>

    <!-- 详情弹框 -->
    <el-dialog title="详情" width=60% :visible.sync="dialogTableVisible">
      <div id="myChartTwo" style="width:100%;height:300px;z-index:999"></div>
    </el-dialog>
  </div>
</template>

<script>
// import AMap from 'AMap'
import { orderOverview, orderGps, hourOrderCount } from "@/api";
export default {
  data() {
    return {
      dialogTableVisible: false,
      orderOverview: {}, //订单概况
      orderGps: [], //实时轨迹
      markers: [],
      pointsCount: 0,
      // new Date("2016-11-01 15:00:00") ||
      startTimeDate: "",
      endTime: "",
      endTimeDate: null,
      startTime: "2016-11-01 10:06:14",
      t: 0,
      icon: {
        type: "image",
        image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        size: [6, 9],
        anchor: "bottom-center",
        angel: 0,
        retina: true
      },
      ellipseMarker: null,
      map: null,
      layer: null,
      myChart: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null,
      hourOrderCount: {},
      keyData: [],
       keyData2: [],
      itemData: []
    };
  },
  async created() {
    // 格式化日期
    Date.prototype.format = function(fmt) {
      //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
    this.t = new Date(this.startTime).getTime();
    this.t += 120000;
    this.endTimeDate = new Date(this.t);
    this.endTime = this.endTimeDate.format("yyyy-MM-dd hh:mm:ss");
    // this.startTime = this.startTimeDate.format("yyyy-MM-dd hh:mm:ss");
    // this.t = this.startTimeDate.getTime();
    // this.t += 120000;
    // this.endTimeDate = new Date(this.t);
    // this.endTime = this.endTimeDate.format("yyyy-MM-dd hh:mm:ss");
    //  console.log("this.startTime",this.startTime)
    // 请求订单数
    this.getOrderOverview();
    await this.getHourOrderCount();
    // var realtimeTrackInterval = window.setInterval(this.realtimeTrack,5000);
  },
  mounted() {
    this.initMap();
    this.initChart3();
    this.initChart4();
    this.initChart5();
    console.log("设置正北方向......");
    window.AMap.ControlBar.prototype.XU = function(a, b) {
      console.log("a:" + a + "," + b);
      b = (b / 90) * 60;
      this.GK || (b = 0);
      // this.g.su.style.transform = this.g.su.style.WebkitTransform =
      //   "rotateX(-" + b + "deg) rotateZ(" + a + "deg)";
    };
    console.log("map.ControlBar:" + this.map);

    var realtimeTrackInterval = window.setInterval(this.realtimeTrack, 2000);
    var realtimeTrackInterval = window.setInterval(this.getHourOrderCount, 2000);
  },
  methods: {
    // 开始日期
    changeDate(startTimeDate) {
      console.log(startTimeDate);
      // this.startTime = startTimeDate.format("yyyy-MM-dd hh:mm:ss");
      // console.log("this.startTime",this.startTime)
      this.getOrderOverview();
      // console.log("value", value);
    },
    // 请求订单数
    async getOrderOverview() {
      const {
        status,
        data: { data }
      } = await orderOverview({
        cityCode: "075",
        startTime: this.startTime,
        endTime: "2016-11-01 23:38:14"
        // endTime: "2017-05-19 15:06:20"
      });
      if (status === 200) {
        this.orderOverview = data;
      }
    },
    // 获取订单数量变化
    async getHourOrderCount() {
      const ret = await hourOrderCount({
        cityCode: "075",
        startTime: this.startTime,
        endTime: "2016-11-01 23:38:14"
      });
      this.hourOrderCount = ret.data.data;
      console.log(this.hourOrderCount)
      for (var item in this.hourOrderCount) {
        this.keyData.push(item);
        // split("-")[2].split("_")[1]
        // this.itemData.push(this.hourOrderCount[o]);
      }
      this.keyData.sort();
      for (var index in this.keyData) {
        this.itemData.push(this.hourOrderCount[this.keyData[index]]);
      }
      for(var i=0;i< this.keyData.length;i++){
            this.keyData2.push(this.keyData[i].split("-")[2].split("_")[1])
      }
      // console.log(this.keyData2)
      // console.log(this.itemData)
      // 
      this.initChart();
      this.initChart2()
    },
    // 获取当前城市的实时轨迹
    async realtimeTrack() {
      console.log("realtimeTrack:请求实时轨迹");
      const ret = await orderGps({
        cityCode: "075",
        startTime: this.startTime,
        endTime: this.endTime
      });
      // console.log("ret:" + ret);
      if (ret.status === 200) {
        this.orderGps = ret.data.data;
        // console.log(ret.data.data)
        // console.log(111)
        this.drawCircleMarker(ret.data.data);
        console.log("data.data.length", ret.data.data.length);
        this.pointsCount = this.pointsCount + ret.data.data.length;
        this.startTime = this.endTime;
        this.endTimeDate = new Date(this.endTime);
        this.t = this.endTimeDate.getTime();
        this.t += 120000;
        this.endTimeDate = new Date(this.t);

        // this.startTimeDate = new Date(this.startTime);
        console.log("new starttime", this.startTime);
        console.log("new endtime", this.endTime);
        this.endTime = this.endTimeDate.format("yyyy-MM-dd hh:mm:ss");
      }
    },
    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: false,
        zoom: 17,
        pitch: 65,
        rotation: 45,
        viewMode: "3D", //开启3D视图,默认为关闭
        expandZoomRange: true,
        zoomToAccuracy: true,
        center: [104.082214, 30.673637],
        // mapStyle: "amap://styles/f83c66227b0703fd99732aa8928e6f0e"
        mapStyle: "amap://styles/34eee3392325080eabb764ca4af5f2ab"
      });

      AMap.plugin(["AMap.ControlBar"], () => {
        // 添加 3D 罗盘控制
        this.map.addControl(new AMap.ControlBar());
      });

      this.layer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 1000,
        // 关闭标注避让，默认为开启，v1.4.15 新增属性
        animation: false,
        // 关闭标注淡入动画，默认为开启，v1.4.15 新增属性
        collision: false
      });
      this.map.add(this.layer);
    },
    initChart() {
      const option = {
        xAxis: {
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#fff", //边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          },
          type: "category",
          boundaryGap: false,
          data: this.keyData2
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#fff", //边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          },
          type: "value",
          axisLabel: {
            margin: 2
          }
        },
        series: [
          {
            data: this.itemData,
            type: "line",
            areaStyle: {}
          }
        ]
      };

      this.myChart = this.$echarts.init(document.getElementById("myChartOne"));
      this.myChart.setOption(option);
    },
    initChart2() {
      const option = {
        xAxis: {
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#fff", //边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          },
          type: "category",
          boundaryGap: false,
          data: this.keyData2
          // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#fff", //边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          },
          type: "value",
          axisLabel: {
            margin: 2
            // formatter: function(value, index) {
            //   // if (value >= 10000 && value < 10000000) {
            //   //     value = value / 1000 + "k";
            //   // } else if (value >= 10000000) {
            //   //     value = value / 1000000 + "k";
            //   // }
            //   value = value / 1000 + "k";
            //   return value;
            // }
          }
        },
        series: [
          {
            // data: ["820", "932", "901", "934", "1290", "1330", "1320"],
            data: this.itemData,
            type: "line",
            areaStyle: {}
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
    },
    drawCircleMarker(points) {
      this.markers = [];
      for (var i = 0; i < points.length; i++) {
        var curPosition = points[i].lnglat;
        var curData = {
          position: curPosition,
          icon: this.icon
        };
        var labelMarker = new AMap.LabelMarker(curData);

        this.markers.push(labelMarker);
      }
      this.layer.add(this.markers);
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
    height: 36%;
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

.date {
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -110px;
  z-index: 999;
  background: #181b2c;
  opacity: 0.8;
}

// .aaa{
//   background: #f00;
// }
</style>
