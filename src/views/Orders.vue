<template>
  <div class="orders">
    <van-nav-bar title="订单确认" fixed placeholder z-index="999" :border="false" left-arrow @click-left="$router.back()" />
    <van-count-down :time="time" @finish="finish" format="您请在mm分ss秒内完成支付,超时将取消订单。" style=" position: fixed; z-index:99; width:100%; line-height:28px; background:#fc5869; text-align:center; color:#fff; font-size:12px;" />
    <div class="one">
      <div>当前影城</div>
      <div>{{nameList}}</div>
    </div>
    <div class="shopOrders">
      <div class="gwc">
        <div>已选商品</div>
      </div>
      <div v-for="item in shoparr" :key="item.index">
        <div class="ten" v-if="item.num>0" style="position: relative;">
          <div v-if="item.name=='乖巧宝宝主题桶含爆'||item.name=='乖巧宝宝TOP杯含可'">套餐</div>
          <div v-else>单品</div>
          <div style="position: absolute; left:13%;">{{item.name}}</div>
          <div style="position: absolute; left:75%;">x{{item.num}}</div>
          <div>￥{{item.price}}</div>
        </div>
      </div>
      <div class="over">
        <div>总价:</div>
        <div>￥{{shoptotal}}.00</div>
      </div>
    </div>
    <div class="yhq">
      <div>商品优惠券</div>
      <div @click="$router.push('/shopyhq')">
        <span>更多</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="jf">
      <div class="jfone">积分兑换券<span>(当前可用积分5)</span></div>
      <div class="jftwo" v-for="(item,index) in arr" :key="index">
        <div class="left">
          <div>{{item.one}}元通用观影立减券</div>
          <div>需{{item.two}}积分</div>
        </div>
        <div class="right">
          <button @click="$toast('您当前积分不足以兑换此优惠券');">确认兑换</button>
        </div>
      </div>
      <div class="jfthr">提示:每个座位可选一张,兑换更多优惠券请前往积分商城</div>
    </div>
    <div class="yh">
      <div>朋友卡优惠</div>
      <div @click="$router.push('/yh')">
        <span>更多</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="kg">
      <div @click="jf">
        <span>使用积分</span>
        <van-icon name="question-o" color="#aaa" size="13" />
        <span>周五专享</span>
        <div>积分满50后可抵扣现金</div>
      </div>
      <div @click="kt">
        <van-switch v-model="kg" />
      </div>
    </div>
    <div class="for">支付方式</div>
    <div class="fiv">
      <svg class="icon" aria-hidden="true" style=" font-size:28px;">
        <use xlink:href="#icon-xyk-copy"></use>
      </svg>
      <div>星意卡余额支付</div>
      <div @click="$router.push('/xyk')">
        <span>更多</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="sex">
      <div>
        <van-icon name="wechat" color="#31bb70" size="28" />
      </div>
      <div>
        <div>微信支付</div>
        <div>支持储存卡、信用卡</div>
      </div>
      <div>
        <van-checkbox v-model="checked" checked-color="#ee0a24" @click="checked=true"></van-checkbox>
      </div>
    </div>
    <div class="sev">
      <div>
        <svg class="icon" aria-hidden="true" style=" font-size:28px;">
          <use xlink:href="#icon-shouji"></use>
        </svg>
      </div>
      <div>将取票码发送到手机</div>
      <div>{{logname}}</div>
      <div @click="tel=true">
        <svg class="icon" aria-hidden="true" style=" font-size:28px;">
          <use xlink:href="#icon-bianxie"></use>
        </svg>
      </div>
    </div>
    <div class="footer">
      <div class="fone">待支付:<span>￥{{shoptotal}}</span></div>
      <div class="ftwo" @click="model=!model">
        <span>明细</span>
        <van-icon name="arrow-down" v-if="model" />
        <van-icon name="arrow-up" v-else />
      </div>
      <button @click="pay">确认支付</button>
    </div>
    <van-action-sheet v-model="model" :overlay="false" get-container="body" :safe-area-inset-bottom="false" style="margin-bottom:40px; z-index:9;">
      <div class="center" style=" display: flex; justify-content: space-between; padding: 10px 10px 0 10px; border-bottom: 1px solid #aaa; line-height: 28px;">
        <div style=" font-size: 13px; padding-bottom: 10px;">结算明细</div>
        <van-icon name="cross" size="18" style="margin-top:5px;" @click="model=false" />
      </div>
      <div class="content">
        <div style="font-size: 14px; font-weight: 700; padding:10px 0 10px 10px">商品</div>
        <div v-for="item in shoparr" :key="item.index">
          <div v-if="item.num>0" style="display: flex; justify-content: space-between; font-size:12px; padding:0 10px 10px 10px; position: relative;">
            <div>{{item.name}}</div>
            <div style="position: absolute; left:65%;">x{{item.num}}</div>
            <div>￥{{item.price}}</div>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <van-dialog v-model="tel" title="修改手机号" @confirm="conname">
      <div style="width: 250px; height: 42px; border: 1px solid #aaa;border-radius: 20px;line-height: 42px;margin: 0 auto;font-size: 13px;"><input type="text" placeholder="请输入账号" autocomplete="off" v-model="username" @touchstart.stop="show=true" style=" width: 180px; margin-left:10px; letter-spacing: 1px;border: #fff;height: 30px;"></div>
    </van-dialog>
    <!-- <van-number-keyboard :show="show" extra-key="" @blur="show = false" v-model="username" :maxlength="11" z-index="2022" style="padding-bottom:0;" /> -->
  </div>
