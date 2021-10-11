<template>
    <NavMenu />
    <div class="container">
        <form class="formfield w-100 py-3">
            <label for="Message">Un commentaire ?</label>
            <textarea name="Message" v-model="message" cols="30" rows="10" class="form-control"></textarea>
        </form>
        <button class="btn btn-primary" v-if="this.comment_info.new" @click="addcomment(this.comment_info.post_id)">Commenter</button>
        <button class="btn btn-primary mx-2" v-if="!this.comment_info.new" @click="updateComment(this.comment_info.id)">Modifier</button>
        <button class="btn btn-outline-danger mx-2" v-if="!this.comment_info.new" data-toggle="modal" data-target="#popup">Supprimer</button>
    </div>
    <p class="formfield__err">{{ msgerr }}</p>
    <div id="popup" class="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    confirmez la suppression
                    du commentaire
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-danger" data-dismiss="modal" @click="delComment(this.comment_info.id)">Supprimer</button>
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
    name: 'EditComment',
    components: {
        NavMenu
    },
    computed: {
        ...mapState([
            'user_id',
            'email',
            'moderator',
            'pseudo',
            'token'
            ])
    },
    data(){
        return {
            message: '',
            msgerr:'',
            new:false,
            comment_info: ''
        }
    },
    methods: {
        async getComment(id) {
            let result = await axios.get(`http://${env.host}:${env.port}/api/comment/${id}`)
            if(result.status == 200){
               this.message = result.data.message
            }else{
                this.msgerr = 'problème avec la publication'
            }
        },
        async addcomment(id) {
            let result = await axios.post(`http://${env.host}:${env.port}/api/comment`,
            {
                post_id: id,
                message: this.message,
                user_id: this.user_id
            })
            if(result.status == 201){
                this.$router.push({name: 'Posts'})
            }else{
                this.msgerr = 'problème lors de la publication'
            }
        },
        async updateComment(id){
            let result = await axios.put(`http://${env.host}:${env.port}/api/comment`,
            {
                comment_id: id,
                message: this.message,
            })
            if(result.status == 201){
                this.$router.push({name: 'Posts'})
            }else{
                alert('erreur lors update')
            }
        },
        async delComment(id){
            let comment = await axios.delete(`http://${env.host}:${env.port}/api/comment/${id}`,
            {
                    headers: {Authorization : `Bearer ${this.token}`}
                },{});
            if(comment.status == 201 ){
                sessionStorage.removeItem('postInfo');
                sessionStorage.removeItem('commentInfo');
                this.$router.push({name:'Posts'})
            }else{
                this.msgerr = comment.data;
            }
        }
    },
    created(){
        let commentInfo = JSON.parse(sessionStorage.getItem('commentInfo'))
        if(commentInfo.id > 0){
            this.getComment(commentInfo.id)
            this.comment_info = commentInfo
        }else{
            this.comment_info = commentInfo
        } 
    }
}
</script>