<template>
  <div class="home">
    <van-nav-bar title="CGV影城" fixed placeholder />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in getBanner" :key="item._id">
        <van-image width="100%" height="120" :src="item.img" />
      </van-swipe-item>
    </van-swipe>
    <nav>
      <div class="left" @click="$router.push('/city')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dingwei" />
        </svg>
        <span>{{nameList}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiajiantou" />
        </svg>
      </div>
      <div class="right">
        <van-tabs v-model="active" @click="change">
          <van-tab title="在售"></van-tab>
          <van-tab title="即映"></van-tab>
        </van-tabs>
      </div>
    </nav>
    <div status="loader">
      <div class="films-list">
        <div class="films-item" v-for="item in getList" :key="item._id" @click="$router.push({path:'/films',query:{filmsId:item._id=='627b17b1e107d40001a8bfcc'?'6277fdf910ec0f000115fd83':item._id, status:item.status}})">
          <div class="films-item-img"> <img :src="item.img" alt=""></div>
          <div class="films-item-content">
            <div class="title">{{item.name}}</div>
            <div class="formats" :class="item.formats.length==1?'lengthOne':''">
              <div class="label" v-for="(item2,index) in item.formats" :key="index">{{item2|formats(0)}}<span>{{item2|formats(1)}}</span></div>
            </div>
            <div class="score" :class="item.formats.length==1?'lengthTwo':''">{{item.score}}分</div>
            <div class="desc">{{item.stage}}</div>
          </div>
          <div class="films-item-btn">
            <van-button v-if="item.status==1" round color="#DB281F" class="btn" @click.stop="$router.push({path:'/atlis',query:{filmsId:item._id,status:item.status}})">购票</van-button>
            <van-button v-if="item.status==2" round color="#fc5869" class="btn" @click.stop="$router.push({path:'/atlis',query:{filmsId:'6277fdf910ec0f000115fd83', status:item.status}})">预售</van-button>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center;">
      <van-loading type="spinner" color="#DB281F" v-if="status=='loading'" />
    </div>
    <van-empty image="search" description="暂无店铺" v-if="status=='empty'" />
    <van-tabbar placeholder route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item icon="home-o" to="/home">电影</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to="/mall">商城</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/wode">MY CGV</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue';
import { Loading, Empty } from 'vant'

Vue.use(Empty).use(Loading)
import mixin from '@/common/mixin'
export default {
  mixins: [mixin],
  filters: {
    formats(val, key) {
      return val.split('-')[key]
    }
  },
  data() {
    return {
      getBanner: [],
      nameList: '加载中...',
      idList: '',
      getList: [],
      status: 'loading',
      active: 0,
    }
  },
  created() {
    this.banner()
  },
  async activated() {
    let { nameList, idList } = localStorage
    if (idList) {
      this.nameList = nameList
      this.idList = idList
      this.filmList()
    } else {
      let cityName = await this.city()

      if (cityName === '全国' || !cityName) {
        this.$toast('定位失败,请手动选择')
        setTimeout(v => {
          this.$router.push('/city')
        }, 1500)
        return
      }

      let { data: { code, msg, rows } } = await this.shopList(cityName)
      if (code !== 0) {
        this.$toast(msg);
        return
      }

      if (rows.length === 0) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: `定位城市${cityName}没有店铺,是否手动选择`,
        })
          .then(() => {
            this.$router.push('/city')
          })
          .catch(() => {
            this.status = 'empty'
          });
        return
      }
      nameList = rows[0].name
      idList = rows[0]._id

      this.$dialog.confirm({
        title: '温馨提示',
        message: `当前定位为${cityName},是否切换为【${nameList}】影院`,
      })
        .then(() => {
          localStorage.setItem('nameList', nameList)
          localStorage.setItem('idList', idList)
          localStorage.setItem('infoList', JSON.stringify(rows[0]))
          this.nameList = nameList
          this.idList = idList
          this.filmList()
        })
        .catch(() => {
          this.$router.push('/city')
        });
    }
  },
  methods: {
    banner() {
      this.axios({
        url: '/banner/pub/getList',
        method: 'GET'
      }).then(res => {
        console.log(res);
        this.getBanner = res.data.rows
      })
    },
    filmList() {
      let { idList, active } = this
      let status = 1
      if (active == 1) {
        status = 2
      }
      this.axios({
        url: '/films/pub/getList',
        method: 'GET',
        params: {
          shopId: idList,
          status
        }
      }).then(res => {
        console.log(res);
        this.getList = res.data.rows
        this.status = this.getList.length ? 'loader' : 'empty'
      })
    },
    shopList(city) {
      return this.axios({
        url: '/shop/pub/getList',
        method: 'GET',
        params: {
          city
        }
      })
    },
    change() {
      this.filmList()
    }
  }
}
</script>

<style lang="scss">
.home {
  .lengthOne {
    margin-top: 25px;
  }
  .lengthTwo {
    margin-top: 20px;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 30px;
    .left {
      .icon {
        color: #646566;
      }
      span {
        font-size: 14px;
        margin: 0 8px;
        color: #646566;
      }
    }
    .right {
      span {
        margin: 0 10px;
      }
    }
  }
  .films-list {
    padding-left: 10px;
    padding-top: 10px;
    .films-item {
      display: flex;
      border-bottom: 1px solid #eee;
      padding: 5px 5px 5px 0;
      img {
        width: 80px;
        height: 120px;
      }
      &-content {
        padding: 0 8px;
        width: 200px;
        .score,
        .desc {
          color: #999;
          font-size: 12px;
        }
        .desc {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .title {
          font-size: 14px;
        }
        .formats {
          display: flex;
          flex-wrap: wrap;
          .label {
            background: rgba(147, 145, 170, 1);
            border-radius: 2px;
            padding: 2px;
            margin: 2px 2px;
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
      &-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        .btn {
          border-radius: 20px;
        }
        .else {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>




