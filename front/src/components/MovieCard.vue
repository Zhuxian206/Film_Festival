<template>
  <div calss="card-movie">
    <img :src="movie.image" style="width:450px; height:300px" >
      <router-link :to='"/movie/" + movie._id'>
        <h3> {{ movie.name }}</h3>
      </router-link>
    <p>導演 {{ movie.director }}</p>
  </div>
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
