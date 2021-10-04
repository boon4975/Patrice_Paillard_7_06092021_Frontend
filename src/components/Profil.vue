<template>
    <router-link to="/"><i class="fas fa-house-user fa-lg"></i> </router-link>
    <hr />
    <h5>{{ pseudo }}</h5>
    <h5>{{ email }}</h5>
    <p>Changer de mot de passe</p>
    <div class="register w-100">
        <input type="password" placeholder="ancien mot de passe" v-model="oldpassword" class="form-control">
        <p class="link">||</p>
        <input type="password" placeholder="nouveau mot de passe" v-model="newpassword" title="mini 8 caractères + 1 Maj + 1 min + 1 caractères spécial" class="form-control">
        <p class="link">||</p>
        <input type="password" placeholder="confirmez le mot de passe" v-model="newconfirm" class="form-control">
        <p class="link">||</p>
        <button class="btn btn-secondary mb-3" @click="changePwd()">Valider</button>
        <div class="register__err my-3">{{ msgerr }}</div>
        <button class="btn btn-outline-danger" type="button" data-toggle="modal" data-target="#popup">Supprimer le compte</button>
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
                    <button class="btn btn-outline-danger" data-dismiss="modal" @click="deluser()">Supprimer</button>
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

export default {
    name: 'Profil',
    components: {
        Moderator
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
            oldpassword: '',
            newpassword: '',
            newconfirm: '',
            msgerr:''
        }
    },
    methods: {
        async changePwd(){
            if(this.newpassword === this.newconfirm){
                let result = await axios.put(`http://${env.host}:${env.port}/api/auth/profil`,{
                    userId:this.userId,
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
        async deluser(){
            let user = await axios.delete(`http://${env.host}:${env.port}/api/auth/profil/${this.userId}`,
                {
                    headers: {Authorization : `Bearer ${this.token}`}
                },{});
            if(user.status == 201 ){
                sessionStorage.clear();
                this.$router.push({name:'SignUp'})
            }else{
                this.msgerr = user.data;
            }
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
</style>