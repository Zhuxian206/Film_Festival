<template lang="pug">
b-container#movie
  b-overlay(:show='!upState')
    template(#overlay)
      h1 影片已下架
    b-row.mt-5
      b-col(cols='12')
        img.w-100(:src='image')
        b-col(cols='6')
        h1 {{ name }}
        p(style='white-space: pre') {{ description }}
        b-col(cols='6')
        h3 {{ director }}
        p {{ directorDesc }}
</template>
<script>
export default {
  data () {
    return {
      name: '',
      description: '',
      image: '',
      director: '',
      directorDesc: '',
      upState: false,
      booking: ''
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/movies/' + this.$route.params.id)

      this.name = data.result.name
      this.description = data.result.description
      this.image = data.result.image
      this.director = data.result.director
      this.directorDesc = data.result.directorDesc
      this.upState = data.result.upState
      this.booking = data.result.booking

      document.title = `${this.name} | 天空影展`
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
