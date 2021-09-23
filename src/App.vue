<template>
<div id="#app">
  <div id="nav">
    <Banner />
    <NavMenu />
  </div>             
  <router-view/>
</div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import NavMenu from '@/components/NavMenu.vue'

export default {
  components: {
    Banner,
    NavMenu
  }
}
</script>


<style lang="scss">
$primary : #A8ECFF;
$secondary : #4624FD;
$tertiary: #15D310;
$width_menu: 100px;
$translate-nav: 300px;
$duration_dropdown: 1000ms;
$duration_delay: 150ms;
$heigth_banner: 70px;

body {
  max-width: 1440px;
  margin: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    text-decoration: none;
    padding: 0 10px;
    &.router-link-exact-active {
      color: $tertiary;
    }
  }
}


</style>
