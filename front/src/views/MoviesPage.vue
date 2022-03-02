<template lang="pug">
div#movies
  b-carousel#carousel-1(v-model='slide', :interval='4000', controls='', indicators='', background='#ababab', img-width='1024', img-height='480', style='text-shadow: 1px 1px 2px #333;', @sliding-start='onSlideStart', @sliding-end='onSlideEnd')
    b-carousel-slide(img-src='https://picsum.photos/1024/480/?image=58')
      h2 天晴有時 Whether the Weather Is Fine

  b-container.pt-5
    b-row
      b-col(cols='12' md='6' v-for='movie in movies' :key='movie._id')
        MovieCard(:movie='movie')
</template>

<script>
import MovieCard from '../components/MovieCard.vue'

export default {
  components: {
    MovieCard
  },
  data () {
    return {
      movies: [],
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
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
