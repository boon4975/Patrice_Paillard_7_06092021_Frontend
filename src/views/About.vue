<template>
  <div class="about">
    <NavMenu />
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
export default {
  name: 'about',
  components: {
    NavMenu
  }
}
</script>
