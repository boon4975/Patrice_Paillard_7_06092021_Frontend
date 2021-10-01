<template>
    <router-link to="/"><i class="fas fa-house-user"></i> Home</router-link> |
    <router-link to="/about">Forum</router-link> |
    <router-link to="/profil" @click="profil()"><i class="fas fa-user-alt" title="Profil utilisateur"></i></router-link> |
    <router-link to="/login" @click="logout()"><i class="fas fa-sign-out-alt" title="Déconnexion"></i></router-link>
    <div class="subnav">
        <p>Nouveau message <i class="fas fa-feather"></i></p>
    </div>
</template>

<script>
export default {
    name: 'NavMenu',
    methods: {
        logout(){
            sessionStorage.clear();
            this.$router.push({name: 'Login'})
        }
    }
}
</script>

<style scoped lang='scss'>
.subnav {
    margin: 15px 0;
}
.iconprofil {
    max-width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;

}
</style>
