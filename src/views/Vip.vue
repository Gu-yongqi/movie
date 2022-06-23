<template>
  <div class="vip">
    <van-nav-bar title="等级特权" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="box">
      <div class="one" @click="dj">等级规则</div>
      <div class="two">
        <div class="left">
          <div>Hi,{{nickname}}</div>
          <img :src="$root.userInfo.avatar||'img/ftx.png'" alt="" @click="$router.push('/info')">
          <span>初心朋友</span>
          <div @click="$router.push('/info')">
            <svg class="icon" aria-hidden="true" style=" font-size:20px;">
              <use xlink:href="#icon-bianxie-copy"></use>
            </svg>
          </div>
          <div>1亲密值就可以成为动心朋友,要加油呦~</div>
        </div>
        <div class="right">
          <div>亲密值</div>
          <div>0</div>
        </div>
      </div>
    </div>
    <div class="thr">
      <van-icon name="gem" />
      <span>等级特权</span>
    </div>
    <van-tabs v-model="active" color="#fff">
      <van-tab :title-class="active==0?'cl1':''">
        <template #title>
          <van-icon name="like-o" />初心
        </template>
        <ul>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianying1"></use>
              </svg>
            </div>
            <div>购票礼遇</div>
            <div>优惠价观影</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shangpin1"></use>
              </svg>
            </div>
            <div>卖品礼遇</div>
            <div>套餐低至85折</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuowei1"></use>
              </svg>
            </div>
            <div>黄金座位</div>
            <div>优先选择最佳观影座位</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jifen1"></use>
              </svg>
            </div>
            <div>积分礼遇</div>
            <div>积分奖励和积分兑换</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shengji1"></use>
              </svg>
            </div>
            <div>升级礼遇</div>
            <div>注册送5积分</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouye1"></use>
              </svg>
            </div>
            <div>退票权益</div>
            <div>提前2小时免费退票</div>
          </li>
        </ul>
      </van-tab>
      <van-tab :title-class="active==1?'cl2':''">
        <template #title>
          <van-icon name="like-o" />动心
        </template>
        <ul>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianying2"></use>
              </svg>
            </div>
            <div>购票礼遇</div>
            <div>优惠价观影</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shangpin2"></use>
              </svg>
            </div>
            <div>卖品礼遇</div>
            <div>套餐低至85折</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuowei2"></use>
              </svg>
            </div>
            <div>黄金座位</div>
            <div>优先选择最佳观影座位</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jifen2"></use>
              </svg>
            </div>
            <div>积分礼遇</div>
            <div>积分奖励和积分兑换</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shengji2"></use>
              </svg>
            </div>
            <div>升级礼遇</div>
            <div>升级可得20积分</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shengri2"></use>
              </svg>
            </div>
            <div>生日礼遇</div>
            <div>免费爆米花</div>
            <div>免费续杯券</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouye2"></use>
              </svg>
            </div>
            <div>退票权益</div>
            <div>映前30分钟免费退票</div>
          </li>
        </ul>
      </van-tab>
      <van-tab :title-class="active==2?'cl3':''">
        <template #title>
          <van-icon name="like-o" />知心
        </template>
        <ul>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianying3"></use>
              </svg>
            </div>
            <div>购票礼遇</div>
            <div>优惠价观影</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shangpin3"></use>
              </svg>
            </div>
            <div>卖品礼遇</div>
            <div>套餐低至8折</div>
            <div>Paconnie系列单品95折</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuowei3"></use>
              </svg>
            </div>
            <div>黄金座位</div>
            <div>优先选择最佳观影座位</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jifen3"></use>
              </svg>
            </div>
            <div>积分礼遇</div>
            <div>1.1倍普通消费积分</div>
            <div>1.2倍特效厅消费积分</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shengji3"></use>
              </svg>
            </div>
            <div>升级礼遇</div>
            <div>升级可得50积分</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shengri3"></use>
              </svg>
            </div>
            <div>生日礼遇</div>
            <div>9元观影券</div>
            <div>免费爆米花</div>
            <div>免费续杯券</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouye3"></use>
              </svg>
            </div>
            <div>退票权益</div>
            <div>映前30分钟免费退票</div>
          </li>
        </ul>
      </van-tab>
      <van-tab :title-class="active==3?'cl4':''">
        <template #title>
          <van-icon name="like-o" />衷心
        </template>
        <ul>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianying4"></use>
              </svg>
            </div>
            <div>购票礼遇</div>
            <div>优惠价观影</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shangpin4"></use>
              </svg>
            </div>
            <div>卖品礼遇</div>
            <div>套餐低至8折</div>
            <div>Paconnie系列单品95折</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuowei4"></use>
              </svg>
            </div>
            <div>黄金座位</div>
            <div>优先选择最佳观影座位</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jifen4"></use>
              </svg>
            </div>
            <div>积分礼遇</div>
            <div>1.2倍普通消费积分</div>
            <div>1.4倍特效厅消费积分</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shengji4"></use>
              </svg>
            </div>
            <div>升级礼遇</div>
            <div>升级可得50积分</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shengri4"></use>
              </svg>
            </div>
            <div>生日礼遇</div>
            <div>9元观影券</div>
            <div>免费爆米花</div>
            <div>免费续杯券</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liwu4"></use>
              </svg>
            </div>
            <div>年度礼遇</div>
            <div>免费通用观影券</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouye4"></use>
              </svg>
            </div>
            <div>退票权益</div>
            <div>映前30分钟免费退票</div>
          </li>
          <li>
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-baomihua4"></use>
              </svg>
            </div>
            <div>免费爆米花</div>
            <div>全年免费爆米花</div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
    <div class="for">以上政策有效期至2022年12月31日;优惠券/观影券均为电子券,到账后可在[我的票券]中查看</div>
    <div class="fiv">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huojian"></use>
      </svg>
      <span>亲密值升级任务</span>
    </div>
    <div class="six">
      <div class="left">
        <div>购买影票</div>
        <div>按付款金额的20%累加亲密值</div>
      </div>
      <div class="right">
        <div @click="$router.push('/home')">去完成</div>
      </div>
    </div>
    <div class="six">
      <div class="left">
        <div>购买商品</div>
        <div>按付款金额的20%累加亲密值</div>
      </div>
      <div class="right">
        <div @click="$router.push('/mall')">去完成</div>
      </div>
    </div>
    <div class="six">
      <div class="left">
        <div>办理朋友卡</div>
        <div>按各朋友卡政策累加亲密值</div>
      </div>
      <div class="right">
        <div @click="$router.push('/mall')">去完成</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
      avatar: '',
      active: 0,
    }
  },
  created() {
    let { nickname, avatar } = JSON.parse(localStorage.getItem('userInfo'))
    this.nickname = nickname
    this.avatar = avatar
  },
  methods: {
    dj() {
      this.$dialog.alert({
        title: '等级规则',
        messageAlign: 'left',
        message: 'CGV影城把会员命名为Paconnie的朋友,我们将根据您的活跃程度回馈您多重权益。朋友等级越高,权益越丰富。\n朋友等级判定基准\n1.初心朋友(1级):成功注册即可;\n2.动心朋友(2级):0<亲密值<80>;\n3.知心朋友(3级):80≤亲密值<240;\n4.衷心朋友(4级):240≤亲密值。\n亲密值累计规则\n1.成功购买影票或卖品时,以订单内实际支付金额的20%累计亲密值。(即消费100元可累计20亲密值)。\n2.以下情形不累计亲密值:\n3.亲密值将在订单完成后(观影结束或卖品交易完成后)次日到账;如订单被取消,则该订单对应的亲密值也将被取消;\n4.亲密值以自然年为单位进行累计,当年累计的亲密值均于次年1月1日清零,并重新累计;\n5.亲密值获取上限:单日获取上限为100,,且单日最多12张电影票可获取亲密值(按下单顺序排序的前12张电影票);\n6.通过活动获取亲密值,其有效期等规则以活动告知为准。\n朋友等级有效期\n1.初心朋友(1级)的等级终身有效;\n2.动心朋友(2级或以上级别朋友等级有效期,至升级后的次年12月31日);\n3.每年1月1日,讲根据前一自然年内累计的亲密值重新判定当年的朋友等级,若前一年累计的亲密值达到原有等级标准,则原有等级将被延续至当年12月31日;若未达到原有等级所需亲密值,则将被自动降级至相应等级。'
      })
    }
  }
}
</script>

