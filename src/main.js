import Vue from 'vue'
import App from './App.vue'
//下载VueRouter
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入组件
import index from "./components/index.vue";

Vue.config.productionTip = false
//导入css样式
import "./assets/site/css/style.css"
// 路由规则
let routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path:'/index',
    component:index

  }
]
// 实例化路由
let router = new VueRouter({
  routes
});
// 实例化Vue
new Vue({
  render: h => h(App),
  router
}).$mount('#app')