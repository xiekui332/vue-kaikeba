<!-- 订单数据 -->
<template>
  <div id="container">
      <div class="num">
          <div class="num_item">
              <h5><i class="el-icon-bank-card"></i><span>平台总订单数</span></h5>
              <p>132.034.4</p>
          </div>
          <div class="num_item">
              <h5><i class="el-icon-bank-card"></i><span>平台注册用户总数</span></h5>
              <p>132.034.4</p>
          </div>
          <div class="num_item">
              <h5><i class="el-icon-bank-card"></i><span>平台订单金额总数</span></h5>
              <p>132.034.4</p>
          </div>
          <!-- <div>平台注册用户总数</div>
          <div>平台订单金额总数</div> -->
      </div>
      <div class="total">
          <h3>订单数(辆次)</h3>
          <div>
              
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
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
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
.num{
    // margin-top: 80px;
    position: absolute;
    top: 80px;
    left: 0;
    z-index: 999;
    color: #fff;
    // border: solid 1px;
    h5 span{
        padding-left: 20px;
    }
    p{
       padding: 10px 0 0 30px;
       font-size: 20px;
    }
}
.num>div{
        margin: 20px;
        float: left;
}
.total{
    position: absolute;
    top: 80px;
    right: 0;
    border: solid 1px;
    color: #fff;
}
</style>