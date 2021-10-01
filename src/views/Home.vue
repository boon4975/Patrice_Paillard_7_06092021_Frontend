<template>
  <div class="home">
    <NavMenu />
    <Post />
  </div>
</template>

<script>
// @ is an alias to /src
//import {mapState} from 'vuex'
import NavMenu from '@/components/NavMenu.vue'
import Post from '@/components/Post.vue'
import {mapState} from 'vuex'


export default {
  name: 'Home',
  components: {
    NavMenu,
    Post
  },
  computed: {
        ...mapState([
            'userId',
            'moderator',
            'pseudo'
            ])
  },
  methods:{
    async getUserInfo(){
      await this.$store.dispatch('getUserInfo')
      if(this.userId == 'none'){
        this.$router.push({name:'Login'})
      }
    }
  },
  beforeMount(){
    this.getUserInfo()
  }
}

</script>
