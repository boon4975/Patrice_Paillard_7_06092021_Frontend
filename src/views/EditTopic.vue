<template>
    <NavMenu />
    <div class="container">
        <form class="formfield w-100 py-3">
            <label for="Titre de la publication">Titre de la publication</label>
            <input type="text" id="Titre de la publication" v-model="title" class="form-control" maxlength="49" />
            <label for="Message">Votre texte</label>
            <textarea id="Message" v-model="message" cols="30" rows="10" class="form-control"></textarea>
        </form>
        <div class="picture my-1"  v-if="this.pix">
            <div class="picture__cadre">
                <img :src="this.pix" :alt="title" class="card-img-top" />
            </div>
        </div>
        <div v-if="this.topicInfo.type == 'pix'">
            <File @upfile="setFile" />
        </div>
        <div>
            <button class="btn btn-primary" v-if="this.topicInfo.new" @click="addTopic(setFormData())">Publier</button>
            <button class="btn btn-primary m-2" v-if="!this.topicInfo.new" @click="updateTopic(setFormData())">Modifier la publication</button>
            <button class="btn btn-outline-danger m-2" v-if="!this.topicInfo.new" data-toggle="modal" data-target="#popup">Supprimer</button>
        </div>
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
                    <button class="btn btn-outline-danger" data-dismiss="modal" @click="delTopic(this.topicInfo.id)">Supprimer</button>
                    <button class="btn btn-outline-primary" data-dismiss="modal">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue';
import File from '../components/File.vue';
import axios from 'axios';
import env from '../env';
import {mapState} from 'vuex'
export default {
    name: 'EditTopic',
    components: {
        NavMenu,
        File,
    },
    computed: {
        ...mapState([
            'user_id',
            'email',
            'moderator',
            'pseudo',
            'token',
            'url_image'
            ])
    },
    data(){
        return {
            title: '',
            message: '',
            msgerr:'',
            topicInfo:'',
            file: '',
            pix:''
        }
    },
    methods: {
        async getOneTopic(id){
            try{
                let result = await axios.get(`http://${env.host}:${env.port}/api/topic/${id}`,
                    {
                        headers: {Authorization : `Bearer ${this.token}`}
                    },
                    {}
                )
                if(result.status == 200){
                    this.title = result.data.title
                    this.message = result.data.message
                    this.pix = result.data.url_image
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
        async addTopic(formData){
            if(this.file === '' && this.topicInfo.new && this.topicInfo.type == 'pix'){
                alert('Veuillez sélectionner une image')
            }else{
                try {
                    let result = await axios.post(`http://${env.host}:${env.port}/api/topic`,
                        formData,
                        {
                            headers: {
                                Authorization : `Bearer ${this.token}`,
                                'Content-Type': 'multipart/form-data; boundary'
                                }
                        }
                    )
                    if(result.status == 201){
                        this.$router.push({path: `/${this.topicInfo.type}`})
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
            }
        },
        async updateTopic(formData){
            try{
                let result = await axios.put(`http://${env.host}:${env.port}/api/topic`,
                    formData,
                    {
                        headers: {
                            Authorization : `Bearer ${this.token}`,
                            'Content-Type': 'multipart/form-data; boundary'
                            }
                    }
                )
                if(result.status == 201){
                    this.$router.push({path: `/${this.topicInfo.type}`})
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
        async delTopic(id){
            try{
                let post = await axios.delete(`http://${env.host}:${env.port}/api/topic/${id}`,
                {
                    headers: {Authorization : `Bearer ${this.token}`}
                },
                {}
                );
                if(post.status == 201 ){
                    sessionStorage.removeItem('postInfo');
                    sessionStorage.removeItem('commentInfo');
                    this.$router.push({path:`/${this.topicInfo.type}`})
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
        },
        setFile(payload){
            this.file = payload;
        },
        setFormData(){
            // initialise formData 
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('message', this.message);
            formData.append('user_id', this.user_id);
            formData.append('postId', this.topicInfo.id);
            formData.append('urlimage', this.topicInfo.urlimage);
            // ajout du fichier si file n'est pas vide
            if(this.file != ''){
                formData.append('file', this.file);
            }
            return formData
        },
        
        
    },
    created(){
        let topicInfo = JSON.parse(sessionStorage.getItem('topicInfo'))
        if(topicInfo.id > 0){
            this.getOneTopic(topicInfo.id)
        }
        this.topicInfo = topicInfo
    }
}
</script>

<style lang="scss" scoped>
.picture__cadre {
    max-width: 300px;
}
</style>