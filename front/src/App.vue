<template lang="pug">
#app
  b-navbar(toggleable='lg' type='dark' variant='dark')
    b-navbar-brand(to='/') 天空影展
    b-navbar-toggle(target='nav-collapse')
    b-collapse#nav-collapse(is-nav)
      b-navbar-nav.ml-auto
        b-nav-item(to='/#') 關於影展
        b-nav-item(to='/moviesPage') 片單欣賞
        b-nav-item(to='/screenings') 時間場次
        b-nav-item(to='/questions') 常見問題
        b-nav-item(to='/newsPage') 最新消息

        b-nav-item(v-if="!user.isLogin" to='/register') 註冊
        b-nav-item(v-if="!user.isLogin" to='/login') 登入
        b-nav-item(v-if="user.isLogin" @click="logout") 登出
        b-nav-item(v-if="user.isLogin && user.isAdmin" to='/admin') 管理中心
        b-nav-item(v-if="user.isLogin && !user.isAdmin" to='/user') 會員中心
  router-view(:key='$route.fullPath')
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    }
  },
  async created () {
    this.$store.dispatch('user/getInfo')
  }
}
</script>
