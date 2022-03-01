<template lang="pug">
b-container#user.mt-5
  b-row
    b-col(cols='12')
      b-nav(tabs align="center")
        b-nav-item(to='/user/data' exact exact-active-class='active') 會員資料
        b-nav-item(to='/user/order' exact exact-active-class='active') 歷史訂單
    b-col(cols='12')
      router-view
</template>
