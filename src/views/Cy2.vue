<template>
  <div class="cy2">
    <van-nav-bar title="添加常用观影人" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-field label="姓名" placeholder="请输入您的的姓名" v-model="text" />
    </van-cell-group>
    <van-cell-group>
      <van-field label="身份证" placeholder="请输入您的身份证号" v-model="val" @focus="show=true" @blur="show=false" />
    </van-cell-group>
    <!-- <van-number-keyboard :show="show" v-model="val" extra-key="X" @blur="show=false" style="padding-bottom:0;" /> -->
    <button @click="submit">确定</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      val: '',
      text: ''
    }
  },
  methods: {
    submit() {
      let arr = []
      if (!this.text) {
        this.$dialog.alert({
          title: '温馨提示',
          message: '请输入您的姓名',
        })
      } else if (!this.val) {
        this.$dialog.alert({
          title: '温馨提示',
          message: '请输入您的的证件号',
        })
      } else if (!/^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.val)) {
        this.$dialog.alert({
          title: '温馨提示',
          message: '请输入正确的证件号',
        })
      } else {
        this.$toast('添加成功')
        arr.push({ name: this.text, value: this.val })
        localStorage.setItem('arr', JSON.stringify(arr))
        setTimeout(v => {
          this.$router.push('/cy')
        }, 800)
      }
    }
  }
}
</script>

<style lang="scss">
.cy2 {
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