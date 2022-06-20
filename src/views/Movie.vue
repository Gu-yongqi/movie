<template>
  <div class="movie">
    <van-nav-bar :title="nameList" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell :title="name" title-style="font-weight:700;" :value="`${y}月${r}日 ${time}`" />
    </van-cell-group>
    <div class="movieBtn">
      <div class="btn" v-for="(item,index) in items" :key="index" @click="click(index,item.time)" :class="{active:flag==index||item.time==time}">
        <div>{{item.time}}</div>
        <div>{{item.type}}</div>
        <div>￥{{item.price}}起</div>
      </div>
    </div>
    <div id="icon">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kexuanzuobiankuang" />
        </svg>
        <span>可选</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yixuanzuo" />
        </svg>
        <span>已选</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bukexuanzuo" />
        </svg>
        <span>已售</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huang" />
        </svg>
        <span>线上优先</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yixuanzuo-copy" />
        </svg>
        <span>停售</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-lan" />
        </svg>
        <span>宽座</span>
      </div>
    </div>
    <div class="smallMain" v-if="small">
      <main class="small">
        <div class="heng"></div>
        <ul v-for="(item,index) in deatil.layout" :key="index">
          <li v-for="(item2,index2) in item.list" :key="index2" @click="svg(index,index2,item2)" :class="{disabled:item2.seatType=='disabled'||item2.seatType=='04'}">
            <svg class="icon" aria-hidden="true" v-if="item2.seatType=='disabled'">
              <use xlink:href="#icon-yixuanzuo-copy" />
            </svg>
            <svg class="icon" aria-hidden="true" v-else-if="item2.active">
              <use xlink:href="#icon-yixuanzuo" />
            </svg>
            <template v-else>
              <svg class="icon" aria-hidden="true" v-if="item2.seatType=='01'">
                <use xlink:href="#icon-kexuanzuobiankuang" />
              </svg>
              <svg class="icon" aria-hidden="true" v-if="item2.seatType=='02'">
                <use xlink:href="#icon-kexuanzuobiankuang" />
              </svg>
              <svg class="icon" aria-hidden="true" v-if="item2.seatType=='03'">
                <use xlink:href="#icon-kexuanzuobiankuang" />
              </svg>
              <svg class="icon" aria-hidden="true" v-if="item2.seatType=='04'">
                <use xlink:href="" />
              </svg>
              <svg class="icon" aria-hidden="true" v-if="item2.seatType=='isBuy'">
                <use xlink:href="#icon-yixuanzuo" />
              </svg>
            </template>
          </li>
        </ul>
      </main>
    </div>
    <main :class="{h:priceList.length!=0}">
      <div class="title">{{items[0].biute}}</div>
      <div class="dashed"></div>
      <div class="indexMovie">
        <div v-for="(item,index) in 5" :key="index">{{item}}</div>
      </div>
      <ul v-for="(item,index) in deatil.layout" :key="index">
        <li v-for="(item2,index2) in item.list" :key="index2" @click="svg(index,index2,item2)" :class="{disabled:item2.seatType=='disabled'||item2.seatType=='04'}">
          <svg class="icon" aria-hidden="true" v-if="item2.seatType=='disabled'">
            <use xlink:href="#icon-yixuanzuo-copy" />
          </svg>
          <svg class="icon" aria-hidden="true" v-else-if="item2.active">
            <use xlink:href="#icon-yixuanzuo" />
          </svg>
          <template v-else>
            <svg class="icon" aria-hidden="true" v-if="item2.seatType=='01'">
              <use xlink:href="#icon-kexuanzuobiankuang" />
            </svg>
            <svg class="icon" aria-hidden="true" v-if="item2.seatType=='02'">
              <use xlink:href="#icon-huang" />
            </svg>
            <svg class="icon" aria-hidden="true" v-if="item2.seatType=='03'">
              <use xlink:href="#icon-lan" />
            </svg>
            <svg class="icon" aria-hidden="true" v-if="item2.seatType=='04'">
              <use xlink:href="" />
            </svg>
            <svg class="icon" aria-hidden="true" v-if="item2.seatType=='isBuy'">
              <use xlink:href="#icon-yixuanzuo" />
            </svg>
          </template>
        </li>
      </ul>
    </main>
    <div class="priceList">
      <div v-for="(item,index) in priceList" :key="index" class="item">
        <div class="left">
          <div>{{item.seatText}}</div>
          <div>{{item.price}}元</div>
        </div>
        <div class="right">
          <div @click="x(index)">X</div>
        </div>
      </div>
    </div>
    <div class="fot">
      <div class="left">
        <div>一次最多可选择6个座位</div>
        <div>如果特惠活动名额有限以支付页面为准</div>
      </div>
      <div class="right">
        <div v-show="priceList.length>0">
          <span>E优卡</span>
          <span>￥{{priceList.length*36}}</span>
        </div>
        <div :class="{ml:priceList.length==0}">￥{{total}}</div>
      </div>
    </div>
    <van-button type="primary" size="large" id="btn" @click="submit">{{priceList.length==0?'选择座位':'确认座位'}}</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deatil: [],
      filmsId: '',
      nameList: '',
      flag: null,
      items: [],
      name: '',
      time: '',
      index: null,
      img: '',
      y: null,
      r: null,
      priceList: [],
      small: false
    }
  },
  created() {
    this.filmsId = this.$route.query.filmsId
    this.items = JSON.parse(this.$route.query.items)
    this.name = this.$route.query.name
    this.time = this.$route.query.time
    this.index = this.$route.query.index
    this.img = this.$route.query.img
    this.y = this.$route.query.y
    this.r = this.$route.query.r
    this.y = this.y < 10 ? '0' + this.y : this.y
    this.r = this.r < 10 ? '0' + this.r : this.r
    this.nameList = localStorage.getItem("nameList")
    this.getDeatil()
    this.$dialog.alert({
      title: '温馨提示',
      messageAlign: 'left',
      message: '1: 观影需全程佩戴口罩,电影放映期间影厅内禁止饮食，感谢配合;\n2: 特殊厅儿童需另行购票,方可入场观影;\n3: 为了您的观影安全,观看3D影片请您自备或至影城购买3D眼镜;\n4: 1.3米以下儿童在家长陪同下可免票观看普通厅影片(家长需购票,一名家长限带一名儿童);特效厅观影1.3米以下儿童也需购票;',
    })
  },
  mounted() {
    document.querySelectorAll('.btn')[this.index].scrollIntoView()
  },
  computed: {
    total() {
      let num = 0
      this.priceList.forEach(v => {
        num += Number(v.price)
      })
      return num
    }
  },
  methods: {
    getDeatil() {
      this.axios({
        url: '/book/pub/getDetail',
        method: 'GET',
        params: {
          bookId: '628143b87a1d270001b7171b'
        }
      }).then(res => {
        console.log(res);
        this.deatil = res.data.rows[0]
      })
    },
    click(i, time) {
      this.flag = i
      this.time = time
      document.querySelectorAll('.btn')[i].scrollIntoView()
    },
    svg(index, index2, item) {
      let { price, cardPrice, seatText } = item
      if (item.seatType == 'disabled' || item.seatType == '04') {
        return
      }
      let active = this.deatil.layout[index].list[index2].active
      if (active) {
        let left = this.deatil.layout[index].list[index2 - 1]
        let right = this.deatil.layout[index].list[index2 + 1]
        if (left && left.active && right && right.active) {
          this.$toast('不允许在中间取消')
          return
        }
        let i = this.priceList.findIndex(v => {
          return v.seatText == seatText
        })
        this.priceList.splice(i, 1)
      } else {
        let left1 = this.deatil.layout[index].list[index2 - 1]
        let left2 = this.deatil.layout[index].list[index2 - 2]
        let right1 = this.deatil.layout[index].list[index2 + 1]
        let right2 = this.deatil.layout[index].list[index2 + 2]
        if (left2 && left2.active && !left1.active) {
          this.$toast('不能空位置')
          return
        }
        if (right2 && right2.active && !right1.active) {
          this.$toast('不能空位置')
          return
        }
        if (this.priceList.length >= 6) {
          this.$toast('最多选6个座位')
          return
        }
        this.priceList.push({
          index,
          index2,
          price,
          cardPrice,
          seatText
        })
      }
      this.deatil.layout[index].list[index2].active = !active
      this.small = true
      let timer = null
      clearTimeout(timer)
      timer = setTimeout(v => {
        this.small = false
      }, 2000);
      this.$forceUpdate()
    },
    x(i) {
      let { index, index2 } = this.priceList[i]
      let left = this.deatil.layout[index].list[index2 - 1]
      let right = this.deatil.layout[index].list[index2 + 1]
      if (left && left.active && right && right.active) {
        this.$toast('不允许在中间取消')
        return
      }
      this.deatil.layout[index].list[index2].active = 0
      this.priceList.splice(i, 1)
    },
    submit() {
      let { priceList, time } = this
      if (!priceList.length) {
        this.$toast('请先选择座位')
        return
      }
      let r = new Date().getDate()
      let x = new Date().getHours()
      time = time.split(':')[0] - 0
      if (r >= this.r && x >= time) {
        console.log();
        this.$dialog.alert({
          title: '温馨提示',
          message: '当前排版已过期',
        })
        return
      }
      let { uid, token } = localStorage
      if (!uid && !token) {
        this.$router.push('/login')
      } else {
        localStorage.setItem('name', this.name)
        localStorage.setItem('y', this.y)
        localStorage.setItem('r', this.r)
        localStorage.setItem('times', this.time)
        localStorage.setItem('priceList', JSON.stringify(this.priceList))
        localStorage.setItem('total', this.total)
        localStorage.setItem('img', this.img)
        localStorage.setItem('biute', this.items[0].biute)
        localStorage.setItem('type', this.items[0].type)
        this.$router.push('/order')
      }
    }
  }
}
</script>

