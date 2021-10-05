<template>
    <NavMenu />
    <div class="subnav">
        <button class="btn btn-primary" @click="this.$router.push({name:'NewPost'})">Nouvelle publication <i class="fas fa-feather"></i></button>
    </div>
    <Post
        v-for="item of posts"
        :key="item.id"
        :title="item.title"
        :message="item.message"
        :user="item.user"
        />
<!-- -->
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import Post from '../components/Post.vue'
import axios from 'axios';
import env from '../env';

export default {
    name: 'Posts',
    components: {
        Post,
        NavMenu
    },
    data(){
        return{
            posts: ''
        }
    },
    methods: {
        async getAllPosts(){
            let getposts = await axios.get(`http://${env.host}:${env.port}/api/post`)
            this.posts = getposts.data
        }
    },
    mounted(){
        this.getAllPosts()
    }
}
</script>