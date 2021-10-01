<template>
    <div class="container">
        ici la vue modo
        <p>{{userId}}</p>
        <p>{{moderator}}</p>
        <p>{{pseudo}}</p>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'Moderator',
    computed: {
        ...mapState([
            'userId',
            'moderator',
            'pseudo'
            ])
    }
}
</script>