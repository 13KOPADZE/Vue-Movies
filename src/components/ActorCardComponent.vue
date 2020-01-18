<template>
    <div>
        <router-link :to="{ name: 'actor', params: { id: actor.id }}">
            <div class="actors-info" v-if="actor !== []">
                <div class="imgStyle">
                    <img v-bind:src="'http://image.tmdb.org/t/p/w500/' + actor.profile_path" v-if="actor.profile_path !== null">
                    <img src="../assets/no-image.jpg" v-else>    
                </div>
                <div class="actorStyle">
                    <div class="actor-name">Name: {{actor.name}}</div>
                    <div class="actor-character">Character: {{actor.character}}</div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ActorCard',

    props: ['actor', 'image_url',]
}
</script>

<style scoped>
    .actors-info{
        display: block;
        cursor: pointer;
        font-family: Abel, sans-serif;
        color: rgb(255, 255, 255);
        text-align: center;
        background: rgb(28, 28, 28);
        border-radius: 20px;
        padding: 5px;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }
    .actors-info img{
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 15px;
    }
    .actor-name{
        display: block;
        font-size: 18px;
        padding: 20px;
    }
    .actor-character{
        display: block;
        font-size: 16px;
        padding: 20px;
    }
    .imgStyle{
        max-width: 150px;
        width: 100%;
    }
    .actorStyle{
        margin: 0 auto;
    }
</style>