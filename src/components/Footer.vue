<template>
    <div class="footer">
        <div class="row g-0">
            <div class="col-3">
                <img alt="logo Groupomania" src="../assets/logo_footer.png" class="footer__logo"/>
                <a href="www.groupomania.com" class="footer__a">www.groupomania.com</a>
            </div>
            <div class="col-6">

            </div>
            <div class="col-3">
                <p>&copy;paillard@2021</p>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="scss" scoped>
    .footer {
        max-width: 100vw;
        background-color: #efefef;
        margin: 20px 0 0 0;
        padding: 10px 0;
        border-bottom: 7px solid #9C1C25;
        border-top: 7px solid #9C1C25;
        &__logo {
            max-width: 50px;
            border-radius: 5px;
        }
    }
    p {
        font-size: 10px;
    }
</style>