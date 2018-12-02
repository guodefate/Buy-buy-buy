<template>
    <div class="shopcart">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a>&gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车
                        </h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                 <!-- 购物车内的商品 -->
                                <tr v-for="(item, index) in goodList" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.isSelected" active-color="#13ce66" inactive-color="#9e9e9e">
                                        </el-switch>

                                    </td>
                                    <td>
                                        <img :src="item.img_url" alt="">
                                        <span class="title">{{item.title}}</span>
                                    </td>
                                    <td>
                                       {{item.sell_price}} 
                                    </td>
                                    <td><el-input-number v-model="item.buycount"  :min="0" ></el-input-number></td>
                                    <td>{{item.buycount * item.sell_price}}</td>
                                    <td> <el-button @click="delOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button> </td>
                                </tr>
                                <!-- 当购物车没有商品时 -->
                                <tr v-if="goodList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>
                                                    您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                               
                                <tr>

                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedCount}}</b>件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selectedPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <!-- <router-link @chick="" :to="'/order/'+selectedIds"> -->
                            <button class="submit" @click="toOrder">立即结算</button>
                            <!-- </router-link> -->
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "shopCart",
  data:function(){
  return{
     goodList:[]
  }
  },
  methods:{
     delOne(id){
        //  this.goodId=id;
        // $store.state.cartData[obj.goodId].splice(index,1);
        this.$confirm('此操作将删除该商品, 是否删除?', '温馨提示', {
          confirmButtonText: '狠心删除',
          cancelButtonText: '保留哦',
          type: 'warning'
        }).then(() => {
            // 删除数据
            this.goodList.forEach((v,index)=>{
                if(v.id==id){
                    this.goodList.splice(index,1);
                }
            });
            // 删除Vuex中的数据
            // 因为watch 会监控数据的改变 修改 删除 都会触发 同步更新Vuex中的数据,所以不要再写载荷
            // this.$store.commit('delGoodById',id);
          this.$message({ 
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     },
    //立即结算
    toOrder(){
        if(this.selectedCount==0){
            this.$message.warning('请勾选宝贝再提交')
        }else{
            this.$router.push('/order/'+this.selectedIds)
        }
    }
  },
//计算属性
   computed:{
    // 计算选中的全部商品id
        selectedIds(){
         let ids="";
         this.goodList.forEach(v=>{
             if(v.isSelected==true){
                 ids+=v.id;
                 ids+=',';
             }
         })
         ids=ids.slice(0,ids.length-1)
         return ids;
      },
    // 选中的个数
    selectedCount(){
        let num=0;
        this.goodList.forEach(v=>{
            // 如果被选中
            if(v.isSelected==true){
                // 累加上购买个数
                num+=v.buycount;
            }
        })
        return num;
    },
    // 选中的总金额
    selectedPrice(){
        let price=0;
        this.goodList.forEach(v=>{
            // 如果被选中
            if(v.isSelected==true){
                price+=v.buycount*v.sell_price;
            }
        })
        return price;
    }
   },
// 生命周期
  created(){
    // 生成数据 id1 ,id2 id3
    let ids='';
    for (const key in this.$store.state.cartData) {
        ids += key;
        ids += ",";
    }
    // 取消最后一个
    ids=ids.slice(0,ids.length-1);
    // console.log(ids);
// 调用接口
      this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(res=>{
            // console.log(res);
            // 服务器返回的数据中是没有个数的 所以要自行拼接
            res.data.message.forEach(v=>{
                //通过id 获取个数 赋值给v.buycount
                v.buycount=this.$store.state.cartData[v.id];
                // 增加一个是否被选择的字段 用来切换  页面中的switch 开关
                v.isSelected=true;
            })
            // console.log(res);
            this.goodList=res.data.message;

      })
  },
//使用watch 观察数据的改变
   watch:{
       goodList:{
           //引用类型 两次的值都是一样的
      handler: function (val, oldVal) { 
        let obj={};
        val.forEach(v=>{
            // 动态的增加属性
            obj[v.id]=v.buycount;
        })
        //   console.log(obj);
        // 提交载荷
        this.$store.commit("updatedCartData",obj)
      },
      deep: true
    },
   }

};
</script>
<style >
td img{
    width: 100px;
}
td span.title{
    margin-left: 10px;
}
td:nth-child(2){
    display: flex;
    align-items: center;
}
</style>