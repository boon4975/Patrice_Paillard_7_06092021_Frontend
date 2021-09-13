<template>
    <div class="banner">
        <img alt="logo Groupomania" src="../assets/logo.svg" class="banner__logo">
    </div>
</template>

<script>
export default {
    name: 'Banner'
}
</script>

<style lang="scss" scoped>
    .banner {
        max-width: 100vw;
        background-color: #1f3250;
        margin: 0 0 10px 0;
        padding: 10px 0;
        &__logo {
            width: 250px;
        }
    }
</style>