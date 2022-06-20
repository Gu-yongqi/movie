<template>
  <div class="yhq">
    <van-nav-bar title="选择优惠券" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-tabs>
      <van-tab title="优惠券">
        <div @click="$router.push('/yhq2')">
          <van-icon name="add-o" size="12" />
          <span>添加优惠券</span>
        </div>
        <div>提示:每个座位可选一张,兑换更多优惠券请前往积分商城</div>
        <div>还没有优惠券~~</div>
      </van-tab>
      <van-tab title="代金券">
        <div @click="$router.push('/djq2')">
          <van-icon name="add-o" size="12" />
          <span>添加兑换券、观摩券</span>
        </div>
        <div></div>
        <div>还没有兑换券、观摩券~~</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss">
.yhq {
  .van-tab__pane {
    div:nth-of-type(1) {
      margin: 20px 10px 10px;
      text-align: center;
      line-height: 38px;
      border: 1px solid #aaa;
      span {
        font-size: 12px;
      }
    }
    div:nth-of-type(2) {
      font-size: 12px;
      color: #fc5869;
      margin-left: 10px;
    }
    div:nth-of-type(3) {
      font-size: 12px;
      color: #aaa;
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>

