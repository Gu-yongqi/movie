<template>
  <div class="order">
    <van-dialog class="van-dialogs" v-model="show" title="退票须知" message-align="left" :show-confirm-button="false" :message=msg>
    </van-dialog>
    <van-checkbox v-model="checked" checked-color="#fc5869" class="checkbox" icon-size="12px" v-if="show">我已阅读并同意以上内容</van-checkbox>
    <div class="btn" v-if="show">
      <button class="btnLeft" @click="show = false">暂不购票</button>
      <button class="btnRight" :disabled="!checked" @click="show = false" :style="{background:(checked?'#fc5869':'')}">继续购票</button>
    </div>
    <van-nav-bar title="订单确认" fixed placeholder z-index="2022" :border="false" left-arrow @click-left="click" />
    <van-count-down :time="time" @finish="finish" format="您请在mm分ss秒内完成支付,超时将取消订单。" style=" position: fixed; z-index:2022; width:100%; line-height:28px; background:#fc5869; text-align:center; color:#fff; font-size:12px;" />
    <div class="box">
      <div class="left">
        <img :src="img" alt="" style="width:100px; height:140px">
      </div>
      <div class="right">
        <h5>{{name}}</h5>
        <div>
          <span>{{y}}月{{r}}日</span>
          <span>{{times}}</span>
          <span>{{type}}</span>
        </div>
        <div>
          <span>{{nameList}}</span>
          <span>{{biute}}</span>
        </div>
        <div class="price">
          <div v-for="(item,index) in priceList" :key="index"><span>{{item.seatText}}</span><span style="color:#fc5869;">(￥{{item.price}})</span></div>
        </div>
      </div>
    </div>
    <div class="priceRight">
      <div>共{{priceList.length}}张 总票价: ￥{{total}}<span>(含{{3*priceList.length}}元服务费)</span></div>
    </div>
    <div class="checked2">
      <van-checkbox v-model="checked2" @click="checked2=true" icon-size="13px" checked-color="#fc5869" shape="square"><span style="font-size:12px;">有条件退票
          <van-popover v-model="popover" :actions="actions" placement="bottom-start" theme="dark" />
        </span></van-checkbox>
      <div @click="show1">
        <span>退票须知</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="yhq">
      <div>优惠券/代金券</div>
      <div @click="$router.push('/yhq')">
        <span>更多</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="yh">
      <div>朋友卡优惠</div>
      <div @click="$router.push('/yh')">
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
    <div class="xj">
      <div class="xjone">
        <div>票价小计:</div>
        <div>￥{{total}}</div>
      </div>
      <div class="xjtwo">
        <div>已优惠</div>
        <div>￥0</div>
      </div>
    </div>
    <div class="vip">
      <div class="vipone">
        <van-icon name="gem" color="#fff" size="30" style="margin-top:10px;" />
      </div>
      <div class="viptwo">
        <div>开通E优卡立享购票优惠</div>
        <div>开通后,影票立省￥7</div>
      </div>
      <div class="vipthr" @click="$router.push('/pyk')">
        <span>去开卡</span>
        <span>
          <van-icon name="arrow" />
        </span>
      </div>
    </div>
    <div class="sp">
      <div>热销商品</div>
      <div @click="$router.push('/shop')">
        <span>更多</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <ul class="shop">
      <div v-for="item in shoparr" :key="item.index">
        <li v-if="item.active==0">
          <div @click="$router.push({path:'/shopxq',query:{index:item.index}})">
            <img :src="item.img" alt="">
          </div>
          <div>{{item.name}}</div>
          <div>
            <span>￥{{item.price}}</span>
            <span>￥{{item.price+3}}</span>
            <span>
              <van-icon name="plus" size="14" color="#fff" style="margin:3px 0 0 2px;" @click="$router.push({path:'/shopxz',query:{index:item.index}})" />
            </span>
          </div>
        </li>
      </div>
    </ul>
    <div class="shopOrder" v-if="box.length">
      <div class="gwc">
        <div>已选商品</div>
        <div @click="gwc">清空购物车</div>
      </div>
      <div v-for="item in shoparr" :key="item.index">
        <div class="ten" v-if="item.num>0" style="position: relative;">
          <div v-if="item.name=='乖巧宝宝主题桶含爆'||item.name=='乖巧宝宝TOP杯含可'">套餐</div>
          <div v-else>单品</div>
          <div style="position: absolute; left:13%;">{{item.name}}</div>
          <div style="position: absolute; left:65%;">￥{{item.price}}</div>
          <div>
            <span>
              <van-icon name="minus" size="12" @click="goodsMinus(item.index)" />
            </span>
            <span>{{item.num}}</span>
            <span>
              <van-icon name="plus" size="12" style="margin-left: 1px;" @click="goodsPlus(item.index)" />
            </span>
          </div>
        </div>
      </div>
      <div class="over">
        <div>总价:</div>
        <div>￥{{shoptotal}}</div>
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
        <van-checkbox v-model="checked2" checked-color="#ee0a24" @click="checked2=true"></van-checkbox>
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
      <div class="fone">待支付:<span>￥{{Number(total)+shoptotal}}</span></div>
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
        <div style="padding: 10px; display: flex; justify-content: space-between;">
          <div>
            <div style="font-size: 14px; font-weight: 700;">电影票</div>
            <div style="font-size: 12px;">票价</div>
          </div>
          <div v-for="(item,index) in priceList" :key="index" style="font-size: 12px; margin-top:16px;">￥{{item.price}} * {{priceList.length}}</div>
        </div>
        <div v-if="box.length">
          <div style="font-size: 14px; font-weight: 700; padding-left:10px">商品</div>
          <div v-for="item in shoparr" :key="item.index">
            <div v-if="item.num>0" style="display: flex; justify-content: space-between; font-size:12px; padding:0 10px 10px 10px; position: relative;">
              <div>{{item.name}}</div>
              <div style="position: absolute; left:65%;">x{{item.num}}</div>
              <div>￥{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <van-dialog v-model="tel" title="修改手机号" @confirm="conname">
      <div style="width: 250px; height: 42px; border: 1px solid #aaa;border-radius: 20px;line-height: 42px;margin: 0 auto;font-size: 13px;"><input type="text" placeholder="请输入账号" autocomplete="off" v-model="username" @touchstart.stop="show3=true" style=" width: 180px; margin-left:10px; letter-spacing: 1px;border: #fff;height: 30px;"></div>
    </van-dialog>
    <!-- <van-number-keyboard :show="show3" extra-key="" @blur="show3 = false" v-model="username" :maxlength="11" z-index="2022" style="padding-bottom:0;" /> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Vue from 'vue';
import { CountDown, ActionSheet, Switch, Popover } from 'vant';
Vue.use(ActionSheet).use(CountDown).use(Switch).use(Popover)
export default {
  data() {
    return {
      checked: false,
      checked2: true,
      popover: false,
      kg: false,
      show: true,
      tel: false,
      username: '',
      // show3: false,
      model: false,
      msg: "1.开映2小时之前场次且未取票的订单,可在个人订单页面申请退票;\n2.开映30分钟之前,2小时之内的场次且未取票的订单,需扣除朋友等级权益中“退票权益”的有效次数方可进行退票;\n各等级朋友退票权益有效次数为:\n- 初心朋友: 不支持;\n- 动心朋友: 1次/年;\n- 知心朋友、衷心朋友: 1次/月;\n3.如需退票的订单中使用优惠券或代金券支付,退票后券将立即返回至原账户,且有效期不变;若券在返还时已过期,则无法继续使用,且不做额外补发;\n4.30分钟内即将开映的场次、已开映的场次、已取票的订单,不支持退票;\n5.同笔订单中包含影票及卖品时,仅支持全单取消,不支持订单部分取消;卖品兑换有效期至影片观影后1天,过期无法兑换;\n6.单独购买的卖品,兑换有效期为购买当日起14天内,过期及已打印兑换凭证的不能退换(请参考凭证提示);\n7.上述退票规则仅适用于CGV影城官方APP及微信小程序。",
      time: 15 * 60 * 1000,
      nameList: '',
      name: '',
      y: '',
      r: '',
      times: '',
      priceList: '',
      total: '',
      img: '',
      biute: '',
      type: '',
      logname: '',
      actions: [
        { text: '请认真阅读退票规则,以便给您带来不必要的麻烦' },
      ],
      active: 0,
    }
  },
  created() {
    this.$store.dispatch('getGoodsList')
  },
  activated() {
    this.nameList = localStorage.getItem('nameList')
    this.name = localStorage.getItem('name')
    this.y = localStorage.getItem('y')
    this.r = localStorage.getItem('r')
    this.times = localStorage.getItem('times')
    this.priceList = JSON.parse(localStorage.getItem('priceList'))
    this.total = localStorage.getItem('total')
    this.img = localStorage.getItem('img')
    this.biute = localStorage.getItem('biute')
    this.type = localStorage.getItem('type')
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.logname = userInfo.username
    this.time = 15 * 60 * 1000
  },
  watch: {
    show: {
      handler() {
        if (this.show == false) {
          this.popover = true
          setTimeout(v => {
            this.popover = false
          }, 2000)
          return
        }
      }
    }
  },
  computed: {
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
    // shop() {
    //   return [
    //     {
    //       index: 0,
    //       active: 0,
    //       img: 'img/gbb.png',
    //       name: '乖巧宝宝主题桶含爆',
    //       price: 42
    //     },
    //     {
    //       index: 1,
    //       active: 0,
    //       img: 'img/gbb2.png',
    //       name: '乖巧宝宝TOP杯含可',
    //       price: 42
    //     }
    //   ]
    // },
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
    box() {
      return this.shoparr.filter(v => v.num > 0)
    }
  },
  methods: {
    ...mapMutations(['goodsPlus', 'goodsMinus']),
    finish() {
      this.$dialog.alert({
        title: '温馨提示',
        message: '订单超时取消,请重新下单。',
        confirmButtonText: '重新下单'
      }).then(() => {
        this.$router.back()
      })
    },
    click() {
      this.$router.back()
      this.time = 0
      setTimeout(v => {
        this.$dialog.alert({
          title: '温馨提示',
          message: '订单已取消,请重新选座。',
          confirmButtonText: '重新选座'
        })
      }, 200)
    },
    show1() {
      this.$dialog.alert({
        title: '退票须知',
        message: '1.开映2小时之前场次且未取票的订单,可在个人订单页面申请退票;\n2.开映30分钟之前,2小时之内的场次且未取票的订单,需扣除朋友等级权益中“退票权益”的有效次数方可进行退票;\n各等级朋友退票权益有效次数为:\n- 初心朋友: 不支持;\n- 动心朋友: 1次/年;\n- 知心朋友、衷心朋友: 1次/月;\n3.如需退票的订单中使用优惠券或代金券支付,退票后券将立即返回至原账户,且有效期不变;若券在返还时已过期,则无法继续使用,且不做额外补发;\n4.30分钟内即将开映的场次、已开映的场次、已取票的订单,不支持退票;\n5.同笔订单中包含影票及卖品时,仅支持全单取消,不支持订单部分取消;卖品兑换有效期至影片观影后1天,过期无法兑换;\n6.单独购买的卖品,兑换有效期为购买当日起14天内,过期及已打印兑换凭证的不能退换(请参考凭证提示);\n7.上述退票规则仅适用于CGV影城官方APP及微信小程序。',
        messageAlign: 'left'
      })
    },
    pay() {
      if (!this.checked) {
        this.show = true
        return
      }
      this.$dialog.confirm({
        title: '请确认您购买的影城',
        message: this.nameList + 'CGV影城'
      }).then(() => {
        this.$toast('不让您破费了')
      }).catch(() => {

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
    gwc() {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '购物车清空后无法恢复,确认清空购物车吗?'
      }).then(() => {
        this.shoparr.forEach(v => v.num = 0)
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss">
.order {
  .van-dialog {
    top: 50%;
  }
  .van-dialog__header {
    padding: 10px 0;
  }
  .box {
    padding: 40px 10px 5px;
    display: flex;
    border-bottom: 2px solid #f6f6f6;
    .right {
      margin-left: 10px;
      h5 {
        margin: 0 0 5px 0;
      }
      div {
        margin-bottom: 5px;
        span {
          color: #aaa;
          font-size: 12px;
          margin-right: 5px;
        }
      }
      .price {
        display: flex;
        flex-wrap: wrap;
        div {
          width: 120px;
        }
      }
    }
  }
  .priceRight {
    line-height: 38px;
    font-size: 12px;
    padding: 0 10px;
    text-align: right;
    border-bottom: 2px solid #f6f6f6;
    span {
      color: #fc5869;
    }
  }
  .checked2 {
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
  .xj {
    padding: 0 10px;
    border-bottom: 2px solid #f6f6f6;
    .xjone {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .xjtwo {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      div:nth-of-type(1) {
        color: #aaa;
      }
      div:nth-of-type(2) {
        color: #fc5869;
      }
    }
  }
  .vip {
    padding: 0 10px;
    margin: 10px 0;
    border-bottom: 2px solid #f6f6f6;
    line-height: 28px;
    background-color: #db281f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .viptwo {
      margin-right: 80px;
      color: #fff;
      font-size: 12px;
    }
    .vipthr {
      span {
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .sp {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    line-height: 38px;
    div {
      font-size: 13px;
      color: #333;
    }
  }
  .shop {
    border-bottom: 8px solid #f6f6f6;
    display: flex;
    li {
      margin: 10px;
      padding-bottom: 10px;
      border: 1px solid #aaa;
      img {
        width: 100px;
        height: 100px;
      }
      div:nth-of-type(2) {
        font-size: 10px;
      }
      div:nth-of-type(3) {
        margin-top: 5px;
        font-size: 12px;
        span:nth-of-type(1) {
          color: #fc5869;
          margin-left: 5px;
        }
        span:nth-of-type(2) {
          font-size: 10px;
          margin-left: 5px;
          text-decoration: line-through;
          color: #ccc;
        }
        span:nth-of-type(3) {
          display: inline-block;
          width: 18px;
          height: 18px;
          background-color: #db281f;
          border-radius: 50%;
          margin-left: 20px;
        }
      }
    }
  }
  .gwc {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
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
    div:nth-of-type(2) {
      margin-right: 100px;
      font-size: 12px;
    }
    div:nth-of-type(3) {
      font-size: 13px;
    }
    div:nth-of-type(4) {
      text-align: center;
      line-height: 18px;
      span {
        display: inline-block;
      }
      span:nth-of-type(1) {
        width: 18px;
        height: 18px;
        border: 1px solid #db281f;
        border-radius: 50%;
        color: #db281f;
        margin-right: 10px;
      }
      span:nth-of-type(2) {
        color: #db281f;
      }
      span:nth-of-type(3) {
        width: 20px;
        height: 20px;
        background-color: #db281f;
        border-radius: 50%;
        color: #fff;
        margin-left: 10px;
      }
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
  .van-dialogs {
    padding-bottom: 30px;
  }
  .checkbox {
    width: 280px;
    height: 38px;
    background-color: #fff;
    position: fixed;
    top: 530px;
    left: 50px;
    z-index: 2222;
    font-size: 12px;
  }
  .btn {
    position: fixed;
    top: 570px;
    left: 28px;
    z-index: 2222;
    button {
      border: #fff;
      width: 160px;
      height: 38px;
      font-size: 14px;
    }
    .btnLeft {
      background-color: #f6f6f6;
      border-radius: 0 0 0 16px;
    }
    .btnRight {
      background-color: #ffc8ce;
      border-radius: 0 0 16px 0;
      color: #fff;
    }
  }
}
</style>