<template>
    <NavMenu />
    <div class="container">
        <form class="register w-100 py-3">
            <label for="Titre de la publication">Titre de la publication</label>
            <input type="text" name="Titre de la publication" v-model="title" class="form-control" maxlength="49">
            <label for="Message">Votre texte</label>
            <textarea name="Message" v-model="message" cols="30" rows="10" class="form-control"></textarea>
        </form>
        <button class="btn btn-primary" @click="newpost()">Publier</button>
    </div>
    <p>{{ msgerr }}</p>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import axios from 'axios';
import env from '../env';
import {mapState} from 'vuex'
export default {
    name: 'NewPost',
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
            title: '',
            message: '',
            msgerr:''
        }
    },
    methods: {
        async newpost(){
            let result = await axios.post(`http://${env.host}:${env.port}/api/post`,
            {
                title: this.title,
                message: this.message,
                user_id: this.user_id
            })
            if(result.status == 201){
                this.$router.push({name: 'Home'})
            }else{
                this.msgerr = 'problème lors de la publication'
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>