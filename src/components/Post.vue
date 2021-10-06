<template>
    <div class="container border rounded my-3">
        <div class="picture my-1">
                <div class="picture__cadre">
                    <img src="@/assets/images/cheval02.jpg" alt="photo ourson" class="card-img-top" />
                </div>
        </div>
        <div class="row">
            <div class="col-3"><p>{{user.pseudo}}</p></div>
            <div class="col-9 border">
                <div class="row">
                    <h3>{{title}}</h3>
                </div>
                <div class="row px-2">
                    <p>{{message}}</p>
                </div>
                <div class="row">
                    <div class="col-3 icon"><i class="fas fa-comments fa-lg" @click="show = !show"></i></div>
                    <div class="col-3"><i class="fas fa-edit fa-lg" v-if="moderator || owner == user_id"></i>modo</div>
                    <div class="col-3">+1</div>
                    <div class="col-3">-1</div>
                </div>
            </div>
        </div>
        <div class="row comments my-1">
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
    data(){
        return {
            show: false
        }
    },
    computed: {
        ...mapState([
            'user_id',
            'moderator',
            'pseudo'
            ])
    },
    props:["title","message","user","id","owner"]
    ,
    methods: {
        seeComment(){
            if(this.show){
               document.getElementById('') 
            }
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

.icon i{
    color: red;
    margin: 0 15px;
        &:hover {
            color: greenyellow;
            cursor: pointer;  
        }
}

</style>