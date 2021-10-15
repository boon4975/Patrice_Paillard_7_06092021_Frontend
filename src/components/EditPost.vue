<template>
    <NavMenu />
    <div class="container">
        <form class="formfield w-100 py-3">
            <label for="Titre de la publication">Titre de la publication</label>
            <input type="text" id="Titre de la publication" v-model="title" class="form-control" maxlength="49">
            <label for="Message">Votre texte</label>
            <textarea id="Message" v-model="message" cols="30" rows="10" class="form-control"></textarea>
        </form>
        <button class="btn btn-primary" v-if="this.postInfo.new" @click="addpost()">Publier</button>
        <button class="btn btn-primary m-2" v-if="!this.postInfo.new" @click="updatePost(this.postInfo.id)">Modifier la publication</button>
        <button class="btn btn-outline-danger m-2" v-if="!this.postInfo.new" data-toggle="modal" data-target="#popup">Supprimer</button>
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
                    <button class="btn btn-outline-danger" data-dismiss="modal" @click="delPost(this.postInfo.id)">Supprimer</button>
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
            ])
    },
    data(){
        return {
            title: '',
            message: '',
            msgerr:'',
            postInfo:''
        }
    },
    methods: {
        async getOnePost(id){
            try{
                let result = await axios.get(`http://${env.host}:${env.port}/api/post/${id}`,
                    {
                        headers: {Authorization : `Bearer ${this.token}`}
                    },
                    {}
                )
                if(result.status == 200){
                this.title = result.data.title
                this.message = result.data.message
                }else{
                    this.msgerr = 'problème avec la publication'
                }
            }
            catch (error) {
                if(error.response.request.status == 401){
                   sessionStorage.removeItem('user-info')
                }
            }
            finally {
                let user = sessionStorage.getItem('user-info')
                if(!user){
                    alert('Votre session a expiré. Veuillez vous reconnecter')
                    this.$router.push({name:'Login'})
                }
            }
        },
        async addpost(){
            try{
                let result = await axios.post(`http://${env.host}:${env.port}/api/post`,
                    {
                        title: this.title,
                        message: this.message,
                        user_id: this.user_id
                    },
                    {
                        headers: {Authorization : `Bearer ${this.token}`}
                    },
                    {}
                )
                if(result.status == 201){
                    this.$router.push({name: 'Posts'})
                }else{
                    this.msgerr = 'problème lors de la publication'
                }
            }
            catch (error) {
                if(error.response.request.status == 401){
                   sessionStorage.removeItem('user-info')
                }
            }
            finally {
                let user = sessionStorage.getItem('user-info')
                if(!user){
                    alert('Votre session a expiré. Veuillez vous reconnecter')
                    this.$router.push({name:'Login'})
                }
            }
        },
        async updatePost(id){
            try{
                let result = await axios.put(`http://${env.host}:${env.port}/api/post`,
                    {
                        postId: id,
                        title: this.title,
                        message: this.message,
                    },
                    {
                        headers: {Authorization : `Bearer ${this.token}`}
                    },
                    {})
                if(result.status == 201){
                    this.$router.push({name: 'Posts'})
                }else{
                    alert('erreur lors update')
                }
            }
            catch (error) {
                if(error.response.request.status == 401){
                   sessionStorage.removeItem('user-info')
                }
            }
            finally {
                let user = sessionStorage.getItem('user-info')
                if(!user){
                    alert('Votre session a expiré. Veuillez vous reconnecter')
                    this.$router.push({name:'Login'})
                }
            }
        },
        async delPost(id){
            try{
                let post = await axios.delete(`http://${env.host}:${env.port}/api/post/${id}`,
                {
                    headers: {Authorization : `Bearer ${this.token}`}
                },
                {}
                );
                if(post.status == 201 ){
                    sessionStorage.removeItem('postInfo');
                    sessionStorage.removeItem('commentInfo');
                    this.$router.push({name:'Posts'})
                }else{
                    this.msgerr = post.data;
                }
            }
            catch (error) {
                if(error.response.request.status == 401){
                   sessionStorage.removeItem('user-info')
                }
            }
            finally {
                let user = sessionStorage.getItem('user-info')
                if(!user){
                    alert('Votre session a expiré. Veuillez vous reconnecter')
                    this.$router.push({name:'Login'})
                }
            }
        }
    },
    created(){
        let postInfo = JSON.parse(sessionStorage.getItem('postInfo'))
        if(postInfo.id > 0){
            this.getOnePost(postInfo.id)
            this.postInfo = postInfo
        }else{
            this.postInfo = postInfo
        } 
    }
}
</script>

<style lang="scss" scoped>

</style>