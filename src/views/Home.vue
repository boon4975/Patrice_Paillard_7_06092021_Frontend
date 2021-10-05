<template>
  <div class="home">
    <NavMenu />
  </div>
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
            'userId',
            'moderator',
            'pseudo'
            ])
  }
}

</script>
