<template>
  <div id="#app">
    <div id="nav">
      <Banner />
    <router-view />
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import {mapState} from 'vuex'

export default {
  components: {
    Banner,
  },
  computed: {
        ...mapState([
            'user_id',
            'moderator',
            'pseudo'
            ])
  },
  methods:{
    async getUserInfo(){
      await this.$store.dispatch('getUserInfo')
      if(this.user_id == 'none'){
        this.$router.push({name:'Login'})
      }
    }
  },
  created(){
    this.getUserInfo()
  }
};
</script>


<style lang="scss">
$primary: #a8ecff;
$secondary: #1F3250;
$tertiary: #d1515a;
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
    color: $secondary;
    text-decoration: none;
    padding: 0 10px;
    &.router-link-exact-active {
      color: $tertiary;
    }
  }
}
//style composants de connexion
h1 {
  margin: 10px 0;
}
.formfield {
  margin-top: 20px;
  & input, textarea {
    border: 1px solid $tertiary;
  }
  & input {
    margin: auto;
    margin-top: 15px;
    margin-bottom: 15px;
    padding-left: 20px;
    width: 300px;
    height: 40px;
    display: block;
    box-shadow: 1px 5px 3px $tertiary;
    border-radius: 10px; 
  }
  & button {
    width: 300px;
    height: 35px;
    cursor: pointer;
  }
  &__err {
    color: red;
    margin-top: 20px;
    font-weight: bold;
  }
}
.subnav {
    margin: 15px 0;
}
.wrap-text {
    white-space: pre;
    text-align: left;
}
</style>
