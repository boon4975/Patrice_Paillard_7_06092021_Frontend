<template>
    <router-link to="/posts"><i class="fas fa-lg fa-book-reader"></i></router-link> |
    <router-link to="/about"><i class="fas fa-lg fa-camera"></i></router-link> |
    <router-link to="/profil"><i class="fas fa-lg fa-user-cog" title="Profil utilisateur"></i></router-link> |
    <router-link to="/login" @click="logout()"><i class="fas fa-lg fa-power-off" title="Déconnexion"></i></router-link>
    
</template>

<script>
export default {
    name: 'NavMenu',
    methods: {
        logout(){
            sessionStorage.clear();
            this.$store.dispatch('logout')
            this.$router.push({name: 'Login'})
        }
    }
}
</script>

<style scoped lang='scss'>
.iconprofil {
    max-width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;

}
</style>
