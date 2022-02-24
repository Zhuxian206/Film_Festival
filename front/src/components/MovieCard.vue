<template lang="pug">
b-card.card-movie(img-top :img-src='movie.image')
  b-card-body
    b-card-title
      router-link(:to='"/movie/" + movie._id') {{ movie.name }}
    b-card-sub-title 導演 {{ movie.director }}
    b-card-text(style='white-space: pre') {{ movie.description }}
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
}
</script>
