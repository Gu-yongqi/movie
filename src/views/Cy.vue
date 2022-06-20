<template>
  <div class="cy">
    <van-nav-bar title="常用观影人" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div @click="$router.push('/cy2')" class="one">
      <van-icon name="add-o" size="12" />
      <span>添加常用观影人</span>
    </div>
    <div v-if="flag">
      <div class="two" v-for="(item,index) in arr" :key="index" @click="delet(index)">
        <div class="a">
          <div>{{item.name}}</div>
          <div>身份证: {{item.value.replace(item.value.substring(4, 15), '***********')}}</div>
        </div>
        <div class="b">
          <van-icon name="delete-o" size="20" />
        </div>
      </div>
    </div>
    <div class="thr" v-else>
      <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" />
      <div style="text-align: center; font-size: 12px;  color: #aaa;">您还没有常用联系人哟~</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      flag: true
    }
  },
  created() {
    this.arr = JSON.parse(localStorage.getItem('arr'))
  },
  methods: {
    delet(i) {
      this.arr.splice(i, 1)
      localStorage.removeItem('arr')
      this.flag = false
    }
  }
}
</script>

<style lang="scss">
.cy {
  .one {
    margin: 20px 10px 10px;
    text-align: center;
    line-height: 38px;
    border: 1px solid #ccc;
    span {
      font-size: 12px;
    }
  }
  .van-empty__image {
    margin: 50px 0 0;
  }
  .two {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    border: 1px solid #ccc;
    margin: 10px;
    .a {
      font-size: 12px;
      padding-left: 10px;
    }
    .b {
      padding-right: 10px;
    }
  }
}
</style>