<template>
    <h5 class="my-3">{{ pseudo }} - {{ email }}</h5>
    <p>Changer de mot de passe</p>
    <div class="formfield w-100">
        <form>
            <input type="password" placeholder="Mot de passe actuel" v-model="oldpassword" class="form-control">
            <SetPassword 
                @password="getpwd"
                @confirmpwd="getconfirmpwd"
            />
        </form>    
        <button class="btn btn-primary mb-3" @click="changePwd()">Valider</button>
        <div class="formfield__err my-3">{{ msgerr }}</div>
        <div>
            <div class="picture my-1"  v-if="url_image">
            <div class="picture__cadre">
                <img :src="url_image" :alt="pseudo" class="card-img-top" />
            </div>
        </div>
            <File @upfile="setFile" />
            <button v-if="file != ''" class="btn btn-primary" @click="avatar(setFormData())">changer votre Avatar</button>
        </div>
        <button class="btn btn-danger" type="button" data-toggle="modal" data-target="#popup">Supprimer le compte</button>
    </div>
    <Moderator v-if='moderator' />
    <div id="popup" class="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    confirmez la suppression de :
                    <br/>votre compte <b>{{ pseudo }}</b> /!\
                    <br/>tous vos posts /!\
                    <br/>tous vos commentaires /!\
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-danger" data-dismiss="modal" @click="delAccount()">Supprimer</button>
                    <button class="btn btn-outline-primary" data-dismiss="modal">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import env from '../env';
import Moderator from './Moderator.vue'
import {mapState} from 'vuex'
import File from './File.vue'
import SetPassword from './SetPassword.vue'

export default {
    name: 'Profil',
    components: {
        Moderator,
        File,
        SetPassword
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
            oldpassword: '',
            newpassword: '',
            newconfirm: '',
            msgerr:'',
            file:''
        }
    },
    methods: {
        async changePwd(){
            if(this.newpassword === this.newconfirm){
                let result = await axios.put(`http://${env.host}:${env.port}/api/auth/setpwd`,{
                    user_id:this.user_id,
                    token:this.token,
                    oldpassword:this.oldpassword,
                    newpassword:this.newpassword
                },{
                    headers: {Authorization : `Bearer ${this.token}`}
                });
                if(result.status == 201){
                    try{
                        this.$router.push({name:'Home'})
                    }
                    catch(e) {
                        console.log(e.message);
                    } 
                }else if(result.status == 202){
                    this.msgerr = result.data;
                }else{
                    this.msgerr = result.data.message;
                }
            }else{
                this.msgerr = 'les mots de passe ne sont pas identiques'
            }
        },
        async delAccount(){
            let user = await axios.delete(`http://${env.host}:${env.port}/api/auth/profil/${this.user_id}`,
                {
                    headers: {Authorization : `Bearer ${this.token}`}
                },{});
            if(user.status == 201 ){
                sessionStorage.clear();
                this.$router.push({name:'SignUp'})
            }else{
                this.msgerr = user.data;
            }
        },
        // changement de l'image de l'Avatar
        async avatar(formData){
            try{
                let result = await axios.put(`http://${env.host}:${env.port}/api/auth/avatar`,
                    formData,
                    {
                        headers: {
                            Authorization : `Bearer ${this.token}`,
                            'Content-Type': 'multipart/form-data; boundary'
                            }
                    }
                )
                if(result.status == 201){
                    sessionStorage.setItem("user-avatar", JSON.stringify(result.data));
                    this.$store.dispatch('getUserInfo');
                    this.$router.push({path: '/'})
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
        // met en forme les données pour la requete au serveur
        setFormData(){
            let formData = new FormData();
            formData.append('user_id', this.user_id);
            formData.append('file', this.file);
            return formData
        },
        // recupère le fichier uploadé depuis <File />
        setFile(payload){
            this.file = payload;
        },
        getpwd(payload){
            this.newpassword = payload
        },
        getconfirmpwd(payload){
            this.newconfirm = payload
        }
    }
}
</script>

<style lang="scss" scoped>
.link {
    margin: 0 auto;
    padding: 0;
    line-height: 1;
}
.picture__cadre {
    max-width: 300px;
}
</style>