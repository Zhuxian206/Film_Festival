<template lang="pug">
b-container#admin.mt-5
  b-row
    b-col(cols='12')
      b-nav(tabs align="center")
        b-nav-item(to='/admin/movies' exact exact-active-class='active') 片單管理
        b-nav-item(to='/admin/news' exact exact-active-class='active') 消息管理
        b-nav-item(to='/admin/bookings' exact exact-active-class='active') 場次管理
        b-nav-item(to='/admin/orders' exact exact-active-class='active') 訂單管理
    b-col(cols='12')
      router-view
</template>
