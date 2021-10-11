<template>
    <NavMenu />
    <div class="container">
        <form class="formfield w-100 py-3">
            <label for="Titre de la publication">Titre de la publication</label>
            <input type="text" name="Titre de la publication" v-model="title" class="form-control" maxlength="49">
            <label for="Message">Votre texte</label>
            <textarea name="Message" v-model="message" cols="30" rows="10" class="form-control"></textarea>
        </form>
        <button class="btn btn-primary" v-if="this.new" @click="addpost()">Publier</button>
        <button class="btn btn-primary mx-2" v-if="!this.new" @click="updatePost(currentPost)">Modifier la publication</button>
        <button class="btn btn-outline-danger mx-2" v-if="!this.new" data-toggle="modal" data-target="#popup">Supprimer</button>
    </div>
    <p class="formfield__err">{{ msgerr }}</p>
    <div id="popup" class="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    confirmez la suppression
                    <br/>de la publication /!\
                    <br/>et des commentaires associés /!\
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-danger" data-dismiss="modal" @click="delPost(currentPost)">Supprimer</button>
                    <button class="btn btn-outline-primary" data-dismiss="modal">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import axios from 'axios';
import env from '../env';
import {mapState} from 'vuex'
export default {
    name: 'EditPost',
    components: {
        NavMenu
    },
    computed: {
        ...mapState([
            'user_id',
            'email',
            'moderator',
            'pseudo',
            'token',
            'currentPost'
            ])
    },
    data(){
        return {
            title: '',
            message: '',
            msgerr:'',
            new:false
        }
    },
    methods: {
        async getOnePost(id){
            let result = await axios.get(`http://${env.host}:${env.port}/api/post/${id}`)
            if(result.status == 200){
               this.title = result.data.title
               this.message = result.data.message
               this.currentPost = id
            }else{
                this.msgerr = 'problème avec la publication'
            }
        },
        async addpost(){
            let result = await axios.post(`http://${env.host}:${env.port}/api/post`,
            {
                title: this.title,
                message: this.message,
                user_id: this.user_id
            })
            if(result.status == 201){
                this.$router.push({name: 'Posts'})
            }else{
                this.msgerr = 'problème lors de la publication'
            }
        },
        async updatePost(id){
            let result = await axios.put(`http://${env.host}:${env.port}/api/post`,
            {
                postId: id,
                title: this.title,
                message: this.message,
            })
            if(result.status == 201){
                this.$router.push({name: 'Posts'})
            }else{
                alert('erreur lors update')
            }
        },
        async delPost(id){
            let post = await axios.delete(`http://${env.host}:${env.port}/api/post/${id}`,
            {
                    headers: {Authorization : `Bearer ${this.token}`}
                },{});
            if(post.status == 201 ){
                sessionStorage.clear();
                this.$router.push({name:'Posts'})
            }else{
                this.msgerr = post.data;
            }
        }
    },
    created(){
        let postInfo = JSON.parse(sessionStorage.getItem('postInfo'))
        if(postInfo.id > 0){
            this.getOnePost(postInfo.id)
            this.new = postInfo.new
        }else{
            this.new = postInfo.new
        }
        
    }
}
</script>

<style lang="scss" scoped>

</style>