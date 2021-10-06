<template>
  <div class="home">
    <NavMenu />
  </div>
  <p>{{user_id}}</p>
</template>

<script>
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue'
//import Post from '@/components/Post.vue'
import {mapState} from 'vuex'



export default {
  name: 'Home',
  components: {
    NavMenu,
//    Post
  },
  computed: {
        ...mapState([
            'user_id',
            'moderator',
            'pseudo'
            ])
  },
  mounted(){
    if(this.user_id == 'none'){
        this.$router.push({name:'Login'})
      }
  }
}

</script>
