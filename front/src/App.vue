<template lang="pug">
#app
  b-navbar(toggleable='lg' type='dark' variant='dark')
    b-navbar-brand(to='/') 影展
    b-navbar-toggle(target='nav-collapse')
    b-collapse#nav-collapse(is-nav)
      b-navbar-nav.ml-auto
        b-nav-item(v-if="!user.isLogin" to='/register') 註冊
        b-nav-item(v-if="!user.isLogin" to='/login') 登入
        b-nav-item(v-if="user.isLogin" @click="logout") 登出
        b-nav-item(v-if="user.isLogin && user.isAdmin" to='/admin') 管理中心
  router-view
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
