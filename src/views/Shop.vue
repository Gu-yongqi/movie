<template>
  <div class="shop">
    <van-nav-bar title="热销商品" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="title" v-for="item in title" :key="item.index">
      <div><img src="img/left.png" alt="" v-if="item.index==active"></div>
      <div v-if="item.index==active">{{item.title}}</div>
      <div><img src="img/right.png" alt="" v-if="item.index==active"></div>
    </div>
    <van-tree-select :items="items" :main-active-index.sync="active" height="auto">
      <template #content>
        <ul>
          <div v-if="active===0" class="a">
            <li v-for="item in arr" :key="item.index">
              <div v-if="item.active==active" class="active">
                <div class="one" @click="$router.push({path:'/shopxq',query:{index:item.index}})">
                  <img :src="item.img" alt="">
                </div>
                <div class="two">
                  <div>{{item.name}}</div>
                  <div>促销价:{{item.price}}元</div>
                  <div @click="$router.push({path:'/shopxz',query:{index:item.index}})">选择套餐</div>
                </div>
              </div>
            </li>
          </div>
          <div v-else class="b">
            <li v-for="item in arr" :key="item.index">
              <div v-if="item.active==active" class="active">
                <div class="one" @click="$router.push({path:'/shopxq',query:{index:item.index}})">
                  <img :src="item.img" alt="">
                </div>
                <div class="two">
                  <div>{{item.name}}</div>
                  <div>促销价:{{item.price}}元</div>
                  <div>
                    <span :style="{display:item.num<=0?'none':'inline-block'}" @click="goodsMinus(item.index)">
                      <van-icon name="minus" />
                    </span>
                    <span :style="{display:item.num<=0?'none':'inline-block'}">{{item.num}}</span>
                    <span @click="goodsPlus(item.index)" :style="{marginLeft:item.num<=0?'72px':''}">
                      <van-icon name="plus" />
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </template>
    </van-tree-select>
    <van-submit-bar :price="total*100" button-text="选好了" button-color="#db281f" @submit="$router.back()" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      items: [{ text: '人气热销' }, { text: '爆米花类' }, { text: '现调饮料' }, { text: '瓶装饮料' }, { text: '热销零食' }],
      title: [
        {
          index: 0,
          title: '甄选爆品 人气TOP榜'
        },
        {
          index: 1,
          title: '观影时刻 新鲜好滋味'
        },
        {
          index: 2,
          title: '现调美味 清爽又怡神'
        },
        {
          index: 3,
          title: '随时随享 畅饮好心情'
        },
        {
          index: 4,
          title: '解馋美味 享受好食光'
        }
      ]
    }
  },
  computed: {
    total() {
      let sum = 0
      this.arr.forEach(v => {
        sum += Number(v.num * v.price)
      })
      return sum
    },
    arr() {
      return this.$store.state.goodsList
    }
  },
  created() {
    this.$store.dispatch('getGoodsList')
  },
  methods: {
    ...mapMutations(['goodsPlus', 'goodsMinus'])
  }
}
</script>

<style lang="scss">
.shop {
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 16px;
    div:nth-of-type(1) {
      margin-left: 80px;
      img {
        margin-top: 4px;
      }
    }
    div:nth-of-type(2) {
      color: #db281f;
      font-size: 14px;
    }
  }
  ul {
    .a {
      li {
        .active {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 120px;
          border-bottom: 1px solid #f1f1f1;
          padding: 0 10px;
          .one {
            img {
              width: 80px;
            }
          }
          .two {
            div:nth-of-type(1) {
              font-size: 13px;
              text-align: right;
            }
            div:nth-of-type(2) {
              color: #db281f;
              font-size: 13px;
              margin: 5px 0;
              text-align: right;
            }
            div:nth-of-type(3) {
              background-color: #db281f;
              color: #fff;
              text-align: center;
              border-radius: 18px;
              width: 80px;
              line-height: 24px;
              font-size: 12px;
              margin-left: 80px;
            }
          }
        }
      }
    }
    .b {
      li {
        .active {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 120px;
          border-bottom: 1px solid #f1f1f1;
          padding: 0 10px;
          .one {
            img {
              width: 80px;
            }
          }
          .two {
            div:nth-of-type(1) {
              font-size: 13px;
              text-align: right;
            }
            div:nth-of-type(2) {
              color: #db281f;
              font-size: 13px;
              margin: 5px 0;
              text-align: right;
            }
            div:nth-of-type(3) {
              text-align: center;
              line-height: 24px;
              span {
                display: inline-block;
                margin-left: 12px;
              }
              span:nth-of-type(1) {
                width: 24px;
                height: 24px;
                border: 1px solid #db281f;
                border-radius: 50%;
                color: #db281f;
              }
              span:nth-of-type(3) {
                width: 24px;
                height: 24px;
                background-color: #db281f;
                border-radius: 50%;
                color: #fff;
              }
            }
          }
        }
      }
      li:last-of-type {
        margin-bottom: 80px;
      }
    }
  }
  .van-tree-select__nav {
    flex: 1;
    position: fixed;
  }
  .van-tree-select__content {
    flex: 3.5;
    margin-left: 80px;
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