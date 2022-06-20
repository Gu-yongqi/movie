<template>
  <div class="pykxq">
    <van-nav-bar :title="k+'详情'" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="one">
      <img :src="img2" alt="">
    </div>
    <div class="two">
      <div>
        <svg class="icon" aria-hidden="true" style="margin:2px 0 0 2px;">
          <use xlink:href="#icon-c-tequan"></use>
        </svg>
      </div>
      <div>{{k}}特权</div>
    </div>
    <div class="thr" v-html="title"></div>
    <div class="for">
      <img :src="img3" alt="">
    </div>
    <div class="fiv">
      <div>
        <svg class="icon" aria-hidden="true" style="margin:2px 0 0 3px; font-size:14px;">
          <use xlink:href="#icon-cardb"></use>
        </svg>
      </div>
      <div>{{k}}说明</div>
    </div>
    <div class="six" v-html="content"></div>
    <div class="sev" @click="$router.push('/cgv')">开卡代表接受<span>《CGV影城购卡协议》</span></div>
    <button @click="$router.push({path:'/pay',query:{name,price}})">立即办卡</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      k: '',
      img2: '',
      img3: '',
      title: '',
      content: '',
      name: '',
      price: ''
    }
  },
  created() {
    this.k = this.$route.query.k
    this.img2 = this.$route.query.img2
    this.img3 = this.$route.query.img3
    this.title = this.$route.query.title
    this.content = this.$route.query.content
    this.name = this.$route.query.name
    this.price = this.$route.query.price
  }
}
</script>

<style lang="scss">
.pykxq {
  .one {
    padding: 20px 10px;
    border-bottom: 8px solid #f1f1f1;
    img {
      width: 100%;
    }
  }
  .two {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    div:nth-of-type(1) {
      background-color: #fc5869;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    div:nth-of-type(2) {
      padding-left: 5px;
      font-size: 12px;
    }
  }
  .thr {
    margin-left: 10px;
    font-size: 12px;
    color: #555;
    line-height: 20px;
  }
  .for {
    padding: 0 10px 20px;
    border-bottom: 8px solid #f1f1f1;
    img {
      width: 100%;
    }
  }
  .fiv {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    div:nth-of-type(1) {
      background-color: #fc5869;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    div:nth-of-type(2) {
      padding-left: 5px;
      font-size: 12px;
    }
  }
  .six {
    margin-left: 10px;
    font-size: 12px;
    color: #555;
    line-height: 20px;
    margin-bottom: 50px;
  }
  .sev {
    width: 100%;
    position: fixed;
    bottom: 38px;
    text-align: center;
    font-size: 10px;
    background-color: #fff;
    line-height: 30px;
    color: #aaa;
    span {
      color: #007dcd;
    }
  }
  button {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    line-height: 38px;
    background-color: #db281f;
    color: #fff;
    border: #fff;
    border-radius: 5px;
    font-size: 14px;
  }
}
</style>