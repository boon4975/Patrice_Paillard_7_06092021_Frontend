<template>
    <div class="container my-3">
        <h2><i class="fas fa-user-shield"></i><br>Gestion de compte Modérateur</h2>
        <button class="btn btn-warning my-3" data-toggle="modal" data-target="#moderator">Search</button>
    </div>
    <div id="moderator" class="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <input class="form-control my-1 text-center my-2" id="searchInput" type="text" placeholder="Recherche par email ..." @keyup.enter="capteInput(this.get)">
                    <p class="login__err">{{ msgerr }}</p>
                    <div id="modo" class="d-none" >
                        <p>Modifier le statut de <b>{{ otherPseudo }}</b></p>
                        <p>Email : <b>{{ otherEmail }}</b></p>
                        <p v-if="otherModerator">Modérateur <input type="checkbox" checked @click="updateModerator(put)" name="cb_modo" /></p>
                        <p v-else>Modérator <input type="checkbox"  @click="updateModerator(this.put)" name="cb_modo" /></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-primary" data-dismiss="modal" @click="clearInput()">Fermer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import env from '../env';

export default {
    name: 'Moderator',
    data() {
        return {
            searchUser:'',
            msgerr:'',
            otherPseudo: '',
            otherModerator:'',
            otherEmail:'',
            get: 'get',
            put:'put'
        }
    },
    computed: {
        ...mapState([
            'user_id',
            'moderator',
            'pseudo',
            'token'
            ])
    },
    methods: {
        capteInput(get){
            this.searchUser = document.getElementById('searchInput').value;
            this.updateModerator(get);
            document.getElementById("modo").classList.remove("d-none");
        },
        async updateModerator(param){
            let cb_Moderator = document.getElementsByName('cb_modo')[0].checked
            let result = await axios.put(`http://${env.host}:${env.port}/api/auth/profil/moderator`,{
                email: this.searchUser,
                moderator: cb_Moderator,
                action: param
                },
                {
                    headers: {Authorization : `Bearer ${this.token}`}
                },{});
            if(result.status == 200 && param == 'get' ){
                this.otherModerator = result.data.moderator
                this.otherPseudo = result.data.pseudo
                this.otherEmail = result.data.email
            }else if(result.status == 200 && param == 'put' ){
                console.log('modification du statut effectué')
            }
            else{
                this.msgerr = result.data.message
            }
        },
        clearInput(){
            document.getElementById('searchInput').value ='';
            document.getElementById("modo").classList.add("d-none");
            this.msgerr = ''
            this.otherPseudo = ''
            this.otherModerator = ''
            this.otherEmail = ''
        }

    }
}


</script>

<style lang="scss" scoped>
input {
    max-width: 320px;
    display: inline;
}
</style>