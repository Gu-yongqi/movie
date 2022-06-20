<template>
  <div class="info">
    <van-nav-bar title="编辑个人资料" fixed placeholder z-index="999" left-arrow @click-left="$router.back()" />
    <van-steps :active="active" active-color="#db281f" @click-step="$toast('完善个人资料,送积分呦~')">
      <van-step>0%</van-step>
      <van-step>25%</van-step>
      <van-step>50%</van-step>
      <van-step>75%</van-step>
      <van-step>100%</van-step>
    </van-steps>
    <div class="one">
      <div>头像</div>
      <div>
        <input type="file" @change="ipt">
        <img :src="userInfo.avatar||'img/ftx.png'" alt="">
      </div>
      <div>
        <van-icon name="arrow" color="#aaa" />
      </div>
    </div>
    <div class="two">
      <van-field v-model="userInfo.nickname" label="昵称" :placeholder="userInfo.nickname" input-align="right" @blur="blur" />
    </div>
    <div class="thr" @click="thr">
      <div>手机号</div>
      <div>
        {{userInfo.username.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}
      </div>
    </div>
    <div class="for" @click="model=true">
      <div>生日</div>
      <div>{{n||currentDate.getFullYear()}}-{{y||currentDate.getMonth() + 1}}-{{r||currentDate.getDate()}}<span>
          <van-icon name="arrow" color="#aaa" />
        </span></div>
    </div>
    <van-popup v-model="model" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="year" @cancel="model=false" />
    </van-popup>
    <div class="fiv" @click="show=true">
      <div>性别</div>
      <div>{{userInfo.gender}}<span>
          <van-icon name="arrow" color="#aaa" />
        </span></div>
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="select" cancel-text="取消" />
    <div class="sex" @click="show2=true">
      <div>选择城市</div>
      <div>
        {{userInfo.addr}}
        <van-icon name="arrow" color="#aaa" />
      </div>
    </div>
    <van-popup v-model="show2" position="bottom" :style="{ height: '30%' }">
      <van-area title="选择省市区" :area-list="areaList" @confirm="confirm" @cancel="show2=false" :value="userInfo.addrCode" />
    </van-popup>
    <div class="sev" @click="submit">保存</div>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import Vue from 'vue';
import { Step, Steps, DatetimePicker, ActionSheet, Popup, Area } from 'vant';

Vue.use(Step).use(Steps).use(DatetimePicker).use(ActionSheet).use(Popup).use(Area)
export default {
  data() {
    return {
      active: 4,
      model: false,
      show: false,
      show2: false,
      actions: [{ name: '男' }, { name: '女' }],
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2022, 0, 24),
      n: '',
      y: '',
      r: '',
      areaList,
      userInfo: {},
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (this.userInfo.birthday) {
      this.n = this.userInfo.birthday.substr(0, 4)
      this.y = this.userInfo.birthday.substr(5, 2)
      this.r = this.userInfo.birthday.substr(8, 2)
    }
    this.currentDate = new Date(this.n, this.y - 1, this.r)
    let { addr, avatar, nickname, gender, birthday } = this.userInfo
    let arr = [addr, avatar, nickname, gender, birthday]
    let obj = arr.filter(v => {
      return v != undefined
    })
    this.active = obj.length - 1
  },
  methods: {
    thr() {
      this.$dialog.alert({
        title: '温馨提示',
        message: '手机号请到就近影城修改,请您谅解~',
      })
    },
    blur() {
      this.userInfo.nickname = this.userInfo.nickname
    },
    select(item) {
      this.show = false
      this.userInfo.gender = item.name
    },
    confirm(e) {
      this.show2 = false
      this.userInfo.addr = e.map(v => v.name).join('-')
      this.userInfo.addrCode = e.reverse()[0].code
    },
    year(v) {
      this.currentDate = v
      this.userInfo.birthday = this.currentDate.getFullYear() + '-' + ((Number(this.currentDate.getMonth()) + 1) > 10 ? (Number(this.currentDate.getMonth()) + 1) : '0' + (Number(this.currentDate.getMonth()) + 1)) + '-' + (this.currentDate.getDate() > 10 ? this.currentDate.getDate() : '0' + this.currentDate.getDate())
      this.n = this.userInfo.birthday.substr(0, 4)
      this.y = this.userInfo.birthday.substr(5, 2)
      this.r = this.userInfo.birthday.substr(8, 2)
      this.model = false
    },
    submit() {
      let uni_id_token = localStorage.getItem('token')
      this.userInfo.birthday = this.currentDate.getFullYear() + '-' + ((Number(this.currentDate.getMonth()) + 1) > 10 ? (Number(this.currentDate.getMonth()) + 1) : '0' + (Number(this.currentDate.getMonth()) + 1)) + '-' + (this.currentDate.getDate() > 10 ? this.currentDate.getDate() : '0' + this.currentDate.getDate())
      let { addr, addrCode, avatar, nickname, gender, birthday } = this.userInfo
      this.axios({
        url: '/user/kh/updateUser',
        method: 'POST',
        data: {
          addr, addrCode, avatar, nickname, gender, birthday, uni_id_token
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$toast('修改成功')
          let { userInfo } = res.data
          this.$root.userInfo = userInfo
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          setTimeout(v => {
            this.$router.back()
          }, 800)
        } else {
          this.$toast('修改失败')
        }
      })
    },
    async ipt(e) {
      let file = e.target.files[0]
      let { data: { token } } = await this.info()
      console.log(file, token);
      let name = file.name.slice(file.name.lastIndexOf('.'))
      let key = `${new Date().getTime()}${Math.random().toString(36).slice(2)}${name}`

      let formDate = new FormData()
      formDate.append('file', file)
      formDate.append('token', token)
      formDate.append('key', key)
      this.axios({
        url: 'https://upload-z1.qiniup.com',
        method: 'POST',
        data: formDate
      }).then(res => {
        console.log(res);
        let avatar = `http://toutiao.longxiaokj.com/${res.data.key}`
        this.userInfo.avatar = avatar
        this.$forceUpdate()
      })
    },
    info() {
      return this.axios({
        url: 'https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/upload/token',
        method: 'POST'
      })
    }
  }
}
</script>

<style lang="scss">
.info {
  .one {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    border-bottom: 2px solid #f6f6f6;
    padding: 0 10px;
    div:nth-of-type(1) {
      font-size: 12px;
    }
    div:nth-of-type(2) {
      margin-left: 250px;
      position: relative;
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        cursor: pointer;
        opacity: 0;
      }
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
  }
  .two {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #f6f6f6;
    padding: 0 10px;
    height: 50px;
    .van-cell {
      padding: 0;
      span {
        font-size: 12px;
        color: #000;
      }
    }
    input {
      color: #aaa;
      font-size: 14px;
      margin-right: 12px;
    }
  }
  .thr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #f6f6f6;
    padding: 0 10px;
    height: 50px;
    div:nth-of-type(1) {
      font-size: 12px;
    }
    div:nth-of-type(2) {
      font-size: 14px;
      color: #aaa;
      margin-right: 10px;
    }
  }
  .for {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #f6f6f6;
    padding: 0 10px;
    height: 50px;
    div:nth-of-type(1) {
      font-size: 12px;
      span {
        font-size: 12px;
        color: #db281f;
      }
    }
    div:nth-of-type(2) {
      font-size: 14px;
      color: #aaa;
      span {
        margin-left: 2px;
      }
    }
  }
  .fiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #f6f6f6;
    padding: 0 10px;
    height: 50px;
    div:nth-of-type(1) {
      font-size: 12px;
    }
    div:nth-of-type(2) {
      font-size: 14px;
      color: #aaa;
      span {
        margin-left: 2px;
      }
    }
  }
  .sex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #f6f6f6;
    padding: 0 10px;
    height: 50px;
    div:nth-of-type(1) {
      font-size: 12px;
    }
    div:nth-of-type(2) {
      font-size: 14px;
      color: #aaa;
    }
  }
  .sev {
    width: 94%;
    margin: 10px;
    text-align: center;
    line-height: 38px;
    background-color: #fc5869;
    border: #fff;
    border-radius: 18px;
    color: #fff;
    font-size: 14px;
  }
}
</style>