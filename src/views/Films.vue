<template>
  <div class="films">
    <van-nav-bar title="电影介绍" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="box">
      <div class="bgc" :style="{backgroundImage:`url(${filmsList.img})`}"></div>
      <div class="one">
        <img :src="filmsList.img" alt="">
      </div>
      <div class="two">
        <div class="title">{{filmsList.name}}</div>
        <div class="time">{{filmsList.duration}}</div>
        <div class="cay">{{filmsList.type}}</div>
      </div>
      <div class="thr">
        <div>
          <van-rate v-model="filmsList.score" allow-half void-icon="star" void-color="#eee" />
        </div>
        <div class="formats" :class="filmsList.formats.length==1?'length':''" v-for="(item,index) in filmsList.formats" :key="index">
          <div class="label">{{item|formats(0)}}<span>{{item|formats(1)}}</span></div>
        </div>
        <div class="time">{{filmsList.startTime}}</div>
      </div>
    </div>
    <div class="navOne">
      <van-cell title="影片剧情照" :border="false" is-link :value="filmsLength" @click="Images(0)" />
      <svg class="icon shuxianOne" aria-hidden="true">
        <use xlink:href="#icon-shouye_shugang_shijiantixing" />
      </svg>
      <div class="img"><img :src="item" alt="" v-for="(item,index) in filmsList.stageImgs" :key="index" @click="Images(index)"></div>
      <div class="border" style="border-bottom:1px solid #eee; width:355px; margin-top:10px;"></div>
    </div>
    <div class="navTwo">
      <van-cell title="剧情介绍" :border="false" />
      <svg class="icon shuxianTwo" aria-hidden="true">
        <use xlink:href="#icon-shouye_shugang_shijiantixing" />
      </svg>
      <div class="div">
        <span>导演：</span>
        <span>{{filmsList.director}}</span>
      </div>
      <div class="div">
        <span>主演：</span>
        <span>{{filmsList.star}}</span>
      </div>
      <div class="div">
        <span>剧情：</span>
        <span>{{filmsList.stage}}</span>
      </div>
    </div>
    <button class="btns" @click="$router.push({path:'/atlis',query:{filmsId:$route.query.filmsId,status:$route.query.status}})">购票</button>
  </div>
</template>

<script>
import Vue from 'vue';
import { Rate, ImagePreview } from 'vant';
Vue.use(Rate).use(ImagePreview)
export default {
  filters: {
    formats(val, key) {
      return val.split('-')[key]
    }
  },
  data() {
    return {
      filmsList: [],
      filmsLength: 0
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      let { filmsId } = this.$route.query
      this.axios({
        url: '/films/pub/getDetail',
        method: 'GET',
        params: {
          filmsId
        }
      }).then(res => {
        console.log(res);
        this.filmsList = res.data.rows[0]
        this.filmsList.score = this.filmsList.score / 2
        this.filmsLength = this.filmsList.stageImgs.length
      })
    },
    Images(index) {
      let images = this.filmsList.stageImgs
      ImagePreview({
        images,
        startPosition: index,
      });
    }
  }
}
</script>

<style lang="scss">
.films {
  .length {
    margin-top: 20px;
  }
  .box {
    height: 170px;
    position: relative;
    padding-top: 16px;
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
      backdrop-filter: blur(20px);
      filter: blur(30px);
    }
    .one {
      width: 110px;
      margin: 0 15px;
      float: left;
      position: relative;
      z-index: 99;
      img {
        width: 110px;
        height: 170px;
      }
    }
    .two {
      width: 230px;
      height: 100px;
      line-height: 24px;
      overflow: hidden;
      position: relative;
      z-index: 98;
      color: #fff;
      div:nth-of-type(2),
      div:nth-of-type(3) {
        font-size: 12px;
      }
    }
    .thr {
      width: 100%;
      height: 100px;
      background-color: #fff;
      border-radius: 8px 8px 0 0;
      position: relative;
      bottom: 28px;
      left: 0;
      z-index: 97;
      div:nth-of-type(1) {
        .van-rate__item {
          height: 0;
        }
      }
      .time {
        position: absolute;
        bottom: 0;
        left: 140px;
        font-size: 12px;
      }
      .formats {
        .label {
          background: rgba(147, 145, 170, 1);
          border-radius: 2px;
          padding: 2px;
          margin: 2px 2px;
          float: left;
          display: flex;
          overflow: hidden;
          color: #fff;
          font-size: 12px;
          span {
            color: rgba(147, 145, 170, 1);
            background: #fff;
            padding: 0 2px;
            border-radius: 2px;
          }
        }
      }
    }
  }
  .navOne {
    position: relative;
    padding-left: 10px;
    .img {
      width: 100%;
      display: flex;
      overflow: scroll;
      img {
        margin-right: 10px;
        width: 320px;
        height: 180px;
      }
    }
    .shuxianOne {
      position: absolute;
      top: 14px;
      left: 8px;
    }
  }
  .navTwo {
    position: relative;
    padding-left: 10px;
    margin-bottom: 50px;
    .van-cell {
      padding-bottom: 0;
    }
    .shuxianTwo {
      position: absolute;
      top: 14px;
      left: 8px;
    }
    .div {
      margin: 10px 0 0 8px;
      font-size: 14px;
      span:nth-of-type(2) {
        font-size: 12px;
      }
    }
  }
  .btns {
    width: 100vw;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    background-color: #db281f;
    border: #fff;
    color: #fff;
    border-radius: 5px;
    position: fixed;
    bottom: 0;
  }
}
</style>