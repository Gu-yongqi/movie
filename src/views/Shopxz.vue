<template>
  <div class="shopxz">
    <van-nav-bar title="选择商品" fixed placeholder z-index="999" left-arrow :border="false" @click-left="$router.back() " />
    <div class="one">请选择更换的商品</div>
    <div class="two">
      <svg class="icon" aria-hidden="true" style=" font-size:28px;">
        <use xlink:href="#icon-shouye_shugang_shijiantixing"></use>
      </svg>
      <div>不可换选(1)</div>
    </div>
    <div class="thr">
      <div>
        <img src="img/false.png" alt="">
      </div>
      <div>{{goods.name}}}</div>
    </div>
    <div class="two">
      <svg class="icon" aria-hidden="true" style=" font-size:28px;">
        <use xlink:href="#icon-shouye_shugang_shijiantixing"></use>
      </svg>
      <div>可换选(1)</div>
    </div>
    <div class="for">
      <div v-if="index==0">
        <img src="img/true1.png" alt="">
      </div>
      <div v-else>
        <img src="img/true2.png" alt="">
      </div>
      <div v-if="index==0">附加中桶爆米花</div>
      <div v-else>附加中杯可乐</div>
      <div @click="show=true">换一换</div>
    </div>
    <van-dialog v-model="show">
      <div style="text-align:center; margin:10px 0;">
        <img src="img/false.png" alt="">
      </div>
    </van-dialog>
    <van-submit-bar :price="42*100" button-text="加入购物车" button-color="#db281f" @submit="submit" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      index: 0,
      show: false
    }
  },
  created() {
    this.index = this.$route.query.index
  },
  computed: {
    goods() {
      return this.$store.state.goodsList.find(v => v.index == this.index) || {}
    }
  },
  methods: {
    ...mapMutations(['goodsPlus']),
    submit() {
      this.goodsPlus(this.index)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.shopxz {
  .one {
    position: fixed;
    top: 46px;
    width: 100%;
    line-height: 38px;
    background-color: #fc5869;
    padding-left: 10px;
    font-size: 12px;
    color: #fff;
  }
  .two {
    display: flex;
    align-items: center;
    margin-top: 50px;
  }
  .thr {
    border: 1px solid #f1f1f1;
    width: 120px;
    height: 140px;
    margin: 10px 0 0 12px;
    div:nth-of-type(1) {
      text-align: center;
      margin-top: 10px;
    }
    div:nth-of-type(2) {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .for {
    border: 1px solid #f1f1f1;
    width: 120px;
    height: 175px;
    margin: 10px 0 0 12px;
    div:nth-of-type(1) {
      text-align: center;
      margin-top: 10px;
    }
    div:nth-of-type(2) {
      font-size: 12px;
      margin-left: 5px;
    }
    div:nth-of-type(3) {
      text-align: center;
      border: 1px solid #db281f;
      font-size: 12px;
      color: #db281f;
      width: 60px;
      margin: 0 auto;
      margin-top: 5px;
      line-height: 24px;
      border-radius: 5px;
    }
  }
  .van-submit-bar__bar {
    height: auto;
    padding: 0;
  }
  button {
    border-radius: 0;
  }
}
</style>