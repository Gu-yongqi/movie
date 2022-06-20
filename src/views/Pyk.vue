<template>
  <div class="pyk">
    <van-nav-bar title="购买朋友卡" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="box" v-for="item in arr" :key="item.index" @click="$router.push({path:'/pykxq',query:{k:item.k,img2:item.img2,img3:item.img3,title:item.title,content:item.content,name:item.name,price:item.price}})">
      <div class="one">
        <img :src="item.img1" alt="">
      </div>
      <div class="two">
        <div class="title">{{item.name}}</div>
        <div class="content" v-html="item.content"></div>
      </div>
      <div class="thr">
        <div>{{item.price}}元</div>
        <button>购买</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        {
          index: 0,
          k: 'E优卡',
          img1: 'img/1.png',
          img2: 'img/11.png',
          img3: 'img/111.jpg',
          price: 168,
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
          name: 'E优卡(季度卡)',
          title: '-本卡支持全国通用(广州K11除外),持卡可享IMAX、4DX、杜比影院等特效厅和普通厅全场购票优惠价格</br>-在该卡有效期内可享购卡礼、积分礼、生日礼等尊贵礼遇,具体请见轰动详情页',
          content: '-本卡为电子权益卡,卡费为权益费,购票时仍需要额外支付票款,本卡(包含观影券)一经使用恕不退换</br>-本卡有效期3个月,到期自动失效;购买新卡时,有效期为开卡之日起3个月;您亦可在购卡时选择一张未过期的同一类别朋友卡进行续卡,有效期在原卡有效期上递延3个月</br>-购卡成功后,将绑定至购卡账户,可在[我的]-[朋友卡]中查看</br>-如何购票:选择座位-[确认座位]后点击[朋友卡优惠]-选择该卡-确认支付</br>-如遇发行方或院线规定的影片最低票价超过持卡优惠价时,须按影片最低票价付款</br>-每张卡1天限购6张优惠票,超出限购优惠数量的,需以正价购买(持卡可享受的特惠活动,购票价格及限购数量以该活动详情为准)</br>-本卡可在CGV影城官方APP、微信小程序及CGV影城现场使用</br>-仅在影城现场使用时需要您输入密码,默认密码是购卡手机号后6位,如需修改密码请至影城现场进行变更'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.pyk {
  .box {
    padding: 10px 0;
    margin: 0 10px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #e9e9e9;
    .two {
      margin: 0 5px;
      .title {
        font-size: 14px;
        margin-bottom: 5px;
      }
      .content {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        font-size: 10px;
        color: #aaa;
        line-height: 18px;
      }
    }
    .thr {
      font-size: 12px;
      text-align: center;
      div {
        color: #db281f;
        margin-top: 20px;
      }
      button {
        border: #fff;
        background-color: #db281f;
        color: #fff;
        margin-top: 10px;
        border-radius: 15px;
        width: 48px;
        height: 30px;
      }
    }
  }
}
</style>