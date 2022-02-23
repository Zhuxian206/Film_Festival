<template lang="pug">
b-container
  b-row
    b-col(cols='12' md='6' lg='3'  v-for='movie in movies' :key='movie._id')
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
      products: []
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/movies')
      this.products = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '商品取得失敗'
      })
    }
  }
}
</script>
