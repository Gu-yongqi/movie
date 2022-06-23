<template>
  <div class="jf">
    <van-nav-bar title="我的积分" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="one" @click="$router.push('/vip')">
      <div>
        <img :src="$root.userInfo.avatar||'img/ftx.png'" alt="">
        <span>初心朋友</span>
        <van-icon name="like-o" color="#8dd3f4" />
      </div>
      <div>
        <van-icon name="arrow" color="#aaa" />
      </div>
    </div>
    <div class="two">
      <div class="left">
        <img src="img/t.png" alt="">
      </div>
      <div class="solid"></div>
      <div class="right">
        <div>当前可用积分</div>
        <div>5</div>
      </div>
    </div>
    <div class="thr" @click="$router.push('/jfxq')">
      <div>积分明细</div>
      <div>
        <van-icon name="arrow" color="#aaa" />
      </div>
    </div>
    <div class="for" @click="$router.push('/jfgz')">如何获取积分?</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: ''
    }
  },
  created() {
    let { avatar } = JSON.parse(localStorage.getItem('userInfo'))
    this.avatar = avatar
  }
}
</script>

<style lang="scss">
.jf {
  .one {
    padding: 30px 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #f6f6f6;
    div:nth-of-type(1) {
      img {
        vertical-align: middle;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span {
        margin-right: 10px;
      }
    }
  }
  .two {
    padding: 20px 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #f6f6f6;
    .left {
      flex: 1;
      text-align: center;
      img {
        width: 120px;
      }
    }
    .solid {
      border-right: 2px solid #f1f1f1;
      height: 100px;
    }
    .right {
      flex: 1;
      text-align: center;
      div:nth-of-type(1) {
        font-size: 15px;
        margin-bottom: 10px;
      }
      div:nth-of-type(2) {
        font-size: 32px;
        color: #db281f;
      }
    }
  }
  .thr {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 2px solid #f6f6f6;
  }
  .for {
    padding-right: 10px;
    float: right;
    line-height: 36px;
    font-size: 12px;
    color: #aaa;
  }
}
</style>