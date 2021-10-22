<template>
<div id="signUp">
    <h1>Création de compte</h1>
    <div class="formfield w-100">
        <form>
            <input type="text" placeholder="pseudo" v-model="pseudo" title="Votre Pseudo : 4 lettres et/ou chiffres minimum" class="form-control" required>
            <input type="text" placeholder="email" v-model="email" title="Votre email" class="form-control" required>
            <SetPassword 
                @password="getpwd"
                @confirmpwd="getconfirmpwd"
            />
        </form>
        <button class="btn btn-primary" @click="signUp()">S'enregistrer</button>
        <div class="formfield__err">{{ msgerr }}</div>
        <router-link to='/login'><p>Se connecter</p></router-link>
        
    </div>
</div>
</template>

<script>
import axios from 'axios';
import env from '../env';
import SetPassword from './SetPassword.vue'
export default {
    name: 'SignUp',
    components: {
        SetPassword
    },
    data(){
        return {
            email: '',
            pseudo: '',
            password: '',
            passwordConfirm: '',
            msgerr:''
        }
    },
    methods: {
        async signUp(){
            if(this.password === this.passwordConfirm){
                let result = await axios.post(`http://${env.host}:${env.port}/api/auth/signup`,{
                    email:this.email,
                    password:this.password,
                    pseudo:this.pseudo
                });
                if(result.status == 201){
                    try{
                        sessionStorage.setItem("user-info", JSON.stringify(result.data));
                        this.$store.dispatch('getUserInfo');
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
        getpwd(payload){
            this.password = payload
        },
        getconfirmpwd(payload){
            this.passwordConfirm = payload
        }
    }
}
</script>

<style scoped lang="scss">
 
</style>