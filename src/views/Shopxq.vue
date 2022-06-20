<template>
  <div class="shopxq">
    <van-nav-bar title="商品详情" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="a" v-if="goods.active==0">
      <div class="one">
        <img :src="goods.img" alt="">
      </div>
      <div class="two">{{goods.name}}</div>
      <div class="thr">
        <div>
          <span>促销价:</span>
          <span>{{goods.price}}元</span>
        </div>
        <div @click="$router.push({path:'/shopxz',query:{index}})">选择套餐</div>
      </div>
    </div>
    <div class="b" v-else>
      <div class="one">
        <img :src="goods.img" alt="">
      </div>
      <div class="two">{{goods.name}}</div>
      <div class="thr">
        <div>
          <span>促销价:</span>
          <span>{{goods.price}}元</span>
        </div>
        <div>
          <span :style="{display:goods.num<=0?'none':'inline-block'}" @click="goodsMinus(index)">
            <van-icon name="minus" />
          </span>
          <span :style="{display:goods.num<=0?'none':'inline-block'}">{{goods.num}}</span>
          <span @click="goodsPlus(index)" :style="{marginLeft:goods.num<=0?'72px':''}">
            <van-icon name="plus" />
          </span>
        </div>
      </div>
    </div>
    <van-submit-bar :price="total*100" button-text="选好了" button-color="#db281f" @submit="$router.back()" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      index: 0
    }
  },
  created() {
    this.index = this.$route.query.index
  },
  computed: {
    goods() {
      return this.$store.state.goodsList.find(v => v.index == this.index) || {}
    },
    total() {
      let sum = 0
      sum = this.goods.num * this.goods.price
      return sum
    },
  },
  methods: {
    ...mapMutations(['goodsPlus', 'goodsMinus']),
  }
}
</script>

<style lang="scss">
.shopxq {
  .a {
    .one {
      text-align: center;
      margin: 20px 0 50px;
      img {
        width: 200px;
      }
    }
    .two {
      margin-left: 10px;
      font-weight: 700;
    }
    .thr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      div:nth-of-type(1) {
        margin-left: 10px;
        font-size: 13px;
        span:nth-of-type(1) {
          color: #555;
        }
        span:nth-of-type(2) {
          color: #db281f;
        }
      }
      div:nth-of-type(2) {
        background-color: #db281f;
        color: #fff;
        text-align: center;
        border-radius: 18px;
        width: 80px;
        line-height: 24px;
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }
  .b {
    .one {
      text-align: center;
      margin: 20px 0 50px;
      img {
        width: 200px;
      }
    }
    .two {
      margin-left: 10px;
      font-weight: 700;
    }
    .thr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      div:nth-of-type(1) {
        margin-left: 10px;
        font-size: 13px;
        span:nth-of-type(1) {
          color: #555;
        }
        span:nth-of-type(2) {
          color: #db281f;
        }
      }
      div:nth-of-type(2) {
        text-align: center;
        line-height: 24px;
        span {
          display: inline-block;
        }
        span:nth-of-type(1) {
          width: 24px;
          height: 24px;
          border: 1px solid #db281f;
          border-radius: 50%;
          color: #db281f;
          margin-right: 10px;
        }
        span:nth-of-type(3) {
          width: 24px;
          height: 24px;
          background-color: #db281f;
          border-radius: 50%;
          color: #fff;
          margin: 0 10px;
        }
      }
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