<style lang="scss">
.vip {
  .cl1 {
    color: #8dd3f4;
  }
  .cl2 {
    color: #fdd015;
  }
  .cl3 {
    color: #ed8eba;
  }
  .cl4 {
    color: #db363e;
  }
  .box {
    position: relative;
    background-color: #f6f6f6;
    height: 210px;
    box-shadow: 0px 0px 20px #8dd3f4 inset;
    .one {
      position: absolute;
      top: 3%;
      right: 3%;
      font-size: 13px;
    }
    .two {
      position: absolute;
      top: 40px;
      left: 3%;
      background-color: #8dd3f4;
      width: 94%;
      height: 150px;
      border-radius: 18px;
      display: flex;
      justify-content: space-between;
      .left {
        div:nth-of-type(1) {
          color: #fff;
          font-size: 24px;
          margin: 10px 0 10px 30px;
        }
        img {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          vertical-align: top;
          margin-left: 30px;
        }
        span {
          color: #fff;
          font-size: 14px;
        }
        div:nth-of-type(2) {
          position: absolute;
          left: 80px;
          bottom: 30px;
          width: 20px;
          height: 20px;
          background-color: #fff;
          border-radius: 50%;
        }
        div:nth-of-type(3) {
          position: absolute;
          bottom: 15px;
          left: 95px;
          font-size: 10px;
          color: saddlebrown;
        }
      }
      .right {
        margin: 45px 25px 0 0;
        text-align: center;
        div:nth-of-type(1) {
          font-size: 12px;
        }
        div:nth-of-type(2) {
          font-size: 42px;
        }
      }
    }
  }
  .thr {
    line-height: 50px;
    color: #f1a23e;
    background-color: #f6f6f6;
    text-align: center;
    span {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .van-tabs {
    border-bottom: 2px solid #f6f6f6;
    ul {
      display: flex;
      justify-content: center;
      text-align: center;
      flex-wrap: wrap;
      margin-bottom: 20px;
      border-top: 2px solid #f6f6f6;
      li {
        width: 33vw;
        margin-top: 30px;
        .icon {
          width: 38px;
          height: 38px;
        }
        div:nth-of-type(2) {
          margin-top: 10px;
          font-size: 12px;
          font-weight: 700;
        }
        div:nth-of-type(3),
        div:nth-of-type(4),
        div:nth-of-type(5) {
          margin-top: 5px;
          font-size: 10px;
          color: #aaa;
        }
      }
    }
  }
  .for {
    padding: 0 10px;
    height: 45px;
    line-height: 18px;
    font-size: 10px;
    color: #aaa;
    padding-top: 10px;
  }
  .fiv {
    line-height: 50px;
    color: #f1a23e;
    background-color: #f6f6f6;
    text-align: center;
    span {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .six {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 50px;
    border-bottom: 2px solid #f6f6f6;
    .left {
      div:nth-of-type(1) {
        font-size: 14px;
      }
      div:nth-of-type(2) {
        margin-top: 5px;
        font-size: 10px;
        color: #aaa;
      }
    }
    .right {
      div {
        width: 60px;
        line-height: 28px;
        text-align: center;
        background-color: #fc5869;
        border-radius: 18px;
        font-size: 13px;
        color: #fff;
      }
    }
  }
}
</style>