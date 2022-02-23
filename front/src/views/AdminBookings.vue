<template lang="pug">
#adminBooking
  b-btn(variant='dark' v-b-modal.modal-booking) 新增
  b-table
  b-modal#modal-booking(
    :title='form._id.length > 0'
  )
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        date: '',
        price: 0,
        time: '',
        sell: false,
        _id: ''
      }
    }
  }
}
</script>
