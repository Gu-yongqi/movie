<template>
  <div class="city">
    <van-nav-bar title="城市选择" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell title="定位城市" />
      <van-button type="default" @click="$router.push({path:'/list',query:{city:cityName}})">{{cityName}}</van-button>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="热门城市" />
      <van-button type="default" @click="$router.push({path:'/list',query:{city:'上海'}})">上海</van-button>
      <van-button type="default" @click="$router.push({path:'/list',query:{city:'北京'}})">北京</van-button>
      <van-button type="default" @click="$router.push({path:'/list',query:{city:'深圳'}})">深圳</van-button>
      <van-button type="default" @click="$router.push({path:'/list',query:{city:'成都'}})">成都</van-button>
      <van-button type="default" @click="$router.push({path:'/list',query:{city:'武汉'}})">武汉</van-button>
      <van-button type="default" @click="$router.push({path:'/list',query:{city:'南京'}})">南京</van-button>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="所有城市" />
      <van-index-bar :index-list="indexList" :sticky-offset-top="50">
        <div v-for="(item,index) in list" :key="index">
          <van-index-anchor :index="index" />
          <van-button type="default" v-for="item2 in item" :key="item2._id" @click="$router.push({path:'/list',query:{city:item2.city}})">{{item2.city}}</van-button>
        </div>
      </van-index-bar>
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue';
import { IndexBar, IndexAnchor } from 'vant';

Vue.use(IndexBar);
Vue.use(IndexAnchor);
import mixin from '@/common/mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      cityName: '定位中',
      indexList: [],
      list: []
    }
  },
  async created() {
    let cityName = await this.city()
    this.cityName = cityName
    this.getList()
  },
  methods: {
    getList() {
      this.axios({
        url: '/city/pub/getList',
        method: 'GET',
        params: {
          group: 1
        }
      }).then(res => {
        console.log(res);
        this.list = res.data.rows
        this.indexList = Object.keys(this.list)
      })
    }
  },
}
</script>

<style lang="scss">
.city button {
  margin: 10px;
}
.van-index-anchor {
  margin-top: -3px;
}
</style>