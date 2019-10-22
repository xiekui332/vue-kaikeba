<!-- 虚拟车站 -->
<template>
  <div id="container">
    <div class="order_list">
      <h2>订单列表</h2>
      <ul>
        <li>13213223133</li>
      </ul>
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
    //     console.log("a:" + a + "," + b);
    //     b = (b / 90) * 60;
    //     this.GK || (b = 0);
    //     this.g.su.style.transform = this.g.su.style.WebkitTransform =
    //       "rotateX(-" + b + "deg) rotateZ(" + a + "deg)";
    //   };
  },
  methods: {
    initMap() {
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

      // 创建纯文本标记
      var text = new AMap.Text({
        text: "5个",
        anchor: "center", // 设置文本标记锚点
        draggable: true,
        cursor: "pointer",
        // angle: 10,
        style: {
          padding: ".2rem 1.25rem",
          "margin-bottom": "1rem",
          "border-radius": ".25rem",
          "background-color": "white",
          width: "3rem",
          "border-width": 0,
          "box-shadow": "0 2px 6px 0 rgba(114, 124, 245, .5)",
          "text-align": "center",
          "font-size": "20px",
          color: "blue"
        },
        position: [116.333926, 39.997245]
      });

      text.setMap(map);
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  .order_list {
    width: 200px;
    height: 500px;
    background: #181b2c;
    opacity: 0.8;
    color: #fff;
    z-index: 999;
    position: absolute;
    top: 80px;
    left: 0;
    h2 {
      font-size: 20px;
      color: #fff;
      margin: 15px 0 0 15px;
      padding-left: 15px;
      border-left: solid 3px #ffdc76;
    }
  }
}
</style>