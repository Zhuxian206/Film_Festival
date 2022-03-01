<template lang="pug">
h3.text-center.mt-5 所有消息
  b-table(:items="news" :fields='fields' ref='table')
</template>

<script>
export default {
  data () {
    return {
      news: []
    }
  },

  async createdNews () {
    try {
      const { data } = await this.api.get('/news')
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
