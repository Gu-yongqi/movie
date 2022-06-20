<template>
  <div class="mall">
    <van-nav-bar title="CGV影城" fixed placeholder />
    <div class="nav">
      <div @click="$router.push('/city')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dingwei" />
        </svg>
        <span>{{nameList}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiajiantou" />
        </svg>
      </div>
      <div>
        <van-tabs :ellipsis="false" v-model="model" sticky>
          <van-tab title="朋友卡">
          </van-tab>
          <van-tab title="商品">
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <van-tree-select height="auto" :items="itemss" :main-active-index.sync="actives" v-if="model==0" style="margin-top:50px;">
      <template #content>
        <ul v-if="actives===0" class="one">
          <li v-for="item in arrs" :key="item.index" @click="$router.push({path:'/pykxq',query:{k:item.k,img2:item.img2,img3:item.img3,title:item.title,content:item.content,name:item.name,price:item.price}})">
            <div>
              <img :src="item.img1" alt="">
            </div>
            <div>{{item.name}}</div>
            <div>{{item.text}}</div>
            <div>
              <span>￥{{item.price}}</span>
              <span>￥{{item.price2}}</span>
              <span :class="item.price==1000?'mr':''">查看详情</span>
            </div>
          </li>
        </ul>
        <ul v-if="actives===1" class="two">
          <li v-for="item in obj" :key="item.index" @click="$router.push({path:'/pykxq',query:{k:item.k,img2:item.img2,img3:item.img3,title:item.title,content:item.content,name:item.name,price:item.price}})">
            <div>
              <img :src="item.img1" alt="">
            </div>
            <div>{{item.name}}</div>
            <div v-if="item.price>100">-2021年11月起,每自然月每人限购1张,不支持续卡;</div>
            <div v-if="item.price>100">-赠24张29.9元IMAX厅优惠券,每月可使用2张;</div>
            <div v-if="item.price>100">-全国限量3000张,售完即止;</div>
            <div v-else>{{item.text}}</div>
            <div class="span">
              <span>￥{{item.price}}</span>
              <span>￥{{item.price2}}</span>
              <span>查看详情</span>
            </div>
          </li>
        </ul>
      </template>
    </van-tree-select>
    <div class="shopmall" v-if="model==1">
      <van-nav-bar title="热销商品" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
      <div class="title" v-for="item in title" :key="item.index">
        <div><img src="img/left.png" alt="" v-if="item.index==active"></div>
        <div v-if="item.index==active">{{item.title}}</div>
        <div><img src="img/right.png" alt="" v-if="item.index==active"></div>
      </div>
      <van-tree-select :items="items" :main-active-index.sync="active" height="auto">
        <template #content>
          <span style="position: fixed; left:16px; top:95px; color:#aaa; font-size:12px;" @click="$router.push('/gkxz')">顾客须知</span>
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
      <van-submit-bar :price="total*100" button-text="选好了" button-color="#db281f" @submit="$router.push('/orders')" v-if="total>0" style="margin-bottom:50px;" />
    </div>
    <van-tabbar placeholder route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item icon="home-o" to="/home">电影</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to="/mall">商城</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/wode">MY CGV</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      nameList: '',
      model: 0,
      actives: 0,
      itemss: [{ text: '储值卡' }, { text: '权益卡' }],
      arrs: [
        {
          index: 0,
          k: '储存卡',
          img1: 'img/0.png',
          img2: 'img/01.png',
          img3: 'img/000.jpg',
          price: 200,
          price2: 258,
          name: '储值卡200元',
          text: '储值金额190元,开卡手续费:10元/卡,年费:10元/年/卡;',
          title: '-卡内储值金额及折扣永久有效,全国自有渠道(APP或小程序)及线下门店通用;</br>-线上持卡消费可享1.1倍积分,具体消费积分累计及使用规则详见《CGV影城积分规则》;</br>-持有效卡可享19.9元起特惠购票活动;</br>-余额不足可用其他方式组合支付并享持卡折扣;',
          content: '[开卡手续费]10元/卡(部分明示免年费的营销活动除外);在同一卡内续充值时不再收取开卡手续费。</br>[年费]10元/年/卡,开卡/续卡之日起至当年12月31日免收年费,次年起消费满3次免年费。</br>[优惠政策]影票限购6张/天/卡,卖品套餐限购3套/天/卡,超出限购数量是,需以正价购。</br>[补充说明]如遇发行方或院线规定的影片最低票价超过持卡优惠价时,须按影片最低票价付款。</br>[购票方式]选择座位-[确认选座]后点击[朋友卡优惠]-选择该卡-确认支付。'
        },
        {
          index: 1,
          k: '储存卡',
          img1: 'img/0.png',
          img2: 'img/02.png',
          img3: 'img/000.jpg',
          price: 300,
          price2: 498,
          name: '储值卡300元',
          text: '储值金额290元,开卡手续费:10元/卡,年费:10元/年/卡;',
          title: '-卡内储值金额及折扣永久有效,全国自有渠道(APP或小程序)及线下门店通用;</br>-线上持卡消费可享1.1倍积分,具体消费积分累计及使用规则详见《CGV影城积分规则》;</br>-持有效卡可享19.9元起特惠购票活动;</br>-余额不足可用其他方式组合支付并享持卡折扣;',
          content: '[开卡手续费]10元/卡(部分明示免年费的营销活动除外);在同一卡内续充值时不再收取开卡手续费。</br>[年费]10元/年/卡,开卡/续卡之日起至当年12月31日免收年费,次年起消费满3次免年费。</br>[优惠政策]影票限购6张/天/卡,卖品套餐限购3套/天/卡,超出限购数量是,需以正价购。</br>[补充说明]如遇发行方或院线规定的影片最低票价超过持卡优惠价时,须按影片最低票价付款。</br>[购票方式]选择座位-[确认选座]后点击[朋友卡优惠]-选择该卡-确认支付。</br>[观影优惠券]19.9元购买普通厅影票或39.9元购买特效厅影票1张( GOLD CLASS厅除外),仅限线上使用,有效期自到账之日起6个月,具体券使用规则及说明可在[我的]-[票券]-[优惠券]中查看。'
        },
        {
          index: 2,
          k: '储存卡',
          img1: 'img/0.png',
          img2: 'img/03.png',
          img3: 'img/000.jpg',
          price: 500,
          price2: 798,
          name: '储值卡500元',
          text: '储值金额490元,开卡手续费:10元/卡,年费:10元/年/卡;',
          title: '-卡内储值金额及折扣永久有效,全国自有渠道(APP或小程序)及线下门店通用;</br>-线上持卡消费可享1.1倍积分,具体消费积分累计及使用规则详见《CGV影城积分规则》;</br>-持有效卡可享19.9元起特惠购票活动;</br>-余额不足可用其他方式组合支付并享持卡折扣;',
          content: '[开卡手续费]10元/卡(部分明示免年费的营销活动除外);在同一卡内续充值时不再收取开卡手续费。</br>[年费]10元/年/卡,开卡/续卡之日起至当年12月31日免收年费,次年起消费满3次免年费。</br>[优惠政策]影票限购6张/天/卡,卖品套餐限购3套/天/卡,超出限购数量是,需以正价购。</br>[补充说明]如遇发行方或院线规定的影片最低票价超过持卡优惠价时,须按影片最低票价付款。</br>[购票方式]选择座位-[确认选座]后点击[朋友卡优惠]-选择该卡-确认支付。</br>[观影优惠券]19.9元购买普通厅影票或39.9元购买特效厅影票1张( GOLD CLASS厅除外),仅限线上使用,有效期自到账之日起6个月,具体券使用规则及说明可在[我的]-[票券]-[优惠券]中查看。'
        },
        {
          index: 3,
          k: '储存卡',
          img1: 'img/0.png',
          img2: 'img/04.png',
          img3: 'img/000.jpg',
          price: 1000,
          price2: 1398,
          name: '储值卡1000元',
          text: '储值金额990元,开卡手续费:10元/卡,年费:10元/年/卡;',
          title: '-卡内储值金额及折扣永久有效,全国自有渠道(APP或小程序)及线下门店通用;</br>-线上持卡消费可享1.1倍积分,具体消费积分累计及使用规则详见《CGV影城积分规则》;</br>-持有效卡可享19.9元起特惠购票活动;</br>-余额不足可用其他方式组合支付并享持卡折扣;',
          content: '[开卡手续费]10元/卡(部分明示免年费的营销活动除外);在同一卡内续充值时不再收取开卡手续费。</br>[年费]10元/年/卡,开卡/续卡之日起至当年12月31日免收年费,次年起消费满3次免年费。</br>[优惠政策]影票限购6张/天/卡,卖品套餐限购3套/天/卡,超出限购数量是,需以正价购。</br>[补充说明]如遇发行方或院线规定的影片最低票价超过持卡优惠价时,须按影片最低票价付款。</br>[购票方式]选择座位-[确认选座]后点击[朋友卡优惠]-选择该卡-确认支付。</br>[观影优惠券]19.9元购买普通厅影票或39.9元购买特效厅影票1张( GOLD CLASS厅除外),仅限线上使用,有效期自到账之日起6个月,具体券使用规则及说明可在[我的]-[票券]-[优惠券]中查看。'
        }
      ],
      obj: [
        {
          index: 0,
          k: 'E优卡',
          img1: 'img/1.png',
          img2: 'img/11.png',
          img3: 'img/111.jpg',
          price: 168,
          price2: 588,
          name: 'E优卡(IMAX限定年卡)',
          title: '-购买E优卡(IMAX限定年卡)可得24张29.9元IMAX厅观影券</br>-在该卡有效期内可享IMAX、4DX等特效厅和普通厅全场购票优惠价格</br>-在该卡有效期内可享购卡礼、积分礼、生日礼等尊贵礼遇,具体请见轰动详情页',
          content: '-本卡为电子权益卡,每自然月每人限购1张,卡费为权益费,购票时仍需要额外支付票款,本卡(包含观影券)一经使用恕不退换</br>-本卡有效期12个月,到期自动失效;购买新卡时,有效期为开卡之日起12个月,本卡不支持续卡</br>-购卡成功后,将绑定至购卡账户,可在[我的]-[朋友卡]中查看</br>-如何购票:选择座位-[确认座位]后点击[朋友卡优惠]-选择该卡-确认支付</br>-如遇发行方或院线规定的影片最低票价超过持卡优惠价时,须按影片最低票价付款</br>-每张卡1天限购6张优惠票,超出限购优惠数量的,需以正价购买(持卡可享受的特惠活动,购票价格及限购数量以该活动详情为准)</br>-本卡可在CGV影城官方APP、微信小程序及CGV影城现场使用</br>-仅在影城现场使用时需要您输入密码,默认密码是购卡手机号后6位,如需修改密码请至影城现场进行变更</br>-生日礼赠券需在本人生日前30天完善个人信息,以电子券形式于生日前五天到账,有效期7天,观影券仅限兑换普通厅'
        },
        {
          index: 1,
          k: 'E优卡',
          img1: 'img/2.png',
          img2: 'img/22.png',
          img3: 'img/222.jpg',
          price: 29.9,
          price2: 59,
          text: '仅售29.9元,开卡即赠2张5元立减券',
          name: 'E优卡(半年卡)',
          title: '-本卡支持全国通用(广州K11除外),持卡可享IMAX、4DX、杜比影院等特效厅和普通厅全场购票优惠价格</br>-在该卡有效期内可享购卡礼、积分礼、生日礼等尊贵礼遇,具体请见轰动详情页',
          content: '-本卡为电子权益卡,卡费为权益费,购票时仍需要额外支付票款,本卡(包含观影券)一经使用恕不退换</br>-本卡有效期6个月,到期自动失效;购买新卡时,有效期为开卡之日起6个月;您亦可在购卡时选择一张未过期的同一类别朋友卡进行续卡,有效期在原卡有效期上递延6个月</br>-购卡成功后,将绑定至购卡账户,可在[我的]-[朋友卡]中查看</br>-如何购票:选择座位-[确认座位]后点击[朋友卡优惠]-选择该卡-确认支付</br>-如遇发行方或院线规定的影片最低票价超过持卡优惠价时,须按影片最低票价付款</br>-每张卡1天限购6张优惠票,超出限购优惠数量的,需以正价购买(持卡可享受的特惠活动,购票价格及限购数量以该活动详情为准)</br>-本卡可在CGV影城官方APP、微信小程序及CGV影城现场使用</br>-仅在影城现场使用时需要您输入密码,默认密码是购卡手机号后6位,如需修改密码请至影城现场进行变更'
        },
        {
          index: 2,
          k: 'E优卡',
          img1: 'img/3.png',
          img2: 'img/33.png',
          img3: 'img/333.jpg',
          price: 49.9,
          price2: 99,
          text: '仅售49.9元,开卡即赠2张10元立减券',
          name: 'E优卡(一年卡)',
          title: '-本卡支持全国通用(广州K11除外),持卡可享IMAX、4DX、杜比影院等特效厅和普通厅全场购票优惠价格</br>-在该卡有效期内可享购卡礼、积分礼、生日礼等尊贵礼遇,具体请见轰动详情页',
          content: '-本卡为电子权益卡,卡费为权益费,购票时仍需要额外支付票款,本卡(包含观影券)一经使用恕不退换</br>-本卡有效期12个月,到期自动失效;购买新卡时,有效期为开卡之日起12个月;您亦可在购卡时选择一张未过期的同一类别朋友卡进行续卡,有效期在原卡有效期上递延12个月</br>-购卡成功后,将绑定至购卡账户,可在[我的]-[朋友卡]中查看</br>-如何购票:选择座位-[确认座位]后点击[朋友卡优惠]-选择该卡-确认支付</br>-如遇发行方或院线规定的影片最低票价超过持卡优惠价时,须按影片最低票价付款</br>-每张卡1天限购6张优惠票,超出限购优惠数量的,需以正价购买(持卡可享受的特惠活动,购票价格及限购数量以该活动详情为准)</br>-本卡可在CGV影城官方APP、微信小程序及CGV影城现场使用</br>-仅在影城现场使用时需要您输入密码,默认密码是购卡手机号后6位,如需修改密码请至影城现场进行变更'
        },
        {
          index: 3,
          k: 'E优卡',
          img1: 'img/4.png',
          img2: 'img/44.png',
          img3: 'img/444.jpg',
          price: 19.9,
          price2: 40,
          text: '仅售19.9元,开卡即赠1张5元立减券',
          name: 'E优卡(季度卡)',
          title: '-本卡支持全国通用(广州K11除外),持卡可享IMAX、4DX、杜比影院等特效厅和普通厅全场购票优惠价格</br>-在该卡有效期内可享购卡礼、积分礼、生日礼等尊贵礼遇,具体请见轰动详情页',
          content: '-本卡为电子权益卡,卡费为权益费,购票时仍需要额外支付票款,本卡(包含观影券)一经使用恕不退换</br>-本卡有效期3个月,到期自动失效;购买新卡时,有效期为开卡之日起3个月;您亦可在购卡时选择一张未过期的同一类别朋友卡进行续卡,有效期在原卡有效期上递延3个月</br>-购卡成功后,将绑定至购卡账户,可在[我的]-[朋友卡]中查看</br>-如何购票:选择座位-[确认座位]后点击[朋友卡优惠]-选择该卡-确认支付</br>-如遇发行方或院线规定的影片最低票价超过持卡优惠价时,须按影片最低票价付款</br>-每张卡1天限购6张优惠票,超出限购优惠数量的,需以正价购买(持卡可享受的特惠活动,购票价格及限购数量以该活动详情为准)</br>-本卡可在CGV影城官方APP、微信小程序及CGV影城现场使用</br>-仅在影城现场使用时需要您输入密码,默认密码是购卡手机号后6位,如需修改密码请至影城现场进行变更'
        }
      ],
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
  activated() {
    this.nameList = localStorage.getItem('nameList')
    this.$store.dispatch('getGoodsList')
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
  methods: {
    ...mapMutations(['goodsPlus', 'goodsMinus'])
  }
}
</script>

<style lang="scss">
.mall {
  .nav {
    position: fixed;
    z-index: 99;
    background-color: #fff;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    div:nth-of-type(1) {
      .icon {
        color: #646566;
      }
      span {
        margin: 0 5px;
        font-size: 14px;
        color: #646566;
      }
    }
  }
  .one {
    li {
      margin-bottom: 20px;
      padding-right: 20px;
      border-bottom: 2px solid #f6f6f6;
      img {
        width: 100%;
      }
      div:nth-of-type(2) {
        margin: 0 0 5px 5px;
      }
      div:nth-of-type(3) {
        margin: 0 0 5px 5px;
        font-size: 10px;
        color: #aaa;
      }
      div:nth-of-type(4) {
        margin: 0 0 10px 5px;
        color: #aaa;
        span:nth-of-type(1) {
          font-size: 14px;
        }
        span:nth-of-type(2) {
          font-size: 13px;
          text-decoration: line-through;
          margin-left: 20px;
        }
        span:nth-of-type(3) {
          display: inline-block;
          font-size: 12px;
          text-align: center;
          width: 80px;
          line-height: 24px;
          border: 1px solid #aaa;
          border-radius: 18px;
          margin-left: 90px;
        }
        .mr {
          margin-left: 80px !important;
        }
      }
    }
  }
  .two {
    li {
      margin-bottom: 20px;
      padding-right: 20px;
      border-bottom: 2px solid #f6f6f6;
      img {
        width: 100%;
      }
      div:nth-of-type(2) {
        margin: 0 0 5px 5px;
      }
      div:nth-of-type(3),
      div:nth-of-type(4),
      div:nth-of-type(5) {
        margin: 0 0 5px 5px;
        font-size: 10px;
        color: #aaa;
      }
      .span {
        margin: 0 0 10px 5px !important;
        color: #aaa;
        span:nth-of-type(1) {
          font-size: 14px;
        }
        span:nth-of-type(2) {
          font-size: 13px;
          text-decoration: line-through;
          margin-left: 20px;
        }
        span:nth-of-type(3) {
          display: inline-block;
          font-size: 12px;
          text-align: center;
          width: 80px;
          line-height: 24px;
          border: 1px solid #aaa;
          border-radius: 18px;
          margin-left: 90px;
        }
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
  .shopmall {
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
}
</style>

