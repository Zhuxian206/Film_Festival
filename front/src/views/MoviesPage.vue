<template lang="pug">
div#movies
  b-carousel#carousel-1(v-model='slide', :interval='4000', controls='', indicators='', background='#ababab', img-width='1024', img-height='480', style='text-shadow: 1px 1px 2px #333;', @sliding-start='onSlideStart', @sliding-end='onSlideEnd')
    b-carousel-slide(caption='First slide', text='Nulla vitae elit libero, a pharetra augue mollis interdum.', img-src='https://picsum.photos/1024/480/?image=52')
    b-carousel-slide(img-src='https://picsum.photos/1024/480/?image=54')
      h1 Hello world!
    b-carousel-slide(img-src='https://picsum.photos/1024/480/?image=58')
    b-carousel-slide
      template(#img)
        img.d-block.img-fluid.w-100(width='1024', height='480', src='https://picsum.photos/1024/480/?image=55', alt='image slot')
    b-carousel-slide(caption='Blank Image', img-blank='', img-alt='Blank image')
      p
        | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
        | a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
  p.mt-4
    | Slide #: {{ slide }}
    br
    |       Sliding: {{ sliding }}

  b-container
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
