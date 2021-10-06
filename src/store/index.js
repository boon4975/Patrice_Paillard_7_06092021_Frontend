import { createStore } from 'vuex'

export default createStore({
  state: {
    user_id: 'none',
    email:'',
    pseudo: '',
    moderator: '',
    token:''
  },
  mutations: {
    GET_USER_INFO(state){
      let user = sessionStorage.getItem('user-info')
      if(user){
        state.user_id = JSON.parse(user).user_id
        state.email = JSON.parse(user).email
        state.pseudo = JSON.parse(user).pseudo
        state.moderator = JSON.parse(user).moderator
        state.token = JSON.parse(user).token
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
