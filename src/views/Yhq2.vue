<template>
  <div class="yhq2">
    <van-nav-bar title="添加优惠券" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-field label="请输入券码" placeholder="请输入优惠券编号" :value="val" @focus="show=true" @blur="show=false" />
    </van-cell-group>
    <div style="font-size:12px; color:#aaa; margin:10px;">添加后的优惠券,可在付款时使用,也可在“我的--票券”中查看。</div>
    <button @click="$toast('请输入正确的券号');">确定</button>
    <!-- <van-number-keyboard :show="show" v-model="val" extra-key="" @blur="show=false" style="padding-bottom:0;" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // show: false,
      val: ''
    }
  }
}
</script>

<style lang="scss">
.yhq2 {
  button {
    width: 94%;
    margin: 10px;
    text-align: center;
    line-height: 38px;
    background-color: #fc5869;
    border: #fff;
    border-radius: 18px;
    color: #fff;
  }
}
</style>