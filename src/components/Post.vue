<template>
    <div class="container border rounded my-3">
        <div class="row">
            <div class="col-3"><p>{{user.pseudo}}</p></div>
            <div class="col-9 border">
                <div class="picture my-1">
                    <div class="picture__cadre">
                        <img src="@/assets/images/cheval02.jpg" alt="photo ourson" class="card-img-top" />
                    </div>
                </div>
                <div class="row">
                    <h3>{{title}}</h3>
                </div>
                <div class="row px-2 wrap-text">
                    <p>{{message}}</p>
                </div>
                <div class="row">
                    <div class="col-3 icon"><i :id="postId" class="fas fa-comments fa-lg" @click="show = !show, changeColor(postId)"></i></div>
                    <div class="col-3 icon"><i :id="postId" class="fas fa-edit fa-lg" v-if="moderator || owner == user_id" @click="modifyPost(postId), changeColor(postId)"></i></div>
                    <div class="col-3">+1</div>
                    <div class="col-3">-1</div>
                </div>
                <div class="row comments my-1">
                    <Comment v-if="show"/>
                </div>
            </div>
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
            'pseudo',
            'currentPost'
            ])
    },
    props:["title","message","user","id","owner","postId"],
    methods:{
        modifyPost(value){
            sessionStorage.setItem('post-info', value)
            this.$store.dispatch('currentPost')
            this.$router.push({name:'ModifyPost'})
        },
        changeColor(value){
            if(!this.show){
                document.getElementById(value).style.color = 'blueviolet'
            }else{
                document.getElementById(value).style.color = 'greenyellow'
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
    color: blueviolet;
    margin: 0 15px;
        &:hover {
            color: greenyellow;
            cursor: pointer;  
        }
}

.wrap-text {
    white-space: pre;
    text-align: left;
}
</style>