<template>
    <div class="container my-1">
        <div class="row px-1">{{author}} le {{updatedAt}}</div>
        <div class="row  px-1 wrap-text">{{message}}</div>
        <div class="row">
            <div class="col-3 icon" v-if="authorMod || authorId == user_id">
                <i :id="commentId" class="fas fa-edit fa-lg"  @click="editComment(commentId, postId)"></i>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'comments',
    props: ["message", "updatedAt","authorId","author","authorMod","commentId","postId"],
    computed: {
        ...mapState([
            'user_id',
            'moderator',
            'pseudo'
            ])
    },
    methods: {
        editComment(comId, postId){
            let commentInfo = {
                'id': comId,
                'new': false,
                'post_id': postId
            }
            sessionStorage.setItem('commentInfo', JSON.stringify(commentInfo))
            this.$router.push({name:'EditComment'})
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    background-color: #0d6efd;
    color: white;
}

</style>