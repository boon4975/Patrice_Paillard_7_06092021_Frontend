<template>
    <router-link to="/posts" title="Forum de discution"><i class="fas fa-lg fa-book-reader"></i></router-link> |
    <router-link to="/about" title="Partagez vos images"><i class="fas fa-lg fa-camera"></i></router-link> |
    <router-link to="/profil" title="Profil utilisateur"><i class="fas fa-lg fa-user-cog"></i></router-link> |
    <router-link to="/login" title="Déconnexion" @click="logout()"><i class="fas fa-lg fa-power-off"></i></router-link>
    
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
