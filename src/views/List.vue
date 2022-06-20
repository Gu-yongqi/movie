<template>
  <div>
    <van-nav-bar title="店铺选择" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell :title="city" />
    </van-cell-group>
    <div class="box" v-if="status=='loader'">
      <div class="list" v-for="item in List" :key="item._id" @click="closList(item)">
        <div>{{item.name}}</div>
        <div>{{item.address}}</div>
      </div>
    </div>
    <div style="text-align: center;">
      <van-loading type="spinner" color="#DB281F" v-if="status=='loading'" />
    </div>
    <van-empty image="search" description="暂无店铺" v-if="status=='empty'" />
  </div>
</template>

<script>
import Vue from 'vue';
import { Loading, Empty } from 'vant'

Vue.use(Empty).use(Loading)
export default {
  data() {
    return {
      status: 'loading',
      List: []
    }
  },
  created() {
    this.list()
  },
  computed: {
    city() {
      return this.$route.query.city
    }
  },
  methods: {
    list() {
      let { city } = this
      this.axios({
        url: '/shop/pub/getList',
        method: 'GET',
        params: {
          city
        }
      }).then(res => {
        console.log(res);
        this.List = res.data.rows
        this.status = this.List.length ? 'loader' : 'empty'
      })
    },
    closList(item) {
      let { name, _id } = item
      localStorage.setItem('nameList', name)
      localStorage.setItem('idList', _id)
      localStorage.setItem('infoList', JSON.stringify(item))
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss">
.box {
  padding: 10px;
  background: #fff;
  .list {
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
    div:nth-of-type(1) {
      font-size: 16px;
      line-height: 20px;
      margin: 3px 0;
    }
    div:nth-of-type(2) {
      color: #999;
    }
  }
}
</style>

