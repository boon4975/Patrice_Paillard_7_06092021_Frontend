<template>
    <div class="container my-1">
        <div class="row px-1">{{author}} le {{updatedAt}}</div>
        <div class="row  px-1">{{message}}</div>
        <div class="row">
            <div class="col-3 icon" v-if="authorMod || authorId == user_id"><i :id="commentId" class="fas fa-edit fa-lg"  @click="modifyPost(postId), changeColor(postId)"></i></div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'comments',
    props: ["message", "updatedAt","authorId","author","authorMod","commentId"],
    computed: {
        ...mapState([
            'user_id',
            'moderator',
            'pseudo',
            'currentPost'
            ])
    },
}
</script>

<style lang="scss" scoped>
.container {
    background-color: #0d6efd;
    color: white;
}
</style>