<template>
  <div class="pay">
    <van-nav-bar title="支付确认" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="one">
      <div>当前影城</div>
      <div>{{nameList}}</div>
    </div>
    <div class="two">
      <div>已选商品</div>
      <div>{{name}}</div>
    </div>
    <div class="thr">
      <div>价格</div>
      <div>￥{{price}}</div>
    </div>
    <div class="for">支付方式</div>
    <div class="fiv">
      <svg class="icon" aria-hidden="true" style=" font-size:28px;">
        <use xlink:href="#icon-xyk-copy"></use>
      </svg>
      <div>星意卡</div>
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
      <div>待支付:<span>￥{{price}}</span></div>
      <button @click="$toast('不让您破费了');">确认支付</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      nameList: '',
      name: '',
      price: ''
    }
  },
  created() {
    this.nameList = localStorage.getItem('nameList')
    this.name = this.$route.query.name
    this.price = this.$route.query.price
  }
}
</script>

<style lang="scss">
.pay {
  .one {
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
  .two {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 14px;
    border-bottom: 2px solid #e9e9e9;
    div:nth-of-type(2) {
      font-size: 12px;
      font-weight: 700;
      color: #444;
    }
  }
  .thr {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 14px;
    border-bottom: 8px solid #e9e9e9;
    div:nth-of-type(2) {
      font-weight: 700;
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
    font-size: 14px;
    border-bottom: 2px solid #e9e9e9;
    line-height: 38px;
    div:nth-of-type(1) {
      margin-right: 220px;
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
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    line-height: 38px;
    position: fixed;
    bottom: 0;
    z-index: 2222;
    background-color: #fff;
    div {
      font-size: 12px;
      span {
        color: #fc5869;
        font-size: 16px;
        padding-right: 10px;
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