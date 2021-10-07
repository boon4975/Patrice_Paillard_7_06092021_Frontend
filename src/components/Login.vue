<template>
<div id="login">
    <h1>Connexion</h1>
    <div class="formfield w-100">
        <form>
            <input type="text" placeholder="email" v-model="email" class="form-control">
            <input type="password" placeholder="mot de passe" v-model="password" class="form-control">
        </form>
        <button class="btn btn-secondary" @click="login()">Se connecter</button>
        <div class="formfield__err">{{ msgerr }}</div>
        <router-link to='/signup'><p>S'inscrire</p></router-link>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import env from '../env';
export default {
    name: 'Login',
    data(){
        return {
            email: '',
            password: '',
            msgerr:''
        }
    },
    methods: {
        async login(){
                let result = await axios.post(`http://${env.host}:${env.port}/api/auth/login`,{
                    email:this.email,
                    password:this.password
                });
                if(result.status == 201){
                    try{
                        sessionStorage.setItem("user-info", JSON.stringify(result.data));
                        this.$store.dispatch('getUserInfo');
                        this.$router.push({name:'Home'})
                    }
                    catch(e) {
                        console.log(e);
                    } 
                }else if(result.status == 202){
                    this.msgerr = result.data;
                }else{
                    this.msgerr = 'erreur serveur';
                }
            
        }
    },
}
</script>

<style scoped lang="scss">

</style>