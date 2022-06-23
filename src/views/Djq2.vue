<template>
  <div class="djq2">
    <van-nav-bar title="添加代金券" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-field label="请输入券码" placeholder="请输入代金券编号" v-model="val1" @focus="show1=true" @blur="show1=false" />
    </van-cell-group>
    <!-- <van-number-keyboard :show="show1" v-model="val1" extra-key="" @blur="show1=false" style="padding-bottom:0;" /> -->
    <van-cell-group>
      <van-field label="请输入密码" placeholder="请输入代金券密码" v-model="val2" @focus="show2=true" @blur="show2=false" />
    </van-cell-group>
    <!-- <van-number-keyboard :show="show2" v-model="val2" extra-key="" @blur="show2=false" style="padding-bottom:0;" /> -->
    <div style="font-size:12px; color:#aaa; margin:10px;">添加后的代金券,可在付款时使用,也可在“我的--票券”中查看。</div>
    <button @click="$toast('请输入正确的券号');">确定</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // show1: false,
      // show2: false,
      val1: '',
      val2: ''
    }
  }
}
</script>

<style lang="scss">
.djq2 {
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