import { createStore } from 'vuex'

export default createStore({
  state: {
    user_id: 'none',
    email:'',
    pseudo: '',
    moderator: '',
    token:'',
    url_image:''
  },
  mutations: {
    GET_USER_INFO(state){
      let user = sessionStorage.getItem('user-info');
      let avatar = sessionStorage.getItem('user-avatar')
      if(user){
        state.user_id = JSON.parse(user).user_id
        state.email = JSON.parse(user).email
        state.pseudo = JSON.parse(user).pseudo
        state.moderator = JSON.parse(user).moderator
        state.token = JSON.parse(user).token
        if(avatar){
          state.url_image = JSON.parse(avatar)
        }else{
          state.url_image = JSON.parse(user).url_image
        }
      }
    },
    LOGOUT(state){
      state.user_id = 'none'
      state.email = ''
      state.pseudo = ''
      state.moderator = ''
      state.token = ''
      state.url_image= ''
    }
  },
  actions: {
    getUserInfo(context){
      context.commit('GET_USER_INFO')
    },
    logout(context){
      context.commit('LOGOUT')
    }
  },
  modules: {

  }
})
