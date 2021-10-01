import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: 'none',
    pseudo: '',
    moderator: ''
  },
  mutations: {
    GET_USER_INFO(state){
      let user = sessionStorage.getItem('user-info')
      if(user){
        state.userId = JSON.parse(user).userId
        state.pseudo = JSON.parse(user).pseudo
        state.moderator = JSON.parse(user).moderator
      }
    }
  },
  actions: {
    getUserInfo(context){
      context.commit('GET_USER_INFO')
    }
  },
  modules: {

  }
})
