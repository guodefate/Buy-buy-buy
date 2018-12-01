<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item class="my-input" label="收货人姓名" prop="accept_name">
                                    <el-input v-model="ruleForm.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item class="my-input" label="所属地区" prop="area">
                                    <v-distpicker @selected='selectedArea' :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                </el-form-item>
                                <el-form-item class="my-input" label="详细地址" prop="address">
                                    <el-input v-model="ruleForm.address"></el-input>
                                </el-form-item>
                                <el-form-item class="my-input" label="手机号码" prop="mobile">
                                    <el-input v-model="ruleForm.mobile"></el-input>
                                </el-form-item>
                                <el-form-item class="my-input" label="电子邮箱" prop="email">
                                    <el-input v-model="ruleForm.email"></el-input>
                                </el-form-item>
                                <el-form-item class="my-input-min" label="邮政编码" prop="post_code">
                                    <el-input v-model="ruleForm.post_code"></el-input>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="ruleForm.payment_id" label="6"> 在线支付</el-radio>
                                            &nbsp; &nbsp; &nbsp;
                                            <em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                                <el-radio v-model="ruleForm.express_id" @change="ruleForm.expressMoment=20 " label="1">顺风快递</el-radio>&nbsp;&nbsp;
                                                <em>邮费:20元</em>&nbsp;&nbsp;
                                                <el-radio v-model="ruleForm.express_id" @change="ruleForm.expressMoment=8 " label="2">圆通快递</el-radio>&nbsp;&nbsp;
                                                <em>邮费:8元</em>&nbsp;&nbsp;
                                                <el-radio v-model="ruleForm.express_id" @change="ruleForm.expressMoment=10 " label="3">中通快递</el-radio>&nbsp;&nbsp;
                                                <em>邮费:10元</em>&nbsp;&nbsp;
                                            <span class="Validform_checktip"></span>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in goodsList" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    {{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    {{item.sell_price*item.buycount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" v-model="ruleForm.message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{goodNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{goodPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{goodPrice+ruleForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <!-- <a class="btn button" href="/cart.html"> -->
                                            <router-link class="btn button" to="/shopCart">返回购物车</router-link>
                                            <!-- </a> -->
                                            <a id="btnSubmit" @click="submit('ruleForm')" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import VDistpicker from "v-distpicker";

export default {
  name: "order",
  data: function() {
    //自定义校验规则 函数 会被element-ui 内部调用 手机号码
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        // 非空 格式验证
        // 正则表达式的规则
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        //用正规判断对错
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("输入的手机号码有误"));
        }
      }
    };
    //邮箱验证码
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱号码"));
      } else {
        // 非空 格式验证
        // 正则表达式的规则
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        //用正规判断对错
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("输入的邮箱号码有误"));
        }
      }
    };
    //邮政邮编
    var validatePostCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮政编码"));
      } else {
        // 非空 格式验证
        // 正则表达式的规则
        let reg = /^[1-9]\d{5}(?!\d)$/;
        //用正规判断对错
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("输入的邮政编码有误"));
        }
      }
    };

    return {
      ids: "",
      goodsList: [],
      //商品总件数
      goodNum: 0,
      // 商品总价钱
      goodPrice: 0,
      //element-ui的数据
      ruleForm: {
        //收货人姓名
        accept_name: "果冻",
        // 收货人地址
        address: "留仙名苑",
        //收货人手机号
        mobile: "18888888888",
        // 电子邮箱
        email: "fate@qq.com",
        //邮政编码
        post_code: "437400",
        // 地区
        area: {
          province: { code: "140000", value: "山西省" },
          city: { code: "140100", value: "太原市" },
          area: { code: "140106", value: "迎泽区" }
        },
        // 支付方式
        payment_id: "6",
        // 快递编码
        express_id: "1",
        //运费
        expressMoment: 20,
        // 订单备注
        message:"快点发货哦"
      },
      //验证规则
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "change" },
          { min: 3, max: 50, message: "不符合地址规范", trigger: "change" }
        ],
        mobile: [{ validator: validateMobile, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods: {
    selectedArea(newArea) {
    //   console.log(newArea);
      this.ruleForm.area=newArea;
    },
    //切换快递
      submit(formName) {
          //提交数据之前 一般我们会最后对数据进行一次验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // 准备数据
            // 总金额
            this.ruleForm.goodsAmount=this.goodPrice;
            // 商品id们
            this.ruleForm.goodsids=this.ids;
            // {id:个数,id2:个数}
            let obj={};
            this.goodsList.forEach(v=>{
                obj[v.id]=v.buycount;
            })
            // 商品对象
            this.ruleForm.cargoodsobj=obj;
            // 提交订单发请求
            this.$axios.post('site/validate/order/setorder',this.ruleForm).then(res=>{
                console.log(res);
               if(res.data.status===0){
                   this.$Message.success("订单提交成功");
                 //跳转路由
                   this.$router.push('/payMoney/'+res.data.message.orderid);
                 //删除Vuex中的当前一次购买的数据
                 this.goodsList.forEach(v=>{
                    this.$store.commit('delGoodById',v.id)
                 })
               }
            })
          } else {
          this.$Message.warning('数据不完整,请检查')
            return false;
          }
        });
      },
  },
  created() {
    //   console.log(this.$route);
    this.ids = this.$route.params.ids;
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.ids}`)
      .then(res => {
        // console.log(res);
        this.goodsList = res.data.message;
        res.data.message.forEach(v => {
          v.buycount = this.$store.state.cartData[v.id];
          this.goodNum += v.buycount;
          this.goodPrice += v.buycount * v.sell_price;
        });
      });
  },
  //组件内注册
  components: { VDistpicker }

  //编程式导航
  //   created() {
  //     this.$axios.get("site/account/islogin").then(res => {
  //       console.log(res);
  //       if (res.data.code == "nologin") {
  //         // 提示用户
  //         this.$message({
  //           message: "警告哦，您还没有登录哦",
  //           type: "warning"
  //         });
  //         this.$router.push('/index');
  //       }
  //     });
  //   }
};
</script>
<style>
.my-input .el-input__inner {
  width: 500px;
}
.my-input-min .el-input__inner {
  width: 100px;
}
</style>
