<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="#/" class="router-link-active">首页</a> &gt;
        <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div class="left-220" style="margin: 0px;">
            <div class="banner-nav">
              <ul>
                <li v-for="(item, index) in catelist" :key="item.id">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span v-for="(it, i) in item.subcates" :key="it.id"> {{it.title}}&nbsp; </span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <a v-for="(it, i) in item.subcates" :key="it.id" href="/goods/43.html">{{it.title}}</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <el-carousel height="341px">
                <el-carousel-item v-for="(item, index) in sliderlist" :key="item.id" >
                  <img :src="item.img_url" alt="">
                </el-carousel-item>
              </el-carousel>

            </div>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for="(item, index) in toplist" :key="item.id">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time | shortTime}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部数据 -->
    <div v-for="(item, index) in grouplist" :key="item.level1cateid" class="section">
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a v-for="(it, i) in item.level2catelist" :key="it.subcateid" href="/goods/43.html">{{it.subcatetitle}}</a>
          <a href="/goods/40.html">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="(it, i) in item.datas" :key="it.artID">
              <!-- <a href="#/site/goodsinfo/87" class=""> -->
              <router-link :to="'/detail/'+it.artID">
                <div class="img-box">
                  <img :src="it.img_url">
                </div>
                <div class="info">
                  <h3>{{it.artTitle}}</h3>
                  <p class="price">
                    <b>{{it.sell_price}}</b>元</p>
                  <p>
                    <strong>库存 {{it.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{it.market_price}}</s>
                    </span>
                  </p>
                </div>
                </router-link>
              <!-- </a> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
// // 导入axios
// import axios from "axios";
// //导入moment
// import moment from "moment";
export default {
  name: "index",
  data: function() {
    return {
      //   分类列表
      catelist: [],
        //   轮播图
      sliderlist: [],
       //   置顶推荐
      toplist: [],
      // 底部数据
      grouplist:[]
    };
  },
  //生命周期函数
  created() {
    this.$axios
      .get("http://111.230.232.110:8899/site/goods/gettopdata/goods")
      .then(response => {
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
      });
      this.$axios.get('http://111.230.232.110:8899/site/goods/getgoodsgroup').then(res=>{
        // console.log(res);
        this.grouplist=res.data.message;
      });
      window.scroll(0,0)
  },
  // //私有过滤器
  // filters: {
  //   shortTime(value) {
  //     return moment(value).format("YYYY:MM:DD✨");
  //   }
  // }
};
</script>
<style>
</style>

