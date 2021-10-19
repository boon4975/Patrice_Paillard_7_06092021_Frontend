<template>
    <NavMenu />
    <div class="post"><h1>Envie de jaser ?</h1></div>
    <div class="post__new">
        <button class="btn btn-primary" @click="addPost(0)">Nouvelle publication <i class="fas fa-feather"></i></button>
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
        :date="item.updatedAt"
        />
<!-- -->
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import Post from '../components/Post.vue'
import {mapState} from 'vuex'
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
    computed:{
        ...mapState([
            'user_id',
            'moderator',
            'pseudo',
            'token',
            'url_image'
            ])
    },
    methods: {
        async getAllPosts(){
            try{
                let getposts = await axios.get(`http://${env.host}:${env.port}/api/allpost`,
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
        addPost(value){
            let topicInfo = {
                'id': value,
                'new': true,
                'type':'post',
                'urlimage':''
            }
            sessionStorage.setItem('topicInfo', JSON.stringify(topicInfo))
            this.$router.push({name:'EditTopic'})
        }  
    },
    mounted(){
        this.getAllPosts()
    }
}
</script>