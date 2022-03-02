<template lang="pug">
#adminletter
  b-table(:items="letters" :fields='fields' ref='table')
    template(#cell(image)='data')
      img(v-if='data.item.image' :src='data.item.image' style='height: 50px')
    template(#cell(date)='data')
      | {{ new Date(data.item.date).toLocaleString('zh-tw') }}
    template(#cell(upState)='data')
      b-icon(v-if='data.item.upState' icon="arrow-bar-up")
    template(#cell(action)='data')
      b-btn(variant='dark' @click='editLetters(data.index)')
        b-icon(icon="brush")
  b-modal#modal-letter(
    :title="form._id.length > 0 ? '編輯消息' : '新增消息'"
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
      label='標題'
      label-for='input-name'
      description='必填欄位'
      invalid-feedback='標題必填'
      :state='state.name'
    )
      b-form-input#input-name(
        v-model='form.name'
        type='text'
        required
        placeholder='請輸入標題'
        :state='state.name'
      )
    b-form-group(
      label='消息分類'
      label-for='input-category'
      description='必填欄位'
      invalid-feedback='分類必填'
      :state='state.category'
    )
      b-form-select#input-category(
        v-model='form.category'
        required
        :options="categories"
        placeholder='請選擇分類'
        :state='state.category'
      )
    b-form-group(
      label='內文'
      label-for='input-description'
      description='必填欄位'
      invalid-feedback='內文必填'
      :state='state.description'
    )
      b-form-textarea#input-description(
        v-model='form.description'
        required
        rows="3"
        max-rows="6"
        placeholder='請輸入內文'
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
  b-btn.my-3.w-25.rounded-pill(variant='dark' v-b-modal.modal-letter) 新增消息
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'image', label: '' },
        { key: 'name', label: '標題' },
        { key: 'date', label: '日期' },
        { key: 'category', label: '分類' },
        { key: 'upState', label: '上架' },
        { key: 'action', label: '操作' }
      ],
      letters: [],
      modalSubmitting: false,
      categories: [
        { text: '請選擇分類', value: '' },
        '新聞', '公告', '推廣', '其他'
      ],
      form: {
        name: '',
        description: '',
        image: '',
        category: '',
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
        category: this.form.category.length === 0 ? null : true
      }
    }
  },
  methods: {
    async submitModal (event) {
      event.preventDefault()
      if (!this.state.name || !this.state.description || !this.state.category) {
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
          const { data } = await this.api.post('/letters', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.letters.push(data.result)
        } else {
          const { data } = await this.api.patch('/letters/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.letters[this.form.index] = { ...this.form, image: data.result.image }
          this.$refs.table.refresh()
        }

        this.$bvModal.hide('modal-letter')
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
        category: '',
        upState: false,
        _id: ''
      }
    },
    editLetters (index) {
      this.form = { ...this.letters[index], image: null, index }
      this.$bvModal.show('modal-letter')
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/letters/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.letters = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得消息失敗'
      })
    }
  }
}
</script>
