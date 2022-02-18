import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '天空影展'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      title: '註冊 | 天空影展'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: '登入 | 天空影展'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    children: [
      {
        // path 是空的就是代表admin
        path: '',
        name: 'AdminHome',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminHome.vue'),
        meta: {
          login: true,
          admin: true,
          title: '管理中心 | 天空影展'
        }
      },
      {
        path: 'bookings',
        name: 'AdminBookings',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminBookings.vue'),
        meta: {
          login: true,
          admin: true,
          title: '場次管理 | 天空影展'
        }
      },
      {
        path: 'movies',
        name: 'AdminMovies',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminMovies.vue'),
        meta: {
          login: true,
          admin: true,
          title: '片單管理 | 天空影展'
        }
      },
      {
        path: 'news',
        name: 'AdminNews',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminNews.vue'),
        meta: {
          login: true,
          admin: true,
          title: '消息管理 | 天空影展'
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminOrders.vue'),
        meta: {
          login: true,
          admin: true,
          title: '訂單管理 | 天空影展'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守衛，時機: 在進到每一頁之前
router.beforeEach((to, from, next) => {
  const user = store.getters['user/user']
  // 到需登入頁面 而且使用者的登入狀態為false的話
  if (to.meta.login && !user.isLogin) {
    // 把他丟到login頁面
    next('/login')
    // 到管理頁面 但不是管理員
  } else if (to.meta.admin && !user.isAdmin) {
    // 把他丟到首頁
    next('/')
  } else {
    // 空的代表要去哪就去哪
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
