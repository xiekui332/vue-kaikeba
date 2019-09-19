<!-- 订单报表 -->
<template>
  <div>
    <div id="chart"></div>
    <div class="info">
      <div class="info_name">
        <h2>车型</h2>
        <ul>
          <li v-for="item in vehicleType" :key="item.id" @click="showList(item.id)">{{item.type}}</li>
        </ul>
      </div>
      <div class="info_list" v-show="isShowList">
        <ul>
          <li v-for="item in list" :key="item.orderId">{{item.orderId}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { statistics,getList } from "@/api";
export default {
  data() {
    return {
      myChart:null,
      vehicleType: [
        { type: "出租车", id: 1 },
        { type: "专车", id: 2 },
        { type: "顺风车", id: 3 },
        { type: "拼车", id: 4 },
        { type: "豪华车", id: 5 }
      ],
      carData:[],
      list:[],
      isShowList: false
    };
  },
  async mounted() {
     this.initChart();
      const {status,data:{data}} = await statistics()
      if(status === 200){
          this.carData = data
          console.log(this.carData)
      }
  },
  methods: {
    initChart() {
      const option = {
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "60%",
            data: [
              { value: 335, name: "专车", itemStyle: { color: "#FFA70F" } },
              { value: 310, name: "出租车", itemStyle: { color: "#FE430E" } },
              { value: 234, name: "顺风车", itemStyle: { color: "#00A0EA" } },
              { value: 135, name: "拼车", itemStyle: { color: "#1E54C1" } },
              { value: 1548, name: "豪华车", itemStyle: { color: "#EEEEEE" } }
            ],
            label: { show: true, position: "inner", color: "#000" }
          }
        ]
      };
      this.myChart = this.$echarts.init(document.getElementById("chart"));
      this.myChart.setOption(option);
    },
    // 展示列表
    async showList(id) {
      const {status,data:{data:{list}}} = await getList({productId:id});
      if(status === 200){
          this.list = list
          console.log(this.list)
      }
      this.isShowList = true;
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
// #chart{
//     width: 30%;
//     height: 500px;
//     background: #181B2C;
//     margin: 50px;
// }
.info {
  min-width: 45%;
  background: #181b2c;
  position: absolute;
  top: 80px;
  left: 50%;
  bottom: 50px;
  .info_name {
    color: #fff;
    float: left;
    h2 {
      font-size: 20px;
      color: #fff;
      margin: 15px 0 0 50px;
      padding-left: 15px;
      border-left: solid 3px #ffdc76;
    }
    ul {
      //   margin-top: 30px;
      li {
        width: 100px;
        font-size: 12px;
        line-height: 30px;
        // margin: auto;
        margin-left: 80px;
        border-bottom: solid 1px #ffdc76;
      }
    }
  }

  .info_list {
    width: 200px;
    min-height: 50px;
    background: #fff;
    color: #333;
    margin: 15px 0 0 50px;
    float: left;
    ul {
      margin: 30px 0 30px 0;
      li {
        width: 100px;
        font-size: 12px;
        line-height: 30px;
        margin: auto;
        border-bottom: solid 2px #46413b;
      }
      .active {
        border-bottom: solid 2px #46413b;
      }
    }
  }
}
</style>