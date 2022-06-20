<template>
  <div class="xyk">
    <van-nav-bar title="选择星意卡" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div @click="$router.push('/xyk2')" class="one">
      <van-icon name="add-o" size="12" />
      <span>添加星意卡</span>
    </div>
    <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" />
    <div style="text-align: center; font-size: 12px;  color: #aaa;">您还没有星意卡哟~</div>
  </div>
</template>


<style lang="scss">
.xyk {
  .one {
    margin: 20px 10px 10px;
    text-align: center;
    line-height: 38px;
    border: 1px solid #aaa;
    span {
      font-size: 12px;
    }
  }
  .van-empty__image {
    margin: 50px 0 0;
  }
}
</style>