import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { Button, Cell, CellGroup, NavBar, Swipe, SwipeItem, Image as VanImage, Tab, Tabs, Tabbar, TabbarItem, Toast, Dialog, Icon, Form, Field, NumberKeyboard, Checkbox, CheckboxGroup, SubmitBar, TreeSelect } from 'vant'

Vue.use(Button).use(Cell).use(CellGroup).use(NavBar).use(Swipe).use(SwipeItem).use(VanImage).use(Tab).use(Tabs).use(Tabbar).use(TabbarItem).use(Toast).use(Dialog).use(Icon).use(Form).use(Field).use(NumberKeyboard).use(Checkbox).use(CheckboxGroup).use(SubmitBar).use(TreeSelect)
Vue.config.productionTip = false
Vue.prototype.axios = axios
axios.defaults.baseURL = 'https://d941b892-db01-4b40-b8ac-4dd0901f822f.bspapp.com/apis'

let token = localStorage.getItem('token')
let uid = localStorage.getItem('uid')
let tokenExpired = localStorage.getItem('tokenExpired')
let sum = new Date().getTime()

if (token && uid && sum < tokenExpired) {
    axios({
        url: '/user/kh/getMyUserInfo',
        method: 'GET',
        params: {
            uni_id_token: token
        }
    }).then(res => {
        console.log(res);
        let { userInfo } = res.data
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        new Vue({
            router,
            store,
            data: {
                token,
                uid,
                userInfo
            },
            render: h => h(App)
        }).$mount('#app')
    })
} else {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpired')
    localStorage.removeItem('uid')
    localStorage.removeItem('userInfo')
    new Vue({
        router,
        store,
        data: {
            token: '',
            uid: '',
            userInfo: {}
        },
        render: h => h(App)
    }).$mount('#app')
}