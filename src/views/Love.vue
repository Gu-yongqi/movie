<template>
  <div class="love">
    <van-nav-bar title="想看列表" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" />
    <div style="text-align: center; font-size: 12px;  color: #aaa;">您还没有想看的电影呦~</div>
  </div>
</template>

<style lang="scss">
.love {
  .van-empty__image {
    margin: 120px 0 0;
  }
}
</style>