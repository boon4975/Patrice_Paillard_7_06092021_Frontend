<template>
    <div class="container">
            <div class="picture">
                <div class="picture__cadre">
                    <img src="@/assets/images/cheval02.jpg" alt="photo ourson" class="card-img-top" />
                </div>
            </div>
            <div class="card-body">
                <p>{{ pseudo }}</p>
                <h2 class="card-title text-center" id="name">titre</h2>
                <div class="card-text my-3">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio corporis, vero facere recusandae ipsa labore odit in commodi, iure, quia et maxime. Quae, ad nam. Fugit animi aliquam provident culpa.</p>
                <div class="icon">
                    <i class="fas fa-edit fa-lg" v-if="owner"></i>
                    <i class="fas fa-comments fa-lg" @click="show = !show"></i>
                </div>
                </div>
            </div>
            <div class="comments">
                <Comment v-if="show"/>
            </div> 
        
    </div>
</template>

<script>
import Comment from './Comment.vue'
import {mapState} from 'vuex'

export default {
    name: 'Post',
    components: {
        Comment
    },
    computed: {
        ...mapState([
            'userId',
            'moderator',
            'pseudo'
            ])
    },
    data(){
        return {
            show: false,
            owner:''
        }
    }
}

</script>

<style lang="scss" scoped>
.picture {
    display: flex;
    justify-content: center;
    &__cadre {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        max-width: 500px;
        max-height: 500px;
        & img {
            width: 100%;
            height: auto;
        }
    }
}

.icon {
    color: #4624fd;
    & i {
        margin: 0 15px;
        &:hover {
            color: steelblue;
            cursor: pointer;
        }
    }
}

</style>