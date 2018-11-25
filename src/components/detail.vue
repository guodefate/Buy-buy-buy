<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- 放大镜组件 -->
                                <ProductZoomer
                                  :base-images="images"
                                  :base-zoomer-options="zoomerOptions"
                                />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" :min="1" :max="goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>  
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=0"  :class="{selected:tabIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=1" :class="{selected:tabIndex==1}">商品评论</a>
                                    </li>
                                    
                                </ul>
                            </div>
                             </Affix>
                            <div class="tab-content entry" v-show="tabIndex==0" v-html="goodsinfo.content">
    
                            </div>
                            <div class="tab-content" v-show="tabIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model="comment" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="submitComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);" v-show="totalcount==0">暂无评论，快来抢沙发吧！</p>
                                        <li 
                                        v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shortTimePlus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                         <!-- 使用iView的分布组件 设置当前面 -->
                                            <Page :current="pageIndex" :total="totalcount" show-sizer placement="top" show-elevator @on-change="pageChange" :page-size="pageSize" @on-page-size-change="sizeChange" :page-size-opts="[7,14,21]" />
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop><span>🚀</span></BackTop>
    </div>
</template>
<script>
export default {
  name: "detail",
  data: function() {
    return {
      //商品的id
      artID: "",
      // 商品信息
      goodsinfo: [],
      //图片信息
      imglist: [],
      //热卖商品列表
      hotgoodslist: [],
      //购买数量
      buyCount: 1,
      //记录点击的tab栏索引
      tabIndex:0,
      //页码
      pageIndex:1,
    //页容量
      pageSize:7,
    // 评论数据
      comments:[],
      //评论总数
       totalcount:0,
    //  评论内容
      comment:"",
    // 放大镜数据
      images:{                                                                                    
      'normal_size':  // required                          
      [                                             
        {'id':'unique id', 'url': 'image url'},      
        {'id':'unique id', 'url': 'image url'}       
      ]                                               
                                                                     
 },
      //放大镜的设置
      zoomerOptions:{
         
        'zoomFactor': 4,
        'pane': 'container',
        'hoverDelay': 300,
        'namespace': 'container-zoomer',
        'move_by_click':true,
        'scroll_items': 4,
        'choosed_thumb_border_color': "#ff3d00"
     }      
    };         
  },
//   事件
  methods: {
    initData() {
        // 初始化购买个数
        this.buyCount=1;
    //   console.log(this.$route.params);
      this.artID = this.$route.params.artID;
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(res => {
        //   console.log(res);
          this.goodsinfo = res.data.message.goodsinfo;
          this.imglist = res.data.message.imglist;
          this.hotgoodslist = res.data.message.hotgoodslist;
        });
        // 调用获取评论的方法
        this.getComments();
    },
    // 获取评论数据
    getComments(){
        this.$axios.get(`http://111.230.232.110:8899/site/comment/getbypage/goods/${this.artID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res=>{
            this.comments=res.data.message;
            this.totalcount=res.data.totalcount;
        })
        
    },
    // 页码改变事件
    pageChange(pageIndex){
        this.pageIndex=pageIndex;
        // 重新调用这一页的数据,用事情改变传过来的页码
       this.getComments();
    },
    // 页码尺寸容器改变
    sizeChange(pageSize){
        this.pageSize=pageSize;
        // 重新获取评论数据即可
        this.getComments();
    },
    // 获取评论内容
    submitComment(){
        // 非空判断
       if(this.comment==""){
           this.$Message.warning('请输入内容');
       }else{
        // 有内容 用接口发表评论
        this.$axios.post(`site/validate/comment/post/goods/${this.artID}`,{
            commenttxt:this.comment
        }).then(res=>{
            console.log(res);
            // 判断是否成功
            if(res.data.status==0){
                // 提示用户
                this.$Message.success(res.data.message);
                // 清空评论框内容
                this.comment="";
                // 初始化页面为1,才能看到自己的评论
                this.pageIndex=1;
                // 重新渲染评论
                this.getComments();
            }
        })
        
       }
    }

  },
  created() {
    //保存数据
    this.initData();
  },
  watch: {
    $route(newVal, oldVal) {
        this.initData();
    }
  }
};
</script>
<style>
.tab-content img{
    display: block;
    width:100%;
}
.ivu-back-top-show span{
    font-size: 70px;
    display: block;
    transform: rotateZ(-45deg);
}
</style>
