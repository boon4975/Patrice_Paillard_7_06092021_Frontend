<template>
    <div class="container post__border post__margin" :id="`#post${postId}`">
        <div class="row">
            <div class="col-12 col-md-3 post__author"><h2>{{user.pseudo}}</h2></div>
            <div class="col-12 col-md-9">
                <div class="picture my-1" v-if="urlimage">
                    <div class="picture__cadre">
                        <img :src="urlimage" :alt="title" class="card-img-top" />
                    </div>
                </div>
                <div class="row text-start">
                    <h3 class="post">{{title}}</h3>
                </div>
                <div class="row px-2 wrap-text">
                    <p>{{message}}</p>
                </div>
                <div class="row post__iconcom">
                    <div class="col-6 col-md-2 icon">
                        <a :href="`#post${postId}`" :id="postId" class="fas fa-comment-alt fa-lg" @click="show = !show, changeColor(postId)" role="link" title="Voir les commentaires"><sup>{{nbcomment}}</sup></a>
                    </div>
                    <div class="col-6 col-md-2 icon">
                        <a href="/editcomment" class="fas fa-plus-circle fa-lg" @click="addComment(0, postId)" role="link" title="Ajouter mon grain de sel"></a>
                    </div>
                    <div class="col-12 col-md-4 icon">
                        <a href="/edittopic" class="fas fa-edit fa-lg" v-if="moderator || owner == user_id" @click="editPost(postId)" role="link" title="Editer mon post"  aria-hidden="true"></a>
                    </div>
                    <div class="col-6 col-md-2">+1</div>
                    <div class="col-6 col-md-2">-1</div>
                </div>
                <div class="row my-1" v-if="show">
                    <Comment
                        v-for="item of comments"
                        :key="item.id"
                        :message="item.message"
                        :updatedAt="item.updatedAt"
                        :authorId="item.userId"
                        :author="item.user.pseudo"
                        :authorMod="item.user.moderator"
                        :commentId="item.id"
                        :postId="postId"

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
            show: false,
            nbcomment: this.comments.length
        }
    },
    computed: {
        ...mapState([
            'user_id',
            'moderator',
            'pseudo'
            ])
    },
    props:["title","message","user","id","owner","postId","comments","urlimage"],
    methods:{
        editPost(value){
            let typeTopic = 'pix'
            if(this.urlimage == null){
                typeTopic = 'post'
            }
            let topicInfo = {
                'id': value,
                'new': false,
                'urlimage': this.urlimage,
                'type': typeTopic
            }
            sessionStorage.setItem('topicInfo', JSON.stringify(topicInfo))
            this.$router.push({name:'EditTopic'})
        },
        changeColor(value){
            if(!this.show){
                document.getElementById(value).style.color = '#9C1C25'
            }else{
                document.getElementById(value).style.color = '#394C6A'
            }
            
        },
        addComment(value, postId){
            let commentInfo = {
                'id': value,
                'new': true,
                'post_id': postId
            }
            sessionStorage.setItem('commentInfo', JSON.stringify(commentInfo))
            this.$router.push({name:'EditComment'})
        },
    }

}

</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}

.icon i{
    color: #9C1C25;
    font-size: 24px;
    margin: 0 15px;
        &:hover {
            color: #394C6A; 
        }
}
sup {
    color: white;
    position: relative;
    font-size: 14px;
    top: -5px;
    left: -18px;
}
.picture__cadre {
    max-width: 1000px;
    max-height: 1000px;
}
</style>