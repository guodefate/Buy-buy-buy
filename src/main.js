import Vue from 'vue'
import App from './App.vue'
//下载VueRouter
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;
//导入css样式
import "./assets/site/css/style.css";
// 导入axios
import axios from "axios";
Vue.prototype.$axios= axios;
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
// 导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// 导入放大镜模块
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);
// 导入组件
import index from "./components/index.vue";
import detail from "./components/detail.vue"
import shopCart from "./components/shopCart.vue"
import order from "./components/order.vue"
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
  },
  {
    path: '/shopCart',
    component:shopCart
  },
  {
    path: '/order',
    component:order
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

// 增加导航守卫 回调函数(每次路由改变的时候 触发)
router.beforeEach((to, from, next) => {
    console.log('我守卫你')
    // next();
    // console.log(to);
    // console.log(from);
    if(to.path=="/order"){
      axios.get("site/account/islogin").then(res => {
             console.log(res);
             if (res.data.code == "nologin") {
               // 提示用户
               Vue.prototype.$message({
                 message: "警告哦，您还没有登录哦",
                 type: "warning"
               });
              router.push('/index');
             }
           });
    }else{
      // next 如果不执行 就不会路由跳转
       next();
    }
})
// vuex的使用
import Vuex from 'vuex'

Vue.use(Vuex)
// 实例化仓库对象
const store = new Vuex.Store({
  // 状态
  state: {
    // count: 0
    // 购物车数据对象
    //短路运算||如果没有数据 左边的值是false 去获取 || 右边的值
    cartData:JSON.parse(window.localStorage.getItem('hm24'))||{
      90:6,
      102:3
    }
  },
  //Vuex的计算属性
  getters:{
    totalCount(state){
      // 通过state 获取 内部的数据
      // 计算并返回
      let num=0;
      for(const key in state.cartData){
        // 循环累加
        num+=state.cartData[key]
      }
      return num;
    }
  },
//  数据改变的方法
  mutations: {
    // 增加(简单的)
    // increment (state,obj) {
    //   state.count++
    // }

    // 往购物车添加数据的方法
    // 约定 对象的属性名 goodId goodNum(商品个数) 2->two
    add2Cart(state,obj){
      if(state.cartData[obj.goodId]!=undefined){
           state.cartData[obj.goodId]+=obj.goodNum;
      }else{
        // state.cartData[obj.goodId]=obj.goodNum;
        // 商品不存在 动态增加键值对
        // 如果动态增加的属性 必须使用Vue.set才可以跟踪数据改变
        // 参数1 对象  参数2 添加的属性名   参数3 属性的值
        Vue.set(state.cartData, obj.goodId, obj.goodNum)
      }

    },
    updatedCartData(state,obj) {
      // console.log(obj);
      state.cartData=obj;
    },
    delGoodById(state,id){
      // delete state.cartData[id]; 一般情况下直接删除
      // 但是delete 删除的属性 Vue无法跟踪 
      // 参数1 对象 参数2删除的属性
      Vue.delete(state.cartData,id);
    }
  }
})

// 浏览器关闭保存数据
window.onbeforeunload =function(){
  window.localStorage.setItem('hm24',JSON.stringify(store.state.cartData))
}
// 实例化Vue
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')