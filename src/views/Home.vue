<template>
  <div class="home">
    <NavMenu />
  </div>
    <Post class="post"
          v-for="item of posts"
          :key="item.id"
          :title="item.title"
          :message="item.message"
          :user="item.user"
          :owner="item.user.id"
          :postId="item.id"
          :comments="item.comments"
          :urlimage="item.url_image"
          />
</template>

<script>
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue'
import Post from '@/components/Post.vue'
import {mapState} from 'vuex'
import axios from 'axios';
import env from '../env';



export default {
  name: 'Home',
  components: {
    NavMenu,
    Post
  },
  data(){
    return {
      posts:''
    }
  },
  computed: {
        ...mapState([
            'user_id',
            'moderator',
            'pseudo',
            'token'
            ])
  },
  methods: {
    async getLastPosts(){
            try{
                let getposts = await axios.get(`http://${env.host}:${env.port}/api/lastpost`,
                    {
                        headers: {Authorization : `Bearer ${this.token}`}
                    },
                    {});
                this.posts = getposts.data
            }
            catch (error) {
                if(error.response.request.status == 401){
                   sessionStorage.removeItem('user-info')
                }
            }
            finally {
                let user = sessionStorage.getItem('user-info')
                if(user == null){
                    alert('Votre session a expiré. Veuillez vous reconnecter')
                    this.$router.push({name:'Login'})
                }
            }
        },
  },
  mounted(){
    if(this.user_id == 'none'){
        this.$router.push({name:'Login'})
    }else{
        this.getLastPosts()
    }
  }
}

</script>
