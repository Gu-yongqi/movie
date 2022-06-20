<template>
  <div class="dd">
    <van-nav-bar title="我的订单" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-tabs>
      <van-tab title="电影.商品">
        <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" />
        <div style="text-align: center; font-size: 12px;  color: #aaa;">您最近尚无订单信息呦~</div>
      </van-tab>
      <van-tab title="朋友卡">
        <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" />
        <div style="text-align: center; font-size: 12px;  color: #aaa;">您最近尚无订单信息呦~</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss">
.dd {
  .van-empty__image {
    margin: 100px 0 0;
  }
}
</style>