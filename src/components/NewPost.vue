<template>
    <NavMenu />
    <div class="container">
        <form class="register w-100">
            <label for="Titre de la publication">Titre de la publication</label>
            <input type="text" name="Titre de la publication" v-model="title">
            <label for="Message">Votre texte</label>
            <input type="text" name="Message" maxlength="255" v-model="message">
            
        </form>
    </div>
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
            'userId',
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
        }
    },
    methods: {
        async newpost(){
            let result = await axios.post(`http://${env.host}:${env.port}/api/post`,
            {
                title: this.title,
                message: this.message,
                user_id: this.userId
            })
            return result
        }
    }
}
</script>