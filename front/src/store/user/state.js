export default () => {
  // 使用者要儲存哪些東西到vuex裡面
  // vuex只能存特定的資料
  return {
    token: '',
    account: '',
    role: 0,
    email: '',
    cart: [],
    name: '',
    phone: '',
    followTag: []
  }
}
