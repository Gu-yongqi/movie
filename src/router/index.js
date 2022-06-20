import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { Toast } from 'vant';

Vue.use(VueRouter).use(Toast);

const routes = [{
        path: '/',
        name: 'Index',
        component: () =>
            import ('../views/Index.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            keep: true
        }
    },
    {
        path: '/city',
        name: 'City',
        component: () =>
            import ('../views/City.vue'),
        meta: {
            keep: true
        }
    },
    {
        path: '/list',
        name: 'List',
        component: () =>
            import ('../views/List.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/films',
        name: 'Films',
        component: () =>
            import ('../views/Films.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/atlis',
        name: 'Atlis',
        component: () =>
            import ('../views/Atlis.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/movie',
        name: 'Movie',
        component: () =>
            import ('../views/Movie.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/order',
        name: 'Order',
        component: () =>
            import ('../views/Order.vue'),
        meta: {
            keep: true,
            next: true
        }
    },
    {
        path: '/yhq',
        name: 'Yhq',
        component: () =>
            import ('../views/Yhq.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/yh',
        name: 'Yh',
        component: () =>
            import ('../views/Yh.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/pyk',
        name: 'Pyk',
        component: () =>
            import ('../views/Pyk.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/shop',
        name: 'Shop',
        component: () =>
            import ('../views/Shop.vue'),
        meta: {
            keep: true
        }
    },
    {
        path: '/shopxq',
        name: 'Shopxq',
        component: () =>
            import ('../views/Shopxq.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/shopxz',
        name: 'Shopxz',
        component: () =>
            import ('../views/Shopxz.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/yhq2',
        name: 'Yhq2',
        component: () =>
            import ('../views/Yhq2.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/djq2',
        name: 'Djq2',
        component: () =>
            import ('../views/Djq2.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/pykxq',
        name: 'Pykxq',
        component: () =>
            import ('../views/Pykxq.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/pay',
        name: 'Pay',
        component: () =>
            import ('../views/Pay.vue'),
        meta: {
            keep: false,
            next: true
        }
    },
    {
        path: '/xyk',
        name: 'Xyk',
        component: () =>
            import ('../views/Xyk.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/xyk2',
        name: 'Xyk2',
        component: () =>
            import ('../views/Xyk2.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/cgv',
        name: 'Cgv',
        component: () =>
            import ('../views/Cgv.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/mall',
        name: 'Mall',
        component: () =>
            import ('../views/Mall.vue'),
        meta: {
            keep: true
        }
    },
    {
        path: '/gkxz',
        name: 'Gkxz',
        component: () =>
            import ('../views/Gkxz.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/orders',
        name: 'Orders',
        component: () =>
            import ('../views/Orders.vue'),
        meta: {
            keep: true,
            next: true
        }
    },
    {
        path: '/shopyhq',
        name: 'Shopyhq',
        component: () =>
            import ('../views/Shopyhq.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/wode',
        name: 'Wode',
        component: () =>
            import ('../views/Wode.vue'),
        meta: {
            keep: true
        }
    },
    {
        path: '/code',
        name: 'Code',
        component: () =>
            import ('../views/Code.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/info',
        name: 'Info',
        component: () =>
            import ('../views/Info.vue'),
        meta: {
            keep: false,
            next: true
        }
    },
    {
        path: '/vip',
        name: 'Vip',
        component: () =>
            import ('../views/Vip.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/jf',
        name: 'Jf',
        component: () =>
            import ('../views/Jf.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/jfxq',
        name: 'Jfxq',
        component: () =>
            import ('../views/Jfxq.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/jfgz',
        name: 'Jfgz',
        component: () =>
            import ('../views/Jfgz.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/dd',
        name: 'Dd',
        component: () =>
            import ('../views/Dd.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/love',
        name: 'Love',
        component: () =>
            import ('../views/Love.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/cy',
        name: 'Cy',
        component: () =>
            import ('../views/Cy.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/cy2',
        name: 'Cy2',
        component: () =>
            import ('../views/Cy2.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/kf',
        name: 'Kf',
        component: () =>
            import ('../views/Kf.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/regin',
        name: 'Regin',
        component: () =>
            import ('../views/Regin.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/one',
        name: 'One',
        component: () =>
            import ('../views/One.vue'),
        meta: {
            keep: false
        }
    },
    {
        path: '/two',
        name: 'Two',
        component: () =>
            import ('../views/Two.vue'),
        meta: {
            keep: false
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    let uid = localStorage.getItem('uid')
    if (to.meta.next) {
        if (token && uid) {
            next()
        } else {
            Toast('请先登录')
            router.replace('/login')
        }
    } else {
        next()
    }
})

export default router