</template>

<script>
import Vue from 'vue';
import { CountDown, Switch, ActionSheet } from 'vant';
Vue.use(CountDown).use(Switch).use(ActionSheet)
export default {
  data() {
    return {
      nameList: '',
      kg: false,
      checked: true,
      logname: '',
      tel: false,
      username: '',
      // show: false,
      model: false
    }
  },
  created() {
    this.nameList = localStorage.getItem('nameList')
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.logname = userInfo.username
  },
  computed: {
    time() {
      return 15 * 60 * 1000
    },
    arr() {
      return [{
        one: 3,
        two: 30
      },
      {
        one: 5,
        two: 50
      },
      {
        one: 10,
        two: 100
      }]
    },
    shoparr() {
      return this.$store.state.goodsList
    },
    shoptotal() {
      let sum = 0
      this.shoparr.forEach(v => {
        sum += Number(v.num * v.price)
      })
      return sum
    },
  },
  methods: {
    finish() {
      this.$dialog.alert({
        title: '温馨提示',
        message: '订单超时取消,请重新下单。',
        confirmButtonText: '重新下单'
      }).then(() => {
        this.$router.back()
      })
    },
    jf() {
      this.$dialog.alert({
        title: '积分使用规则',
        message: '一、可用积分使用规则\n1.可用积分累计到达50积分以上时可以作为现金使用(积分当钱花仅限周五使用);其中10积分=1元,购买票房/商品时可作为现金使用;APP/官方1积分为单位使用;\n2.单笔消费使用积分上限为1000积分(100元)&单日消费使用积分,上限为3000积分(300元)。\n二、CGV可用积分有效期\n1.购买影票或商品获取的积分自生效日起至次年12月31日为止,逾期失效。(无论于2017年1月1日/6月25日/12月31日累积的积分,积分有效期均至2018年12月31日止)。\n2.参与其他积分赠送活动获取的积分,根据活动规则不同有效期也不同。\n>温馨提示\n1.在第三方渠道(猫眼、淘票票等)购买不积分;\n2.购买朋友卡(全优卡/储值卡等)的充值金额及卡费不积分,使用时按照消费规则积分;\n3.购买及使用兑换券(包含抖音代金券、APP福袋),礼品卡不积分;\n4.等级积分获取上限:但你日获取积分上限为100积分&单日最多8张影票可获取积分。',
        messageAlign: 'left'
      })
    },
    kt() {
      this.kg = false
      this.$toast('暂未开通积分支付,敬请期待~')
    },
    conname() {
      let regname = /^1[3-9][0-9]{9}$/
      if (!(regname.test(this.username))) {
        this.$toast('格式不对')
        this.username = ''
      } else {
        this.$toast('修改成功')
        this.logname = this.username
      }
    },
    pay() {
      this.$dialog.confirm({
        title: '请确认您购买的影城',
        message: this.nameList + 'CGV影城'
      }).then(() => {
        this.$toast('不让您破费了')
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss">
.orders {
  .one {
    margin-top: 30px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 14px;
    border-bottom: 2px solid #e9e9e9;
    div:nth-of-type(2) {
      color: #fc5869;
      font-weight: 700;
    }
  }
  .gwc {
    padding-left: 10px;
    line-height: 38px;
    div {
      font-size: 13px;
      color: #333;
    }
  }
  .ten {
    border-bottom: 2px solid #f6f6f6;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;
    div:nth-of-type(1) {
      width: 28px;
      text-align: center;
      color: #fc5869;
      border: 1px solid #fc5869;
      font-size: 12px;
      border-radius: 3px;
    }
    div:nth-of-type(2),
    div:nth-of-type(3),
    div:nth-of-type(4) {
      font-size: 13px;
    }
  }
  .over {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 50px;
    border-bottom: 2px solid #f6f6f6;
    div:nth-of-type(1) {
      font-size: 14px;
    }
  }
  .yhq {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    line-height: 38px;
    border-bottom: 2px solid #f6f6f6;
    div {
      font-size: 13px;
      color: #333;
    }
  }
  .jf {
    padding: 0 10px;
    border-bottom: 2px solid #f6f6f6;
    .jfone {
      margin-top: 20px;
      font-size: 13px;
      span {
        font-size: 12px;
        color: #aaa;
      }
    }
    .jftwo {
      margin: 10px 0;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 8px;
      height: 70px;
      font-size: 12px;
      .left {
        float: left;
        line-height: 35px;
        text-align: left;
        margin-left: 10px;
        div:nth-of-type(1) {
          color: #db281f;
        }
        div:nth-of-type(2) {
          color: #aaa;
        }
      }
      .right {
        float: right;
        button {
          line-height: 24px;
          margin: 24px 10px 0 0;
          border: #fff;
          background-color: #db281f;
          color: #fff;
          border-radius: 18px;
        }
      }
    }
    .jfthr {
      margin: 20px 0;
      color: #fc5869;
      font-size: 12px;
    }
  }
  .yh {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    line-height: 38px;
    border-bottom: 2px solid #f6f6f6;
    div {
      font-size: 13px;
      color: #333;
    }
  }
  .kg {
    padding: 0 10px;
    border-bottom: 8px solid #f6f6f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    div:nth-of-type(1) {
      font-size: 14px;
      span:nth-of-type(1) {
        margin-right: 2px;
      }
      span:nth-of-type(2) {
        font-size: 12px;
        color: #fc5869;
        margin-left: 2px;
      }
      div {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
  .for {
    padding: 0 10px;
    line-height: 38px;
    font-size: 14px;
  }
  .fiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 13px;
    border-bottom: 2px solid #e9e9e9;
    line-height: 38px;
    div:nth-of-type(1) {
      margin-right: 176px;
    }
  }
  .sex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    border-bottom: 2px solid #e9e9e9;
    line-height: 22px;
    div:nth-of-type(2) {
      font-size: 12px;
      margin-right: 90px;
      div:nth-of-type(2) {
        color: #aaa;
      }
    }
  }
  .sev {
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    height: 38px;
    border-bottom: 2px solid #e9e9e9;
    div:nth-of-type(1) {
      margin-left: 10px;
    }
    div:nth-of-type(2) {
      margin-left: 8px;
      font-size: 12px;
    }
    div:nth-of-type(3) {
      margin-left: 114px;
      font-size: 12px;
    }
  }
  .footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 38px;
    position: fixed;
    bottom: 0;
    z-index: 2022;
    background-color: #fff;
    .fone {
      font-size: 12px;
      margin-left: 10px;
      span {
        color: #fc5869;
        font-size: 16px;
      }
    }
    .ftwo {
      font-size: 12px;
      margin-left: 120px;
      span {
        margin-right: 5px;
      }
    }
    button {
      width: 100px;
      border: #fff;
      background-color: #fc5869;
      color: #fff;
      font-size: 13px;
    }
  }
}
</style>