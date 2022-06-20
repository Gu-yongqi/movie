<template>
  <div class="jfxq">
    <van-nav-bar title="积分明细" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-tabs>
      <van-tab title="全部">
        <div class="one">2022年5月</div>
        <div class="two">
          <div class="left">
            <div>(其他)活动累计</div>
            <div>会员入会送积分活动</div>
          </div>
          <div class="right">
            <div>+5</div>
            <div>2022-05-25</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="获取">
        <div class="one">2022年5月</div>
        <div class="thr">
          <div class="left">
            <div>(其他)活动累计</div>
            <div>会员入会送积分活动</div>
          </div>
          <div class="right">
            <div>+5</div>
            <div>2022-05-25</div>
            <div>2022-11-25到期</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="使用">
        <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="您还没有使用过呦~" style="margin-top:120px;" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss">
.jfxq {
  .one {
    background-color: #f6f6f6;
    line-height: 38px;
    font-size: 12px;
    color: #aaa;
  }
  .two {
    padding: 20px 10px;
    height: 40px;
    line-height: 24px;
    border-bottom: 2px solid #f6f6f6;
    .left {
      float: left;
      div:nth-of-type(1) {
        font-size: 14px;
      }
      div:nth-of-type(2) {
        font-size: 12px;
        color: #aaa;
      }
    }
    .right {
      float: right;
      div:nth-of-type(1) {
        font-size: 14px;
        margin-left: 45px;
        color: green;
      }
      div:nth-of-type(2) {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
  .thr {
    padding: 20px 10px;
    height: 40px;
    line-height: 20px;
    border-bottom: 2px solid #f6f6f6;
    .left {
      float: left;
      div:nth-of-type(1) {
        font-size: 14px;
      }
      div:nth-of-type(2) {
        font-size: 12px;
        color: #aaa;
      }
    }
    .right {
      float: right;
      div:nth-of-type(1) {
        font-size: 14px;
        margin-left: 67px;
        color: green;
      }
      div:nth-of-type(2) {
        font-size: 12px;
        color: #aaa;
        margin-left: 22px;
      }
      div:nth-of-type(3) {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
}
</style>