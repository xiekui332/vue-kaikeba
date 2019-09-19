<!-- 系统监控 -->
<template>
  <div class="container">
    <div class="chart">
      <div id="chartOne"></div>
      <div id="chartTwo"></div>
      <div id="chartThree"></div>
    </div>
    <div class="info">
      <div class="details">详情描述</div>
      <div class="task">
        <h5>任务详情</h5>
        <table>
          <tr>
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
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChartOne: null,
      myChartTwo: null,
      myChartThree: null
    };
  },
  mounted() {
    this.initChart();
    this.initChart2();
    this.initChart3();
  },
  methods: {
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
      this.myChartOne = this.$echarts.init(document.getElementById("chartOne"));
      this.myChartOne.setOption(option);
    },
    initChart2() {
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
      this.myChartTwo = this.$echarts.init(document.getElementById("chartTwo"));
      this.myChartTwo.setOption(option);
    },
    initChart3() {
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
      this.myChartThree = this.$echarts.init(
        document.getElementById("chartThree")
      );
      this.myChartThree.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: 60%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #2B3043 50%, #252A3C 50%);
    background-size: 3px 100%;
    // background: #f00;
    // #chartOne,#ChartTwo,#ChartThree{
    //    width: 30%;
    //    height: 100%;
    //    float: left;
    // }
    #chartOne {
      width: 33%;
      height: 100%;
      float: left;
      //  background: #ccc;
    }
    #chartTwo {
      width: 33%;
      height: 100%;
      float: left;
      //  background: #f00;
      margin: 0 0.5%;
    }
    #chartThree {
      width: 33%;
      height: 100%;
      float: left;
      //  background: #0f0;
    }
  }
  .info {
    width: 100%;
    height: 40%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: solid 2px #fff;
    background: #191c30;
    color: #fff;
    .details {
      height: 50px;
      line-height: 50px;
      padding-left: 30px;
    }
    .task {
      h5 {
        height: 50px;
        line-height: 50px;
        padding-left: 30px;
        border-top: solid 1px #353849;
        font-weight: normal;
        font-size: 16px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      tr td {
        height: 50px;
        border: solid 1px #353849;
        text-align: center;
      }
    }
  }
}
</style>