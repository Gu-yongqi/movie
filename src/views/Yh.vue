<template>
  <div class="yh">
    <van-nav-bar title="选择朋友卡" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" />
    <div style="text-align: center; font-size: 12px;  color: #aaa;">您还没有开通CGV的朋友卡哟~</div>
  </div>
</template>

<style lang="scss">
.yh {
  .van-empty__image {
    margin: 100px 0 0;
  }
}
</style>