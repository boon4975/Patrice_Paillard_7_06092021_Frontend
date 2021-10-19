<template>
  <div id="#app">
    <div id="nav">
      <Banner />
    <router-view />
    <Banner />
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
            'pseudo',
            'token'
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
$primary: #efefef;
$secondary: #394C6A;
$tertiary: #9C1C25;
$quatro: #0d6efd;
// général
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
  background-color: $primary;
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
h1, h2 {
  margin: 10px 0;
  color: $tertiary;
}
.btn-primary {
  background-color: $secondary;
  border-color: $secondary;
  border-radius: 10px;
  &:hover {
    box-shadow: 2px 5px 3px $secondary;
  }
}
.btn-info {
  border-radius: 10px;
  color: white;
  background-color: $tertiary;
  border-color: $tertiary;
}

// posts
.post {
  color: $secondary;
  margin-top: 10px;
  & > h1 {
    border-top: 1px solid $secondary;
    padding-top: 10px;
    text-shadow: 8px 8px 4px lighten($tertiary, 40);
  }
  &__author {
    border-right: $secondary 1px solid;
  }
  &__new {
    margin: 25px 0;
  }
  &__iconcom {
    background-color: darken($primary, 10);
    padding: 3px;
  }
  &__border {
        border-radius: 15px;
        border: 2px solid #394C6A;
        overflow: hidden;
    }
    &__margin {
        margin: 20px auto;
    }
}
.wrap-text {
    width: 90%;
    white-space: pre-line;
    text-align: left;
    overflow-wrap: break-word;
}
.btn-none {
  border: none;
  z-index: -1;
}
//commentaires
.comment {
  background-color: lighten($secondary, 60);
  border: 1px dotted $secondary;
  border-radius: 3px;
  & i {
    color: $secondary;
  }
  &__timestamp {
    font-size: 0.7rem;
  }
}
// Champ Formulaire
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
    width: 280px;
    height: 35px;
    cursor: pointer;
  }
  &__err {
    color: red;
    margin-top: 20px;
    font-weight: bold;
  }
}
// affichage des images
.picture {
    display: flex;
    justify-content: center;
    &__cadre {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        & img {
            width: 100%;
            height: auto;
        }
    }
}
</style>
