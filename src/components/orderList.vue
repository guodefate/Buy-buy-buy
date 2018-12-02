<template>
    <div class="right-auto orderList">
        <div class="bg-wrap" style="min-height: 765px;">
            <div class="sub-tit">
                <ul>
                    <li class="selected">
                        <a href="/user/order-list.html">交易订单</a>
                    </li>
                </ul>
            </div>
            <div class="table-wrap">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                    <tbody>
                        <tr>
                            <th width="16%" align="left">订单号</th>
                            <th width="10%">姓名</th>
                            <th width="12%">订单金额</th>
                            <th width="11%">下单时间</th>
                            <th width="10%">状态</th>
                            <th width="12%">操作</th>
                        </tr>
                        <tr v-for="(item, index) in orderList" :key="item.id">
                            <td>{{item.order_no}}</td>
                            <td align="left">{{item.accept_name}}</td>
                            <td align="left">
                                <strong style="color: red;">￥{{item.order_amount}}</strong>
                                <br> 在线支付
                            </td>
                            <!-- 过滤器 中间的 竖线 也叫作 管道符-->
                            <td align="left">{{item.add_time | shortTimePlus}}</td>
                            <td align="left">
                                {{item.statusName}}
                            </td>
                            <td align="left">
                                <router-link :to="'/vipCenter/orderDetail/'+item.id">查看订单</router-link>
                                <!-- <br> -->
                                <router-link :to="'/payMoney/'+item.id" v-show="item.status==1">|去付款</router-link>
                                <!-- <br> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="page-foot">
                    <el-pagination background @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-sizes="[5, 10, 15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "orderList",
  data: function() {
    return {
      pageIndex: 1,
      pageSize: 10,
      orderList: {},
      //总数量
      totalcount: 0
    };
  },
  methods:{
      getOrderList(){
           this.$axios
      .get(
        `site/validate/order/userorderlist?pageIndex=${
          this.pageIndex
        }&pageSize=${this.pageSize}`
      )
      .then(res => {
        console.log(res);
        this.orderList = res.data.message;
        this.totalcount = res.data.totalcount;
      });
      },
     pageSizeChange(pageSize){
        //  console.log(pageSize);
        // 保存数据
        this.pageSize=pageSize;
        // 重置到第一页 方便用户查看
        this.pageIndex=1;
        //重新获取数据
         this.getOrderList();
     },
     pageIndexChange(pageIndex){
        //保存数据
        this.pageIndex=pageIndex;
        // 重新获取数据
         this.getOrderList();
     }
  },
  created() {
   this.getOrderList();
  }
};
</script>
<style>
td a {
  display: block;
}
</style>

