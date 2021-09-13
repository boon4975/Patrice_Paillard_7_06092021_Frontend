<template>
<div id="#app">
  <div id="nav">
    <Banner />
    <router-link to="/"><i class="fas fa-house-user"></i> Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Connexion</router-link>
  </div>
  <router-view/>
</div>
</template>

<script>
import Banner from '@/components/Banner.vue'

export default {
  components: {
    Banner
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-bottom: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
