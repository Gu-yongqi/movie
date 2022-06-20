<template>
  <div class="about">
    <van-nav-bar title="影院详情" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <div class="aboutSwp">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in infoList.img" :key="item._id">
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-button type="default" class="btnOne" :url="'tel://'+infoList.tel">拨打电话</van-button>
    <van-button type="danger" class="btnTwo" @click="$router.back()">影城购票</van-button>
    <div class="aboutBox">
      <div>
        <svg class="icon" aria-hidden="true" style="color:#aaa;">
          <use xlink:href="#icon-dingwei" />
        </svg>
        <span>{{infoList.name}}</span>
      </div>
      <div>地址：{{infoList.address}}</div>
      <div>电话：{{infoList.tel}}
        <van-icon name="phone" />
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoList: JSON.parse(localStorage.infoList)
    }
  },
  mounted() {
    this.mapInfo()
  },
  methods: {
    mapInfo() {
      var map = new BMapGL.Map('container');
      let { pos } = this.infoList
      let [int, ant] = pos.split(',')
      int = +int
      ant = +ant
      map.centerAndZoom(new BMapGL.Point(int, ant), 15);
      var marker = new BMapGL.Marker(new BMapGL.Point(int, ant));
      map.addOverlay(marker);
    }
  }
}
</script>

<style lang="scss">
.about {
  #container {
    margin-top: 10px;
    width: 100%;
    height: 200px;
  }
  .aboutSwp {
    .my-swipe .van-swipe-item {
      height: 248.44px;
      img {
        width: 100%;
      }
    }
  }
  .btnOne {
    width: 50%;
    border: #fff;
    height: 44px;
    color: #db281f;
  }
  .btnTwo {
    width: 50%;
    border: #fff;
    height: 44px;
  }
  .aboutBox {
    margin: 10px 0 0 10px;
    div {
      line-height: 24px;
      color: #aaa;
      font-size: 12px;
    }
    div:nth-of-type(1) {
      font-size: 14px;
      color: #000;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>