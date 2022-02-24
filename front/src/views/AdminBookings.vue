<template lang="pug">
#adminBooking
  b-btn(variant='dark' v-b-modal.modal-booking) 新增
  b-table
  b-modal#modal-booking(
    :title="form._id.length > 0 ? '編輯商品' : '新增商品'"
    centered
    ok-variant='success'
    ok-title='送出'
    cancel-variant='danger'
    cancel-title='取消'
    @ok="submitModal"
    @hidden="resetForm"
    :ok-disabled="modalSubmitting"
    :cancel-disabled="modalSubmitting"
  )

    b-form-group(
      label='放映日期'
      label-for='input-date'
      description='必填欄位'
      invalid-feedback='日期必填'
      :state='state.date'
    )
      b-form-datepicker#input-date(
        v-model='form.date'
        required
        placeholder='請選擇放映日期'
      )

    b-form-group(
      label='場次'
      label-for='input-time'
      description='必填欄位'
      invalid-feedback='場次必填'
      :state='state.time'
    )
      b-form-select#input-time(
        v-model='form.time'
        required
        :options="times"
        placeholder='請選擇場次'
        :state='state.time'
      )
    b-form-group(
      label='票價'
      label-for='input-price'
      description='必填欄位'
      invalid-feedback='價格必須是 0 元以上'
      :state='state.price'
    )
      b-form-input#input-price(
        v-model.number='form.price'
        type='number'
        min='0'
        required
        placeholder='請輸入票價'
        :state='state.price'
      )
    b-form-group(label='上架')
      b-form-radio(v-model='form.sell' :value='true') 上架
      b-form-radio(v-model='form.sell' :value='false') 下架
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'date', label: '放映日' },
        { key: 'price', label: '票價' },
        { key: 'time', label: '場次' },
        { key: 'sell', label: '上架' },
        { key: 'action', label: '操作' }
      ],
      times: [
        { text: '請選擇場次', value: '' },
        '上午場', '下午場'
      ],
      bookings: [],
      modalSubmitting: false,
      form: {
        date: '',
        price: 0,
        time: '',
        sell: false,
        _id: '',
        index: -1
      }
    }
  },
  computed: {
    state () {
      return {
        price: this.form.price === null ? null : this.form.price >= 0,
        date: this.form.date.length === 0 ? null : true,
        time: this.form.time.length === 0 ? null : true
      }
    }
  },
  methods: {
    async submitModal (event) {
      event.preventDefault()
      if (!this.state.price || !this.state.date || !this.state.time) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必填欄位'
        })
        return
      }
      this.modalSubmitting = true

      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          fd.append(key, this.form[key])
        }
      }

      try {
        if (this.form._id.length === 0) {
          const { data } = await this.api.post('/bookings', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.bookings.push(data.result)
        } else {
          const { data } = await this.api.patch('/bookings/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.bookings[this.form.index] = { ...this.form, image: data.result.image }
          this.$refs.table.refresh()
        }

        this.$bvModal.hide('modal-booking')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }

      this.modalSubmitting = false
    },
    resetForm (event) {
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.form = {
        name: '',
        description: '',
        image: '',
        director: '',
        directorDesc: '',
        upState: false,
        _id: ''
      }
    },
    editbooking (index) {
      this.form = { ...this.bookings[index], image: null, index }
      this.$bvModal.show('modal-booking')
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/bookings/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.bookings = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>
