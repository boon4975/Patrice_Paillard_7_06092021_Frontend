<template>
<div id="login">
    <h1>Login</h1>
    <div class="login w-100">
        <input type="text" placeholder="email" v-model="email" class="form-control">
        <input type="password" placeholder="password" v-model="password" class="form-control">
        <button class="btn btn-secondary" @click="login()">Log In</button>
        <div class="login__err">{{ msgerr }}</div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login',
    data(){
        return {
            email: '',
            password: '',
            msgerr:''
        }
    },
    methods: {
        async login(){
            
                let result = await axios.post('http://localhost:3000/api/auth/login',{
                    email:this.email,
                    password:this.password
                });
                if(result.status == 201){
                    try{
                        sessionStorage.setItem("user-info", JSON.stringify(result.data));
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
h1 {
    margin: 10px 0;
}
.login {
    margin-top: 20px;
    & input {
        border: 1px solid skyblue;
        margin: auto;
        margin-top: 15px;
        margin-bottom: 15px;
        padding-left: 20px;
        width: 300px;
        height: 40px;
        display: block;
    }
    & button {
        width: 300px;
        height: 35px;
        cursor: pointer;
    }
    &__err {
        color: red;
        margin-top: 20px;
    }
}
</style>