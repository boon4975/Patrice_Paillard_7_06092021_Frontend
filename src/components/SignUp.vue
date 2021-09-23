<template>
    <h1>SignUp</h1>
    <div class="register w-100">
        <input type="text" placeholder="email" v-model="email" class="form-control">
        <input type="password" placeholder="pasword" v-model="password" class="form-control">
        <input type="password" placeholder="confirm password" v-model="passwordConfirm" class="form-control">
        <button class="btn btn-secondary" @click="signUp()">Sign Up</button>
        <div class="register__err">{{ msgerr }}</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SignUp',
    data(){
        return {
            email: '',
            password: '',
            passwordConfirm: '',
            msgerr:''
        }
    },
    methods: {
        async signUp(){
            if(this.password === this.passwordConfirm){
                let result = await axios.post('http://localhost:3000/api/auth/signup',{
                    email:this.email,
                    password:this.password
                });
                if(result.status == 201){
                    try{
                        sessionStorage.setItem("user-info", JSON.stringify(result.data));
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
        }
    }
}
</script>

<style scoped lang="scss">
h1 {
    margin: 10px 0;
}
.register {
    margin-top: 20px;
    & input {
        border: 1px solid skyblue;
        margin: auto;
        margin-bottom: 30px;
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