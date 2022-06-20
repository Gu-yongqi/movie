<template>
  <div class="atlis">
    <van-nav-bar title="影院" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="atlisBox" @click="$router.push('/about')">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dingwei" />
        </svg>
        <div style="font-size:12px;">地图</div>
      </div>
      <div class="center"></div>
      <div class="right">
        <div>{{infoList.name}}</div>
        <div style="margin-right:40px;">{{infoList.address}}</div>
        <div>
          {{infoList.tel}}
          <van-icon name="phone" />
        </div>
        <van-icon name="arrow" class="you" />
      </div>
    </div>
    <div style="text-align: center; margin-top:20px;">
      <van-loading type="spinner" color="#DB281F" v-if="status=='loading'" />
    </div>
    <div status="loader">
      <div class="banSwp">
        <div class="bgc" :style="{backgroundImage:'url('+backgroundImage+')'}"></div>
        <swiper ref="mySwiper" :options="swiperOptions" @slideChange="onSlideChange">
          <swiper-slide v-for="item in bannerList" :key="item._id">
            <img :src="item.img" alt="">
          </swiper-slide>
        </swiper>
        <div class="triangle"></div>
      </div>
      <div class="atlTitle">{{name}}</div>
      <div class="atlTime"><span>{{duration}}</span><span>|</span><span>{{type}}</span></div>
      <ul class="atlisUl">
        <li v-for="(item,index) in arr" :key="index" @click="click(index)" :class='{active:flag==index}'>
          <div class="title">{{item.title}}</div>
          <van-button type="danger" size="mini" round>{{item.time}}</van-button>
        </li>
      </ul>
      <div class="oneTime" v-if="flag==0">
        <van-empty image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="暂无场次" v-if="oneTime.length==0" />
        <footer v-for="(item,index) in oneTime" :key="index">
          <div class="one">
            <div>{{item.time}}</div>
            <div>{{oneTimes[index]}}散场</div>
          </div>
          <div class="two">
            <div>{{item.type}}</div>
            <div>{{item.biute}}</div>
          </div>
          <div class="thr">
            <div>
              <span>￥{{item.price+52}}</span>
              <span>￥{{item.price}}起</span>
            </div>
            <div>
              <span>朋友卡</span>
              <span>￥{{item.price-2}}起</span>
            </div>
          </div>
          <van-button round block type="info" @click="$router.push({path:'/movie',query:{img:backgroundImage,name,r:arr[flag].time,y:arr[flag].y,index,time:item.time,items:JSON.stringify(oneTime),filmsId}})">购票</van-button>
        </footer>
      </div>
      <div class="twoTime" v-if="flag==1||flag==2||flag==3||flag==4">
        <footer v-for="(item,index) in twoTime" :key="index">
          <div class="one">
            <div>{{item.time}}</div>
            <div>{{twoTimes[index]}}散场</div>
          </div>
          <div class="two">
            <div>{{item.type}}</div>
            <div>{{item.biute}}</div>
          </div>
          <div class="thr">
            <div>
              <span>￥{{item.price+52}}</span>
              <span>￥{{item.price}}起</span>
            </div>
            <div>
              <span>朋友卡</span>
              <span>￥{{item.price-2}}起</span>
            </div>
          </div>
          <van-button round block type="info" @click="$router.push({path:'/movie',query:{img:backgroundImage,name,r:arr[flag].time,y:arr[flag].y,index,time:item.time,items:JSON.stringify(twoTime),filmsId}})">购票</van-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        activeIndex: 0,
        slideToClickedSlide: true
      },
      bannerList: [],
      filmsId: '',
      idList: '',
      status: 'loading',
      flag: 0,
      n: null,
      y: null,
      r: null,
      s: null,
      f: null,
      dOne: null,
      dTwo: null,
    }
  },
  created() {
    let date = new Date();
    this.n = date.getFullYear();
    this.y = date.getMonth() + 1
    this.r = date.getDate();
    this.s = date.getHours();
    this.f = date.getMinutes();
    this.dOne = date.getDay();
    this.dTwo = date.getDay();
    let time = new Date(this.n, this.y, 0).getDate()
    if (this.y == 12) {
      if (time - 3 == this.arr[0].time) {
        this.arr[4].n = this.arr[4].n + 1
        this.arr[4].y = 1
        this.arr[4].time = 1
        return
      }
      if (time - 2 == this.arr[0].time) {
        this.arr[3].n = this.arr[3].n + 1
        this.arr[4].n = this.arr[4].n + 1
        this.arr[3].y = 1
        this.arr[4].y = 2
        this.arr[3].time = 1
        this.arr[4].time = 2
        return
      }
      if (time - 1 == this.arr[0].time) {
        this.arr[2].n = this.arr[2].n + 1
        this.arr[3].n = this.arr[3].n + 1
        this.arr[4].n = this.arr[4].n + 1
        this.arr[2].y = 1
        this.arr[3].y = 2
        this.arr[4].y = 3
        this.arr[2].time = 1
        this.arr[3].time = 2
        this.arr[4].time = 3
        return
      }
      if (time == this.arr[0].time) {
        this.arr[1].n = this.arr[1].n + 1
        this.arr[2].n = this.arr[2].n + 1
        this.arr[3].n = this.arr[3].n + 1
        this.arr[4].n = this.arr[4].n + 1
        this.arr[1].y = 1
        this.arr[2].y = 2
        this.arr[3].y = 3
        this.arr[4].y = 4
        this.arr[1].time = 1
        this.arr[2].time = 2
        this.arr[3].time = 3
        this.arr[4].time = 4
        return
      }
    } else {
      if (time - 3 == this.arr[0].time) {
        this.arr[4].y = this.arr[4].y + 1
        this.arr[4].time = 1
        return
      }
      if (time - 2 == this.arr[0].time) {
        this.arr[3].y = this.arr[3].y + 1
        this.arr[4].y = this.arr[4].y + 1
        this.arr[3].time = 1
        this.arr[4].time = 2
        return
      }
      if (time - 1 == this.arr[0].time) {
        this.arr[2].y = this.arr[2].y + 1
        this.arr[3].y = this.arr[3].y + 1
        this.arr[4].y = this.arr[4].y + 1
        this.arr[2].time = 1
        this.arr[3].time = 2
        this.arr[4].time = 3
        return
      }
      if (time == this.arr[0].time) {
        this.arr[1].y = this.arr[1].y + 1
        this.arr[2].y = this.arr[2].y + 1
        this.arr[3].y = this.arr[3].y + 1
        this.arr[4].y = this.arr[4].y + 1
        this.arr[1].time = 1
        this.arr[2].time = 2
        this.arr[3].time = 3
        this.arr[4].time = 4
        return
      }
    }
  },
  mounted() {
    this.filmsId = this.$route.query.filmsId
    this.idList = localStorage.getItem("idList")
    this.fimlsList()
    if (this.$route.query.status == 2) {
      this.$dialog.alert({
        title: '温馨提示',
        message: '抱歉，当前影城没有该影片排片',
      }).then(() => {
        this.status = 'loading'
        this.fimlsList()
      });
    }
  },
  computed: {
    infoList() {
      return JSON.parse(localStorage.infoList)
    },
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    backgroundImage() {
      return this.bannerList[this.swiperOptions.activeIndex]?.img
    },
    name() {
      return this.bannerList[this.swiperOptions.activeIndex]?.name
    },
    duration() {
      return this.bannerList[this.swiperOptions.activeIndex]?.duration
    },
    type() {
      return this.bannerList[this.swiperOptions.activeIndex]?.type
    },
    arr() {
      return [
        {
          title: '今天',
          n: this.n,
          y: this.y,
          time: this.r
        },
        {
          title: '明天',
          n: this.n,
          y: this.y,
          time: this.r + 1
        },
        {
          title: '后天',
          n: this.n,
          y: this.y,
          time: this.r + 2
        },
        {
          title: this.thr,
          n: this.n,
          y: this.y,
          time: this.r + 3
        },
        {
          title: this.for,
          n: this.n,
          y: this.y,
          time: this.r + 4
        }
      ]
    },
    oneTime() {
      return this.twoTime.filter(v => {
        return this.s < v.time.split(':')[0] - 0 || this.s == v.time.split(':')[0] && this.f < v.time.split(':')[1]
      })
    },
    oneTimes() {
      return this.oneTime.map(v => {
        let s = Number(v.time.split(':')[0])
        let f = Number(v.time.split(':')[1])
        let xs = parseInt(this.bannerList[this.swiperOptions.activeIndex]?.duration.split('分钟')[0] / 60)
        let fz = parseInt(this.bannerList[this.swiperOptions.activeIndex]?.duration.split('分钟')[0] % 60)
        xs = s + xs
        fz = f + fz
        if (xs == 24) {
          xs = 0 + '0'
        }
        if (fz == 0) {
          fz = 0 + '0'
        }
        return xs + ':' + fz
      })
    },
    twoTime() {
      return [{
        time: '12:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      },
      {
        time: '13:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      },
      {
        time: '14:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      },
      {
        time: '15:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      },
      {
        time: '16:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      },
      {
        time: '17:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      },
      {
        time: '18:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      },
      {
        time: '19:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      },
      {
        time: '20:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      },
      {
        time: '21:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      },
      {
        time: '22:00',
        type: '国语/3D/普通',
        biute: '激光2厅',
        price: 38
      }]
    },
    twoTimes() {
      return this.twoTime.map(v => {
        let s = Number(v.time.split(':')[0])
        let f = Number(v.time.split(':')[1])
        let xs = parseInt(this.bannerList[this.swiperOptions.activeIndex]?.duration.split('分钟')[0] / 60)
        let fz = parseInt(this.bannerList[this.swiperOptions.activeIndex]?.duration.split('分钟')[0] % 60)
        xs = s + xs
        fz = f + fz
        if (xs == 24) {
          xs = 0 + '0'
        }
        if (fz == 0) {
          fz = 0 + '0'
        }
        return xs + ':' + fz
      })
    },
    thr() {
      if (this.dOne + 3 >= 7) {
        this.dOne = this.dOne + 3 - 7
        if (this.dOne == 0) {
          return this.dOne = '周日'
        } else if (this.dOne == 1) {
          return this.dOne = '周一'
        } else if (this.dOne == 2) {
          return this.dOne = '周二'
        } else if (this.dOne == 3) {
          return this.dOne = '周三'
        } else if (this.dOne == 4) {
          return this.dOne = '周四'
        } else if (this.dOne == 5) {
          return this.dOne = '周五'
        } else if (this.dOne == 6) {
          return this.dOne = '周六'
        }
      } else {
        this.dOne = this.dOne + 3
        if (this.dOne == 0) {
          return this.dOne = '周日'
        } else if (this.dOne == 1) {
          return this.dOne = '周一'
        } else if (this.dOne == 2) {
          return this.dOne = '周二'
        } else if (this.dOne == 3) {
          return this.dOne = '周三'
        } else if (this.dOne == 4) {
          return this.dOne = '周四'
        } else if (this.dOne == 5) {
          return this.dOne = '周五'
        } else if (this.dOne == 6) {
          return this.dOne = '周六'
        }
      }
    },
    for() {
      if (this.dTwo + 4 >= 7) {
        this.dTwo = this.dTwo + 4 - 7
        if (this.dTwo == 0) {
          return this.dTwo = '周日'
        } else if (this.dTwo == 1) {
          return this.dTwo = '周一'
        } else if (this.dTwo == 2) {
          return this.dTwo = '周二'
        } else if (this.dTwo == 3) {
          return this.dTwo = '周三'
        } else if (this.dTwo == 4) {
          return this.dTwo = '周四'
        } else if (this.dTwo == 5) {
          return this.dTwo = '周五'
        } else if (this.dTwo == 6) {
          return this.dTwo = '周六'
        }
      } else {
        this.dTwo = this.dTwo + 4
        if (this.dTwo == 0) {
          return this.dTwo = '周日'
        } else if (this.dTwo == 1) {
          return this.dTwo = '周一'
        } else if (this.dTwo == 2) {
          return this.dTwo = '周二'
        } else if (this.dTwo == 3) {
          return this.dTwo = '周三'
        } else if (this.dTwo == 4) {
          return this.dTwo = '周四'
        } else if (this.dTwo == 5) {
          return this.dTwo = '周五'
        } else if (this.dTwo == 6) {
          return this.dTwo = '周六'
        }
      }
    }
  },
  methods: {
    fimlsList() {
      let { filmsId, idList } = this
      this.axios({
        url: '/films/pub/getList',
        method: 'GET',
        params: {
          shopId: idList
        }
      }).then(res => {
        console.log(res);
        this.bannerList = res.data.rows
        let index = this.bannerList.findIndex(v => v._id == filmsId)
        this.swiper.slideTo(index, 1000, false);
        this.swiperOptions.activeIndex = index
        this.status = this.bannerList.length ? 'loader' : ''
      })
    },
    onSlideChange() {
      this.swiperOptions.activeIndex = this.swiper.activeIndex;
      this.filmsId = this.bannerList[this.swiperOptions.activeIndex]._id
    },
    click(i) {
      this.flag = i
    },
  }
}
</script>

<style lang="scss">
.atlis {
  .atlisBox {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
    margin-top: 10px;
    .left {
      flex: 1;
      text-align: center;
      .icon {
        height: 16px;
        margin-bottom: 5px;
      }
    }
    .center {
      border-left: 1px solid #ccc;
      height: 45px;
      padding-left: 20px;
    }
    .right {
      font-size: 12px;
      flex: 5;
      line-height: 20px;
      position: relative;
      div:nth-of-type(1) {
        color: #000;
      }
      .you {
        position: absolute;
        top: 20px;
        right: 10px;
        font-size: 24px;
      }
    }
  }
  .banSwp {
    width: 100%;
    height: 180px;
    position: relative;
    overflow: hidden;
    .bgc {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: 100% auto;
      background-position: center 10px;
      background-repeat: no-repeat;
      backdrop-filter: blur(10px);
      filter: blur(100px);
      transition: all 1s;
    }
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      position: relative;
      img {
        width: 100%;
        height: 160px;
      }
      text-align: center;
      font-size: 18px;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      transition: 300ms;
      transform: scale(0.8);
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(0.9);
    }
    .triangle {
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -10px;
      width: 0px;
      height: 0px;
      border: 10px solid #fff;
      border-left-color: transparent;
      border-right-color: transparent;
      border-top-color: transparent;
    }
  }
  .atlTitle,
  .atlTime {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  .atlTime {
    position: relative;
    font-size: 12px;
    color: #aaa;
    height: 20px;
    span {
      position: absolute;
      top: 0;
    }
    span:nth-of-type(1) {
      left: 128px;
    }
    span:nth-of-type(2) {
      left: 186px;
    }
    span:nth-of-type(3) {
      left: 200px;
    }
  }
  .atlisUl {
    margin-top: 20px;
    display: flex;
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    li {
      margin: 0 20px;
      font-size: 14px;
      button {
        width: 20px;
        height: 20px;
        color: #ababab;
        border: #fff;
        background-color: #eee;
      }
    }
    .active {
      .title {
        color: #fc5869;
      }
      button {
        background-color: #fc5869;
        color: #fff;
      }
    }
  }
  footer {
    display: flex;
    align-items: center;
    line-height: 24px;
    margin: 10px 20px 0 20px;
    padding-bottom: 10px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    .one {
      div:nth-of-type(1) {
        font-weight: 700;
      }
      div:nth-of-type(2) {
        font-size: 12px;
        color: #aaa;
      }
    }
    .two {
      margin-left: 16px;
      div:nth-of-type(1) {
        font-size: 14px;
      }
      div:nth-of-type(2) {
        font-size: 12px;
        color: #aaa;
      }
    }
    .thr {
      margin-left: 20px;
      div:nth-of-type(1) {
        span:nth-of-type(1) {
          font-size: 12px;
          color: #ccc;
          text-decoration: line-through;
          margin-right: 2px;
        }
        span:nth-of-type(2) {
          font-size: 14px;
          color: #fc5869;
        }
      }
      div:nth-of-type(2) {
        border: 1px solid #f1a23d;
        width: 87px;
        height: 22px;
        border-radius: 8px;
        position: relative;
        span:nth-of-type(1) {
          position: absolute;
          top: -1px;
          left: 0;
          display: inline-block;
          font-size: 12px;
          color: #fff;
          background-color: #f1a23d;
          border-radius: 8px 0 0 8px;
        }
        span:nth-of-type(2) {
          position: absolute;
          top: -1px;
          text-align: center;
          display: inline-block;
          color: #f1a23d;
          font-size: 12px;
        }
      }
    }
    .van-button {
      width: 54px;
      height: 30px;
      font-size: 12px;
      margin-left: 18px;
      background-color: #fc5869;
      border: #fc5869;
    }
  }
}
</style>