<style lang="scss">
.movie {
  .h {
    height: 290px;
  }
  .movieBtn {
    display: flex;
    overflow: scroll;
    margin-left: 20px;
    .btn {
      height: 80px;
      margin-right: 10px;
      border: 1px solid #aaa;
      div {
        width: 80px;
        text-align: center;
      }
      div:nth-of-type(1) {
        margin-top: 10px;
        font-size: 14px;
      }
      div:nth-of-type(2) {
        margin-top: 5px;
        font-size: 12px;
        color: #aaa;
      }
      div:nth-of-type(3) {
        margin-top: 5px;
        font-size: 14px;
        color: #fc5869;
      }
    }
    .active {
      background-color: #fc5869;
      border: 1px solid #fc5869;
      div {
        color: #fff !important;
      }
    }
  }
  #icon {
    margin: 20px 0 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    div {
      width: 75px;
      text-align: center;
      span {
        padding-left: 5px;
        font-size: 12px;
      }
    }
  }
  .smallMain {
    position: fixed;
    top: 240px;
    left: 0;
    z-index: 99;
  }
  main {
    background-color: #f6f6f6;
    height: 330px;
    position: relative;
    overflow: scroll;
    &.small {
      width: 200px;
      height: 102px;
      background-color: #000;
      opacity: 0.5;
      .heng {
        background-color: #ccc;
        width: 100px;
        margin: auto;
        border-radius: 0 0 5px 5px;
        height: 10px;
      }
      ul:nth-of-type(1) {
        margin-top: 0px !important;
      }
      ul {
        white-space: nowrap;
        margin-left: 2px !important;
        li {
          display: inline-block;
          width: 14px;
          line-height: 10px;
          text-align: center;
          font-size: 12px;
        }
      }
    }
    .indexMovie {
      width: 20px;
      height: 180px;
      background-color: #aaa;
      opacity: 0.5;
      position: fixed;
      left: 0;
      border-radius: 18px;
      margin-top: 90px;
      div:nth-of-type(1) {
        margin-top: 24px;
      }
      div {
        color: #fff;
        font-size: 12px;
        height: 30px;
        text-align: center;
      }
    }
    .title {
      width: 180px;
      line-height: 20px;
      position: fixed;
      left: 100px;
      text-align: center;
      font-size: 12px;
      background-color: #dcdcdc;
      border-radius: 0 0 18px 18px;
    }
    .dashed {
      position: absolute;
      left: 200px;
      top: 108px;
      height: 160px;
      border-left: 1px dashed #e1e1e1;
    }
    ul:nth-of-type(1) {
      margin-top: 108px;
    }
    ul {
      white-space: nowrap;
      margin-left: 20px;
      li {
        display: inline-block;
        width: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
    .disabled {
      pointer-events: none;
    }
  }
  .priceList {
    position: relative;
    white-space: nowrap;
    overflow: scroll;
    height: 50px;
    .item {
      display: inline-block;
      background: url("~@/assets/item.png") no-repeat center center;
      width: 80px;
      height: 34px;
      background-size: 80px 34px;
      font-size: 12px;
      margin: 3px 5px 0;
      text-align: center;
      position: relative;
      .left {
        float: left;
        div {
          margin: 0 0 0 10px;
        }
        div:nth-of-type(1) {
          color: #aaa;
          margin-left: 12px;
        }
        div:nth-of-type(2) {
          color: #fc5869;
        }
      }
      .right {
        float: right;
        div {
          color: #aaa;
          line-height: 38px;
          margin-right: 10px;
        }
      }
    }
  }
  .fot {
    position: fixed;
    bottom: 50px;
    display: flex;
    justify-content: center;
    line-height: 20px;
    padding-top: 6px;
    border-top: 1px solid #f6f6f6;
    .left {
      padding-left: 20px;
      font-size: 12px;
      color: #aaa;
    }
    .right {
      color: #fc5869;
      line-height: 40px;
      .ml {
        padding-left: 100px;
      }
      div {
        display: inline-block;
      }
      div:nth-of-type(1) {
        width: 80px;
        line-height: 15px;
        font-size: 12px;
        margin-left: 10px;
        border: 1px solid #f1a23d;
        border-radius: 5px;
        span:nth-of-type(1) {
          text-align: center;
          width: 40px;
          display: inline-block;
          font-size: 12px;
          color: #fff;
          background-color: #f1a23d;
          border-radius: 5px 0 0 5px;
        }
        span:nth-of-type(2) {
          width: 40px;
          text-align: center;
          display: inline-block;
          color: #f1a23d;
          font-size: 12px;
        }
      }
      div:nth-of-type(2) {
        font-size: 20px;
      }
    }
  }
  #btn {
    position: fixed;
    bottom: 0;
    background-color: #fc5869;
    border: 1px solid #fc5869;
    border-radius: 5px;
  }
}
</style>