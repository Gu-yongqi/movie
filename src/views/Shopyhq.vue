<template>
  <div class="shopyhq">
    <van-nav-bar title="选择商品优惠券" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div @click="$router.push('/yhq2')" class="one">
      <van-icon name="add-o" size="12" />
      <span>添加优惠券</span>
    </div>
    <div class="two">提示:每个座位可选一张,兑换更多优惠券请前往积分商城</div>
    <div class="thr">还没有优惠券~~</div>
  </div>
</template>

<style lang="scss">
.shopyhq {
  .one {
    margin: 10px 10px;
    text-align: center;
    line-height: 38px;
    border: 1px solid #aaa;
    span {
      font-size: 12px;
    }
  }
  .two {
    font-size: 12px;
    color: #fc5869;
    margin-left: 10px;
  }
  .thr {
    font-size: 12px;
    color: #aaa;
    text-align: center;
    margin-top: 10px;
  }
}
</style>

