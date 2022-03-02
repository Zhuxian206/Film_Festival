<template lang="pug">
#home
  video.w-100(autoplay='', muted='', loop='')
    source(src='../assets/pexels-naga-sumanth-l-5512078.mp4', type='video/mp4')
  .toptittle
    p 天
    p 空
    p 影
    p 展
  .container
    h2.home_title 最新消息
    hr
    b-row
      b-col(cols='12' md='6' v-for="neww in news" :key='neww._id' :to='"/neww/" + neww._id')

    h2.home_title 新片推薦
    hr
  .row.p-3
    b-col.p-0(cols='12' md='6' v-for="(movie, index) in movies" :key='movie._id' :to='"/movie/" + movie._id')
      b-card.card-st(overlay='',
      :img-src='movie.image',
      img-alt='Card Image',
      text-variant='white',
      :title='movie.name',
      :sub-title='movie.director'
      :to='"/movie/" + movie._id',
      )
        router-link(:to='"/movie/" + movie._id') 查看詳情

</template>

<script>
export default {
  data () {
    return {
      movies: [],
      news: []
    }
  },

  async created () {
    try {
      const { data } = await this.api.get('/movies')
      this.movies = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '片單取得失敗'
      })
    }
  }
}
</script>
