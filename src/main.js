import Vue from 'vue'
import App from './App.vue'
//下载VueRouter
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入组件
import index from "./components/index.vue";
import detail from "./components/detail.vue"
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
//导入css样式
import "./assets/site/css/style.css";
// 导入axios
import axios from "axios";
Vue.prototype.$axios= axios;
// 导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// 路由规则
let routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path:'/index',
    component:index

  },
  {
    path: '/detail/:artID',
    component:detail
  }
]
// 实例化路由
let router = new VueRouter({
  routes
});
//导入moment
import moment from "moment";
// 全局过滤器
Vue.filter('shortTime', value =>{ 
    return moment(value).format("YYYY:MM:DD🛴");
});
Vue.filter('shortTimePlus', value =>{ 
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
})
// 实例化Vue
new Vue({
  render: h => h(App),
  router
}).$mount('#app')