import Vue from "vue";
import Router from "vue-router";
// 概览
import Overview from "./views/Overview.vue";
// 订单监控
import OrderMonitoring from "./views/OrderMonitoring.vue";
// 轨迹监控
import Trajectory from "./views/Trajectory.vue";
// 虚拟车站
import Station from "./views/Station.vue";
// 出行迁途
import Movingway from "./views/Movingway.vue";
// 订单报表
import OrderStatement from "./views/OrderStatement.vue";
// 用户乘车行为
import Behavior from "./views/Behavior.vue";
// 出行活跃区域统计
import Trip from "./views/Trip.vue";
// 疲劳驾驶报警
import Police from "./views/Police.vue";
// 供需分析
import SupplyDemand from "./views/SupplyDemand.vue";
// 道路拥堵分析
import TrafficJam from "./views/TrafficJam.vue";
// 订单查询
import Order from "./views/Order.vue";
// 报告
import Presentation from "./views/Presentation.vue";
// 订单数据
import OrderData from "./views/OrderData.vue";
// 用户数据
import UserData from "./views/UserData.vue";
// 热力图
import HeatMap from "./views/HeatMap.vue";
// 预约单
import BookingForm from "./views/BookingForm.vue";
// 系统监控
import System from "./views/System.vue";


Vue.use(Router);

export default new Router({
  // mode: "history",
  // base: '/dist/',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "overview",
      component: Overview
    },
    {
      path: "/orderMonitoring",
      name: "orderMonitoring",
      component: OrderMonitoring,
      meta: {
        isAuth: true
      }
    },
    {
      path: "/trajectory",
      name: "trajectory",
      component: Trajectory
    },
    {
      path: "/station",
      name: "station",
      component: Station
    },
    {
      path: "/movingway",
      name: "movingway",
      component: Movingway
    },
    {
      path: "/orderStatement",
      name: "orderStatement",
      component: OrderStatement
    },
    {
      path: "/behavior",
      name: "behavior",
      component: Behavior
    },
    {
      path: "/trip",
      name: "trip",
      component: Trip 
    },
    {
      path: "/police",
      name: "police",
      component: Police 
    },
    {
      path: "/supplyDemand",
      name: "supplyDemand",
      component: SupplyDemand 
    },
    {
      path: "/trafficJam",
      name: "trafficJam",
      component: TrafficJam 
    },
    {
      path: "/order",
      name: "order",
      component: Order 
    },
    {
      path: "/presentation",
      name: "presentation",
      component: Presentation 
    },
    {
      path: "/orderData",
      name: "orderData",
      component: OrderData 
    },
    {
      path: "/userData",
      name: "userData",
      component: UserData 
    },
    {
      path: "/heatMap",
      name: "heatMap",
      component: HeatMap 
    },
    {
      path: "/bookingForm",
      name: "bookingForm",
      component: BookingForm 
    },
    {
      path: "/system",
      name: "system",
      component: System 
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

