<template>
  <div class="wode">
    <van-nav-bar title="MY CGV" fixed placeholder :border="false" />
    <div v-if="$root.token&&$root.uid">
      <div class="one">
        <div @click="$router.push('/info')">
          <img :src="$root.userInfo.avatar||'img/ftx.png'" alt="">
        </div>
        <div>
          <div class="title" @click="$router.push('/info')">
            <span>{{$root.userInfo.nickname||'CGV影迷'}}</span>
            <van-icon name="edit" style=" font-size:15px; margin-left:8px;" />
          </div>
          <div class="tb">
            <span @click="$router.push('/vip')">
              <van-icon name="like-o" color="#8dd3f4" />
            </span>
            <span @click="$router.push('/vip')">初心朋友</span>
            <span>|</span>
            <span @click="$router.push('/jf')">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jifen"></use>
              </svg>
            </span>
            <span @click="$router.push('/jf')">可用积分 : 5</span>
          </div>
        </div>
        <div @click="$router.push('/code')">
          <svg class="icon" aria-hidden="true" style=" font-size:18px;">
            <use xlink:href="#icon-erweima0"></use>
          </svg>
        </div>
      </div>
      <div class="two">
        <div @click="$router.push('/yh')">
          <div>
            <img src="img/ppk.png" alt="">
          </div>
          <div>朋友卡</div>
        </div>
        <div class="solid"></div>
        <div @click="$router.push('/yhq')">
          <div>
            <img src="img/pq.png" alt="">
          </div>
          <div>票券</div>
        </div>
      </div>
      <div class="thr" @click="$router.push('/dd')">
        <div>
          <svg class="icon" aria-hidden="true" style=" font-size:28px;">
            <use xlink:href="#icon-shouye"></use>
          </svg>
        </div>
        <div>我的订单</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
      <div class="thr" @click="$router.push('/jf')">
        <div>
          <svg class="icon" aria-hidden="true" style=" font-size:28px;">
            <use xlink:href="#icon-jifen0"></use>
          </svg>
        </div>
        <div>我的积分</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
      <div class="thr" @click="$router.push('/love')">
        <div>
          <van-icon name="like-o" size="28" color="#db281f" />
        </div>
        <div>想看列表</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
      <div class="thr" @click="$router.push('/code')">
        <div>
          <svg class="icon" aria-hidden="true" style=" font-size:28px;">
            <use xlink:href="#icon-erweima"></use>
          </svg>
        </div>
        <div>我的二维码</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
      <div class="thr" @click="$router.push('/cy')">
        <div>
          <van-icon name="friends-o" size="28" color="#db281f" />
        </div>
        <div>常用观影人</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
      <div class="thr" @click="$router.push('/kf')">
        <div>
          <svg class="icon" aria-hidden="true" style=" font-size:28px;">
            <use xlink:href="#icon-kehufuwukefu"></use>
          </svg>
        </div>
        <div>客服</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
    </div>
    <div v-else @click="$router.push('/login')">
      <div class="one">
        <div>
          <img src="img/ftx.png" alt="">
        </div>
        <div>
          <div class="title">
            <span>登录</span>
            <van-icon name="edit" style=" font-size:15px; margin-left:8px;" />
          </div>
          <div class="tb">
            <span>
              <van-icon name="like-o" color="#8dd3f4" />
            </span>
            <span>初心朋友</span>
            <span>|</span>
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jifen"></use>
              </svg>
            </span>
            <span>可用积分 : 0</span>
          </div>
        </div>
        <div>
          <svg class="icon" aria-hidden="true" style=" font-size:18px;">
            <use xlink:href="#icon-erweima0"></use>
          </svg>
        </div>
      </div>
      <div class="two">
        <div>
          <div>
            <img src="img/ppk.png" alt="">
          </div>
          <div>朋友卡</div>
        </div>
        <div class="solid"></div>
        <div>
          <div>
            <img src="img/pq.png" alt="">
          </div>
          <div>票券</div>
        </div>
      </div>
      <div class="thr">
        <div>
          <svg class="icon" aria-hidden="true" style=" font-size:28px;">
            <use xlink:href="#icon-shouye"></use>
          </svg>
        </div>
        <div>我的订单</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
      <div class="thr">
        <div>
          <svg class="icon" aria-hidden="true" style=" font-size:28px;">
            <use xlink:href="#icon-jifen0"></use>
          </svg>
        </div>
        <div>我的积分</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
      <div class="thr">
        <div>
          <van-icon name="like-o" size="28" color="#db281f" />
        </div>
        <div>想看列表</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
      <div class="thr">
        <div>
          <svg class="icon" aria-hidden="true" style=" font-size:28px;">
            <use xlink:href="#icon-erweima"></use>
          </svg>
        </div>
        <div>我的二维码</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
      <div class="thr">
        <div>
          <van-icon name="friends-o" size="28" color="#db281f" />
        </div>
        <div>常用观影人</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
      <div class="thr">
        <div>
          <svg class="icon" aria-hidden="true" style=" font-size:28px;">
            <use xlink:href="#icon-kehufuwukefu"></use>
          </svg>
        </div>
        <div>客服</div>
        <div>
          <van-icon name="arrow" color="#aaa" />
        </div>
      </div>
    </div>
    <div class="for" v-if="$root.token&&$root.uid" @click="submit">退出登录</div>
    <van-tabbar placeholder route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item icon="home-o" to="/home">电影</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to="/mall">商城</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/wode">MY CGV</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '您确定要退出当前账号吗',
      }).then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpired')
        localStorage.removeItem('uid')
        localStorage.removeItem('userInfo')
        this.$root.token = ''
        this.$root.uid = ''
        this.$root.userInfo = {}
      })
    }
  }
}
</script>

<style lang="scss">
.wode {
  .one {
    background-color: #db281f;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div:nth-of-type(1) {
      margin-left: 10px;
      img {
        width: 68px;
        height: 68px;
        border-radius: 50%;
      }
    }
    div:nth-of-type(2) {
      color: #fff;
      margin-right: 30px;
      .title {
        font-size: 16px;
        margin-bottom: 20px;
      }
      .tb {
        span:nth-of-type(2) {
          margin: 0 10px;
          font-size: 12px;
        }
        span:nth-of-type(4) {
          margin: 0 10px;
        }
        span:nth-of-type(5) {
          font-size: 12px;
        }
      }
    }
    div:nth-of-type(3) {
      margin-right: 10px;
    }
  }
  .two {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 5px solid #f6f6f6;
    height: 100px;
    .solid {
      border-right: 2px solid #f1f1f1;
      height: 50px;
    }
    div {
      text-align: center;
      font-size: 14px;
      img {
        width: 60px;
        height: 40px;
      }
    }
  }
  .thr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 2px solid #f6f6f6;
    padding: 0 10px;
    div:nth-of-type(2) {
      font-size: 14px;
      margin-right: 220px;
    }
  }
  .for {
    line-height: 50px;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
}
</style>