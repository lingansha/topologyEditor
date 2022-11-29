import {Login} from '@/api/login.js'
const common = {
  state: {
    userInfo: {},
  },
  actions:{
    login({commit}, data){
      return new Promise((resolve)=>{
        Login(data).then(res=>{
          if(res.code==200){
            localStorage.setItem('userInfo',JSON.stringify(res.data))
            commit('SET_LOGIN', res.data);
          }
          resolve(res)
        })
      })
    }
  },
  mutations: {
    SET_LOGIN: (state, data) => {
      state.userInfo = data
    },
  }
}
export default common
