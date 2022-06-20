<template>
  <div class="kf">
    <van-nav-bar title="客服" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="one" @click="$toast('功能正在开发中,尽情期待')">
      <div>在线客服</div>
      <div>
        <van-icon name="arrow" color="#aaa" />
      </div>
    </div>
    <div class="one">
      <div>客服热线</div>
      <a href="tel://400 718 5575" style="color:#178bbd; font-size:12px;">400-718-5575</a>
    </div>
  </div>
</template>

<style lang="scss">
.kf {
  .one {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 2px solid #f6f6f6;
    padding: 0 10px;
    div:nth-of-type(1) {
      font-size: 14px;
    }
  }
}
</style>