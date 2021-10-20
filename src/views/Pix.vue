<template>
    <NavMenu />
    <div class="post"><h1>&Agrave; travers l'objectif</h1></div>
    <div class="post__new">
        <button class="btn btn-primary" @click="addPix(0)">Nouvelle publication <i class="fas fa-feather"></i></button>
    </div>
    <Post class="post"
        v-for="item of pix"
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
    name: 'Pix',
    components: {
        Post,
        NavMenu
    },
    data(){
        return{
            pix: ''
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
        async getAllPix(){
            try{
                let getpix = await axios.get(`http://${env.host}:${env.port}/api/allpix`,
                    {
                        headers: {Authorization : `Bearer ${this.token}`}
                    },
                    {});
                this.pix = getpix.data
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
        addPix(value){
            let topicInfo = {
                'id': value,
                'new': true,
                'type':'pix',
                'urlimage':''
            }
            sessionStorage.setItem('topicInfo', JSON.stringify(topicInfo))
            this.$router.push({name:'EditTopic'})
        }  
    },
    // récupère la list des PIX
    mounted(){
        this.getAllPix()
    }
}
</script>