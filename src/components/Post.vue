<template>
    <div class="container border rounded my-3">
        <div class="row">
            <div class="col-3 border-end"><p>{{user.pseudo}}</p></div>
            <div class="col-9">
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
                    <div class="col-3 icon">
                        <i :id="postId" class="fas fa-comment fa-lg" @click="show = !show, changeColor(postId)"></i>
                        <i class="fas fa-plus-circle fa-lg"></i>
                    </div>
                    <div class="col-3 icon"><i class="fas fa-edit fa-lg" v-if="moderator || owner == user_id" @click="modifyPost(postId)"></i></div>
                    <div class="col-3">+1</div>
                    <div class="col-3">-1</div>
                </div>
                <div class="row comments my-1" v-if="show">
                    <hr/>
                    <Comment
                        v-for="item of comments"
                        :key="item.id"
                        :message="item.message"
                        :updatedAt="item.updatedAt"
                        :authorId="item.userId"
                        :author="item.user.pseudo"
                        :authorMod="item.user.moderator"
                        :commentId="item.id"

                    />
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
    props:["title","message","user","id","owner","postId","comments"],
    methods:{
        modifyPost(value){
            let postInfo = {
                'id': value,
                'new': false
            }
            sessionStorage.setItem('postInfo', JSON.stringify(postInfo))
            this.$store.dispatch('currentPost')
            this.$router.push({name:'EditPost'})
        },
        changeColor(value){
            if(!this.show){
                document.getElementById(value).style.color = 'blueviolet'
            }else{
                document.getElementById(value).style.color = 'darkgreen'
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
            color: darkgreen;
            cursor: pointer;  
        }
}

.wrap-text {
    white-space: pre;
    text-align: left;
}
</style>