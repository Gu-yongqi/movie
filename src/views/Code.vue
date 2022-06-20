<template>
  <div class="code">
    <van-nav-bar title="我的二维码" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="one">
      <img :src="$root.userInfo.avatar||'img/ftx.png'" alt="">
    </div>
    <div class="two">
      {{$root.userInfo.nickname||'CGV影迷'}}
    </div>
    <div class="thr">
      <img src="img/erweima.png" alt="">
    </div>
    <div class="fiv">请将二维码对准进行扫描</div>
  </div>
</template>

<style lang="scss">
.code {
  .one {
    text-align: center;
    margin-top: 30px;
    img {
      width: 68px;
      height: 68px;
      border-radius: 50%;
    }
  }
  .two {
    text-align: center;
    margin-top: 10px;
    font-size: 15px;
  }
  .thr {
    margin-top: 30px;
    text-align: center;
    img {
      width: 180px;
    }
  }
  .fiv {
    text-align: center;
    margin-top: 20px;
    font-size: 13px;
    color: #aaa;
  }
}
</style>