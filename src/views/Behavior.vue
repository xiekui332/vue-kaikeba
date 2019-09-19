<!-- 用户乘车行为统计 -->
<template>
  <div>
    <div id="chart"></div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
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
              { value: 60, itemStyle: { color: "#EEEEEE" } },
              { value: 200, itemStyle: { color: "#1E54C1" } },
              { value: 150, itemStyle: { color: "#FFA70F" } },
              { value: 80, itemStyle: { color: "#FE430E" } },
              { value: 70, itemStyle: { color: "#00A0E8" } }
            ],
            type: "bar"
          }
        ]
      };
      this.myChart = this.$echarts.init(document.getElementById("chart"));
      this.myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
#chart {
  min-width: 40%;
  background: #181b2c;
  position: absolute;
  top: 80px;
  left: 20px;
  bottom: 50px;
}
#container {
  min-width: 45%;
  background: #181b2c;
  position: absolute;
  top: 80px;
  left: 50%;
  bottom: 50px;
}
</style>