// state、(state, data) 的 state = user module 的 state = 目前這個 module 的 state
// this.state = vuex root state = store 最外層 index 裡的 state
// this.state.module名 = 其他 module 的 state
// data 代表要進來的資料
export const login = (state, data) => {
  // 去翻後台 login 功能會導入 password、token 以外的資料
  state.token = data.token
  state.account = data.account
  state.role = data.role
  state.email = data.email
  state.cart = data.cart
  state.name = data.name
  state.phone = data.phone
  state.followTag = data.followTag
}

export const logout = (state, data) => {
  state.token = ''
  state.account = ''
  state.role = 0
  state.email = ''
  state.cart = []
  state.name = ''
  state.phone = ''
  state.followTag = []
}

export const getInfo = (state, data) => {
  state.account = data.account
  state.role = data.role
  state.email = data.email
  state.cart = data.cart
  state.name = data.name
  state.phone = data.phone
  state.followTag = data.followTag
}

export const extend = (state, data) => {
  state.token = data
}
