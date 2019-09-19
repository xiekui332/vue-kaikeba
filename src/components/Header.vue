<template>
  <div class="header">
    <div class="header-inner">
      <ul class="header_left">
        <li class="logo">
          <!-- logo -->
          汽车出行
        </li>
        <li>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-location-outline el-icon--left"></i>
              {{city}}
              <i class="el-icon-arrow-down el-icon--right"></i>
              <!-- 切换城市 -->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="075">成都</el-dropdown-item>
              <el-dropdown-item command="233">西安</el-dropdown-item>
              <el-dropdown-item command="125">海口</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>

      <div class="header_right">
        <el-menu
          :default-active="$route.path"
          router
          background-color="#181B2C"
          text-color="#fff"
          active-text-color="#fff"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item v-for="item in navList" :index="item.router" :key="item.name">{{item.name}}</el-menu-item>
          <!-- <el-menu-item>其余</el-menu-item> -->
          <el-submenu index="2">
            <template slot="title">其余</template>
            <el-menu-item index="/trip">出行活跃区域统计</el-menu-item>
            <el-menu-item index="/police">疲劳驾驶报警</el-menu-item>
            <el-menu-item index="/supplyDemand">供需分析</el-menu-item>
            <el-menu-item index="/trafficJam">道路拥堵分析</el-menu-item>
            <el-menu-item index="/order">订单查询</el-menu-item>
            <el-menu-item index="/presentation">报告</el-menu-item>


            <el-menu-item index="/orderData">订单数据</el-menu-item>
            <el-menu-item index="/userData">用户数据</el-menu-item>
            <el-menu-item index="/heatMap">热力图</el-menu-item>
            <el-menu-item index="/bookingForm">预约单</el-menu-item>
            <el-menu-item index="/system">系统监控</el-menu-item>
            <!-- <el-submenu index="2-4">
              <template slot="title">选项</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu> -->
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      navList: [
        { name: "概览", router: "/" },
        { name: "订单监控", router: "/orderMonitoring" },
        { name: "轨迹监控", router: "/trajectory" },
        { name: "虚拟车站", router: "/station" },
        { name: "出行迁途", router: "/movingway" },
        { name: "订单报表", router: "/orderStatement" },
        { name: "用户乘车行为统计", router: "/behavior" },
        // { name: "其余", router: "/behavior" }
        // { name: "用户数据", router: "/behavior" },
        // { name: "热力图", router: "/behavior" }
      ],
      city: "成都"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      if (command === "075") {
        this.city = "成都";
      } else if (command === "233") {
        this.city = "西安";
      } else if (command === "125") {
        this.city = "海口";
      }
      // 修改vuex中citycode
      this.$store.dispatch("setCitycode", command);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background: #181b2c;
  opacity: 0.8;
  color: #fff;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
}
.header-inner {
  min-width: 1200px;
}
.header_left {
  width: 30%;
  float: left;
  // background:#ccc;
  .logo {
    width: 100px;
    font-size: 20px;
    font-weight: 500;
    padding-left: 40px;
    height: 60px;
    background: url("~@/assets/logo.png") no-repeat left center;
    background-size: 20%;
  }
  li {
    float: left;
    line-height: 60px;
    margin-left: 60px;
  }
}
.header_right {
  min-width: 60%;
  float: right;
  background: #ccc;
}
.el-dropdown {
  color: #fff;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-dropdown-menu {
  opacity: 0.8;
}
</style>