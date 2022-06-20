<template>
  <div class="login">
    <van-nav-bar title="登录" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="logo">
      <img src="img/logo.png" alt="" style="width:300px;">
    </div>
    <div class="ipt">
      <input type="text" placeholder="请输入账号" autocomplete="off" v-model="username" @touchstart.stop="show=true">
      <div @click="clearName" :style="{display:(username.length>0?'block':'none')}">X</div>
    </div>
    <van-number-keyboard :show="show" extra-key="" @blur="show = false" v-model="username" :maxlength="11" />
    <div class="ipt" style="margin-top:20px;">
      <input type="password" placeholder="请输入密码" autocomplete="off" v-model="password" @touchstart.stop="show=true">
      <div @click="clearWord" :style="{display:(password.length>0?'block':'none')}">X</div>
    </div>
    <van-number-keyboard :show="show" extra-key="" @blur="show = false" v-model="password" :maxlength="8" />
    <van-button round block type="info" native-type="submit" class="submit" @click="submit">登录</van-button>
    <van-checkbox v-model="checked" icon-size="12px" checked-color="#ee0a24" class="che">我已阅读并同意<span @click="$router.push('/one')">《用户协议》</span><span @click="$router.push('/two')">《用户隐私制度》</span></van-checkbox>
    <div class="log">
      <div @click="$router.push('/regin')">还无账号</div>
      <div @click="$router.back()">暂不登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      show: false,
      checked: false,
    };
  },
  methods: {
    submit() {
      let { username, password, checked } = this
      let regname = /^1[3-9][0-9]{9}$/
      let regword = /^[\d]{6,8}$/
      if (!(regname.test(username))) {
        this.$toast('账号格式不对')
        return
      }
      if (!(regword.test(password))) {
        this.$toast('密码格式不对')
        return
      }
      if (!checked) {
        this.$toast('请先勾选用户协议')
        return
      }
      this.axios({
        url: '/user/pub/login',
        method: 'POST',
        data: {
          username,
          password
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$toast('登录成功');
          let { token, tokenExpired, uid, userInfo } = res.data
          localStorage.setItem('token', token)
          localStorage.setItem('tokenExpired', tokenExpired)
          localStorage.setItem('uid', uid)
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.$root.token = token
          this.$root.uid = uid
          this.$root.userInfo = userInfo
          setTimeout(v => {
            this.$router.back()
          }, 1500)
        } else {
          this.$toast(res.data.msg);
        }
      })
    },
    clearName() {
      this.username = ''
    },
    clearWord() {
      this.password = ''
    },
  }
};
</script>

<style lang="scss">
.login {
  .van-number-keyboard {
    padding-bottom: 0;
  }
  .ipt {
    width: 300px;
    height: 42px;
    border: 1px solid #aaa;
    border-radius: 20px;
    line-height: 42px;
    margin: 0 auto;
    font-size: 13px;
    position: relative;
    input {
      width: 250px;
      letter-spacing: 1px;
      border: #fff;
      margin-left: 30px;
      height: 30px;
    }
    div {
      position: absolute;
      top: 15px;
      right: 20px;
      background-color: #aaa;
      opacity: 0.5;
      color: #fff;
      width: 12px;
      line-height: 12px;
      text-align: center;
      font-size: 12px;
      border-radius: 50%;
    }
  }
  .submit {
    margin: 20px auto 0;
    width: 300px;
    height: 42px;
    line-height: 42px;
    span {
      color: #fff;
    }
  }
  .che {
    margin: 10px 0 0 50px;
    font-size: 12px;
  }
  span {
    color: #db281f;
  }
  .log {
    display: flex;
    justify-content: space-between;
    color: #aaa;
    font-size: 13px;
    margin-top: 20px;
    div:nth-of-type(1) {
      margin-left: 10px;
    }
    div:nth-of-type(2) {
      margin-right: 10px;
    }
  }
}
</style>