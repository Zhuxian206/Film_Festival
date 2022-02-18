export const user = (state) => {
  return {
    // account 改 token，這樣就不會進到登入頁
    // 但會跑到首頁
    isLogin: state.token.length > 0,
    isAdmin: state.role === 1,
    ...state
  }
}
