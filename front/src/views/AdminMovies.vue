<template lang="pug">
#adminmovie
  b-btn.my-3(variant='dark' v-b-modal.modal-movie) 新增
  b-table(:items="movies" :fields='fields' ref='table')
    template(#cell(image)='data')
      img(v-if='data.item.image' :src='data.item.image' style='height: 50px')
    template(#cell(upState)='data')
      | {{ data.item.upState ? 'v' : '' }}
    template(#cell(action)='data')
      b-btn(variant='success' @click='editMovie(data.index)') 編輯
  b-modal#modal-movie(
    :title="form._id.length > 0 ? '編輯影片' : '新增影片'"
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
      label='電影名稱'
      label-for='input-name'
      description='必填欄位'
      invalid-feedback='電影名稱必填'
      :state='state.name'
    )
      b-form-input#input-name(
        v-model='form.name'
        type='text'
        required
        placeholder='請輸入電影名稱'
        :state='state.name'
      )
    b-form-group(
      label='影片說明'
      label-for='input-description'
      description='必填欄位'
      invalid-feedback='影片說明必填'
      :state='state.description'
    )
      b-form-textarea#input-description(
        v-model='form.description'
        rows="3"
        max-rows="6"
        required
        placeholder='請輸入影片說明'
        :state='state.description'
      )
    b-form-group(
      label='導演名稱'
      label-for='input-director'
      description='必填欄位'
      invalid-feedback='導演名稱必填'
      :state='state.director'
    )
      b-form-input#input-director(
        v-model='form.director'
        type='text'
        required
        placeholder='請輸入導演名稱'
        :state='state.director'
      )
    b-form-group(
      label='導演介紹'
      label-for='input-directorDesc'
      description='請輸入導演介紹文字(選填)'
      :state='state.directorDesc'
    )
      b-form-textarea#input-directorDesc(
        v-model='form.directorDesc'
        rows="3"
        max-rows="6"
        placeholder='請輸入導演介紹'
        :state='state.directorDesc'
      )
    b-form-group(label='上架')
      b-form-radio(v-model='form.upState' :value='true') 上架
      b-form-radio(v-model='form.upState' :value='false') 下架

    img-inputer(
      accept="image/*"
      v-model="form.image"
      theme="light"
      size="large"
      bottom-text="點選或拖拽圖片以修改"
      hover-text="點選或拖拽圖片以修改"
      placeholder="點選或拖拽選擇圖片"
      :max-size="1024"
      exceed-size-text="檔案大小不能超過"
    )
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'image', label: '' },
        { key: 'name', label: '片名' },
        { key: 'director', label: '導演' },
        { key: 'upState', label: '上架' },
        { key: 'action', label: '操作' }
      ],
      movies: [],
      modalSubmitting: false,
      form: {
        name: '',
        description: '',
        image: '',
        director: '',
        directorDesc: '',
        upState: false,
        _id: '',
        index: -1
      }
    }
  },
  computed: {
    state () {
      return {
        name: this.form.name.length === 0 ? null : true,
        description: this.form.description.length === 0 ? null : true,
        director: this.form.director.length === 0 ? null : true
      }
    }
  },
  methods: {
    async submitModal (event) {
      event.preventDefault()
      if (!this.state.name || !this.state.description || !this.state.director) {
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
          const { data } = await this.api.post('/movies', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.movies.push(data.result)
        } else {
          const { data } = await this.api.patch('/movies/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.movies[this.form.index] = { ...this.form, image: data.result.image }
          this.$refs.table.refresh()
        }

        this.$bvModal.hide('modal-movie')
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
    editMovie (index) {
      this.form = { ...this.movies[index], image: null, index }
      this.$bvModal.show('modal-movie')
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/movies/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.movies = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得影片失敗'
      })
    }
  }
}
</script>
