<template lang="pug">
b-container#newsPage.mt-5
  b-row
    b-col(cols='12')
      b-nav(tabs align="center")
        b-nav-item(to='/newsPage/all' exact exact-active-class='active') 所有消息
        b-nav-item(to='/newsPage/news' exact exact-active-class='active') 新聞
        b-nav-item(to='/newsPage/announcement' exact exact-active-class='active') 公告
        b-nav-item(to='/newsPage/promote' exact exact-active-class='active') 推廣
        b-nav-item(to='/newsPage/other' exact exact-active-class='active') 其他
    b-col(cols='12')
      router-view
</template>
