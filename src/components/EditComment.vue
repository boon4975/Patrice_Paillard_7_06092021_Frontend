<template>
    <NavMenu />
    <div class="container">
        <form class="formfield w-100 py-3">
            <label for="Message">Un commentaire ?</label>
            <textarea name="Message" v-model="message" cols="30" rows="10" class="form-control"></textarea>
        </form>
        <button class="btn btn-primary" v-if="this.new" @click="addcomment()">Commenter</button>
        <button class="btn btn-primary mx-2" v-if="!this.new" @click="updateComment(currentComment)">Modifier</button>
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
                    <button class="btn btn-outline-danger" data-dismiss="modal" @click="delComment(currentComment)">Supprimer</button>
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
            'token',
            'currentComment'
            ])
    },
    data(){
        return {
            message: '',
            msgerr:'',
            new:false,
            post_id: 0
        }
    },
    methods: {
        async addcomment() {
            let result = await axios.post(`http://${env.host}:${env.port}/api/comment`,
            {
                post_id: this.post_id,
                message: this.message,
                user_id: this.user_id
            })
            if(result.status == 201){
                this.$router.push({name: 'Posts'})
            }else{
                this.msgerr = 'problème lors de la publication'
            }
        }
    },
    created(){
        let commentInfo = JSON.parse(sessionStorage.getItem('commentInfo'))
        if(commentInfo.id > 0){
            this.getOnePost(commentInfo.id)
            this.new = commentInfo.new
            this.post_id = commentInfo.post_id
        }else{
            this.new = commentInfo.new
            this.post_id = commentInfo.post_id
        } 
    }
}
</script>