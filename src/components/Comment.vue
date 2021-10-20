<template>
    <div class="container my-1 comment">
        <div class="row px-1 comment__timestamp"><span class="text-end">{{author}} le {{updatedAt}}</span></div>
        <div class="row  px-1 wrap-text">{{message}}</div>
        <div class="row">
            <div class="col-3 icon" v-if="moderator || authorId == user_id">
                <a href="/editcomment" :id="commentId" class="fas fa-edit fa-lg"  @click="editComment(commentId, postId)" title="éditer le commentaire"></a>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'comments',
    props: ["message", "updatedAt","authorId","author","commentId","postId", "urlimage"],
    computed: {
        ...mapState([
            'user_id',
            'moderator',
            'pseudo',
            'url_image'
            ])
    },
    methods: {
        editComment(comId, postId){
            let typeTopic = 'pix'
            if(this.urlimage == null){
                typeTopic = 'post'
            }
            let commentInfo = {
                'id': comId,
                'new': false,
                'post_id': postId,
                'type': typeTopic
            }
            sessionStorage.setItem('commentInfo', JSON.stringify(commentInfo))
            this.$router.push({name:'EditComment'})
        },
    }
}
</script>

<style lang="scss" scoped>


</style>