<template>
    <div>
        <div class="navigation-bar">
            <div class="container navigation-content">
                <router-link to="/">
                    <p class="homeLink">Home</p>
                </router-link>
                <p>|</p>
                <p>{{results.original_title}}</p>
            </div>
        </div>
        <div  class="background" :style="{ backgroundImage: `url(${IMG_W1280 + results.backdrop_path})` }">
            <div class="movieDetails">
                <div class="movie-image">
                    <img v-if="results.poster_path !== null" v-bind:src="IMG_W500 + results.poster_path">
                    <img v-else src="../assets/no-image.jpg" >
                </div>
                <section class="informationSection">
                    <div>
                        <h1>{{results.original_title}}</h1>
                        <h3>Plot</h3>
                        <p>{{results.overview}}</p>
                    </div>
                    <div class="rating-release">
                        <div>
                            <h3>Imdb Rating</h3>
                            <div class="score"><a :href='MOVIE_IMDB_URL + results.imdb_id' target="_blank"><div style="color: black;">{{results.vote_average | imdbNumber}}</div></a></div>
                        </div>
                        
                        <div class="release">
                            <h3>Release Date</h3>
                            <p>{{results.release_date | moment("dddd, MMMM Do YYYY") }}</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center youtube-icon" @click="launchModal">
                        <h1>Trailer:</h1>
                        <svg class="trailerSVG" @click="showModal = true" @keydown.esc="showModal = false" tabindex="1" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 461.001 461.001"><path d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.751 169.663l-126.06 60.123c-3.359 1.602-7.239-.847-7.239-4.568V168.607c0-3.774 3.982-6.22 7.348-4.514l126.06 63.881c3.748 1.899 3.683 7.274-.109 9.082z" fill="#f61c0d"/></svg>
                        <div v-if="showModal" @click="showModal = false"  class="modal is-active">
                            <div class="modal-background"></div>
                            
                                <div class="modal-content">

                                    <iframe v-bind:src="YOUTUBE_URL+ this.trailers" v-if="this.trailers !==null"></iframe>
                    
                                    <button class="modal-close is-large" aria-label="close" @click="$emit('close')">ez</button>

                                </div>
                            
                        </div> <!-- Modal for Trailer -->
                    </div>
                </section>
            </div>
        </div>
        <div class="navigation-bar">
            <div class="container justify-content-between d-flex">
                
                <div class="d-flex spacing svgStyle">
                   
                    <svg style="margin-right: 10px;" width="35px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><path fill="#fff" d="M30 0C13.458 0 0 13.458 0 30s13.458 30 30 30 30-13.458 30-30S46.542 0 30 0zm0 58C14.561 58 2 45.439 2 30S14.561 2 30 2s28 12.561 28 28-12.561 28-28 28z"/><path fill="#fff" d="M30 6a1 1 0 00-1 1v23H14a1 1 0 100 2h16a1 1 0 001-1V7a1 1 0 00-1-1z"/></svg>
                    <p>Runtime: {{results.runtime | formatHours }}</p>
                </div>
                <div class="d-flex spacing svgStyle">
                    <svg style="margin-right: 10px;" width="35px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.755 212.755"><path fill="#fff" d="M106.377 0C47.721 0 0 47.721 0 106.377s47.721 106.377 106.377 106.377 106.377-47.721 106.377-106.377S165.034 0 106.377 0zm0 198.755C55.44 198.755 14 157.314 14 106.377S55.44 14 106.377 14s92.377 41.44 92.377 92.377-41.44 92.378-92.377 92.378z"/><path fill="#fff" d="M113.377 100.096V60.352a20.136 20.136 0 019.82 7.82 7 7 0 0011.692-7.699 34.073 34.073 0 00-21.512-14.647v-11.12a7 7 0 10-14 0v11.099c-15.493 3.23-27.168 16.989-27.168 33.426s11.676 30.198 27.168 33.428v39.744a20.136 20.136 0 01-9.82-7.82 7 7 0 10-11.692 7.699 34.073 34.073 0 0021.512 14.647v11.119a7 7 0 1014 0V166.95c15.493-3.23 27.168-16.989 27.168-33.426s-11.675-30.198-27.168-33.428zM86.209 79.231c0-8.653 5.494-16.027 13.168-18.874v37.748c-7.674-2.847-13.168-10.221-13.168-18.874zm27.168 73.166v-37.748c7.674 2.847 13.168 10.221 13.168 18.874s-5.493 16.027-13.168 18.874z"/></svg>
                    <p>Budget: {{results.budget | formatNumber}}</p>
                </div>
                <div class="d-flex spacing svgStyle">
                    
                    <svg style="margin-right: 10px;" viewBox="0 0 512.001 512"  width="35px" height="32px" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M131.219 216.836c2.633 0 5.21-1.07 7.07-2.93a10.087 10.087 0 002.93-7.07c0-2.633-1.07-5.211-2.93-7.07a10.073 10.073 0 00-7.07-2.93c-2.64 0-5.207 1.07-7.07 2.93a10.073 10.073 0 00-2.93 7.07c0 2.629 1.07 5.207 2.93 7.07a10.087 10.087 0 007.07 2.93zm0 0M274.469 203.594a10.091 10.091 0 00-7.078-2.93 10.08 10.08 0 00-7.07 2.93 10.08 10.08 0 00-2.93 7.07c0 2.629 1.07 5.211 2.93 7.07a10.08 10.08 0 007.07 2.93c2.64 0 5.21-1.07 7.078-2.93a10.051 10.051 0 002.922-7.07c0-2.629-1.063-5.21-2.922-7.07zm0 0M302.398 185.664c2.633 0 5.211-1.07 7.07-2.93s2.923-4.441 2.923-7.07c0-2.629-1.063-5.21-2.922-7.07s-4.438-2.93-7.07-2.93c-2.637 0-5.22 1.07-7.079 2.93a10.08 10.08 0 00-2.93 7.07c0 2.629 1.07 5.211 2.93 7.07a10.084 10.084 0 007.078 2.93zm0 0"/><path fill="#fff" d="M482 245.996h-27.902l49.117-49.117c5.664-5.668 8.785-13.203 8.785-21.215s-3.121-15.547-8.785-21.21l-44.55-44.552c-3.903-3.902-10.235-3.902-14.142 0-5.664 5.668-13.199 8.79-21.21 8.79-8.016 0-15.547-3.122-21.215-8.79-5.668-5.664-8.786-13.199-8.786-21.21 0-8.016 3.122-15.547 8.786-21.215a10 10 0 000-14.141L357.55 8.789C351.883 3.121 344.35 0 336.336 0c-8.012 0-15.547 3.121-21.211 8.79L149.961 173.95c-3.906 3.902-3.906 10.234 0 14.14s10.238 3.906 14.144 0l165.16-165.16a9.928 9.928 0 017.07-2.93 9.92 9.92 0 017.071 2.93l38.184 38.18c-5.387 8.109-8.278 17.624-8.278 27.581 0 13.356 5.2 25.91 14.645 35.356 9.445 9.441 22 14.644 35.356 14.644 9.957 0 19.468-2.89 27.582-8.277l38.18 38.18c3.898 3.898 3.898 10.242 0 14.14l-63.262 63.262h-43.84l32.855-32.855c3.902-3.907 3.902-10.239 0-14.141L313.004 97.176c-3.906-3.906-10.238-3.906-14.145 0l-148.82 148.82H30c-16.543 0-30 13.457-30 30v63c0 5.52 4.477 10 10 10 16.543 0 30 13.457 30 30 0 16.54-13.457 30-30 30-5.523 0-10 4.477-10 10v63c0 16.54 13.457 30 30 30h452c16.543 0 30-13.46 30-30v-63c0-5.523-4.477-10-10-10-16.543 0-30-13.46-30-30 0-16.543 13.457-30 30-30 5.523 0 10-4.48 10-10v-63c0-16.543-13.457-30-30-30zm-176.07-127.61l87.683 87.684-39.925 39.926H314.09l29.316-29.32c3.906-3.903 3.906-10.235 0-14.14-3.902-3.907-10.234-3.907-14.14 0l-43.461 43.456h-107.48zM492 330c-22.793 4.645-40 24.848-40 48.996 0 24.145 17.207 44.348 40 48.996v54.004c0 5.512-4.484 10-10 10H30c-5.516 0-10-4.488-10-10v-54.004c22.793-4.648 40-24.851 40-48.996 0-24.148-17.207-44.348-40-48.996v-54.004c0-5.516 4.484-10 10-10h452c5.516 0 10 4.484 10 10zm0 0"/><path fill="#fff" d="M213.57 362.066a10.087 10.087 0 002.93-7.07c0-2.633-1.07-5.21-2.93-7.07-1.86-1.86-4.441-2.93-7.07-2.93s-5.21 1.07-7.07 2.93a10.073 10.073 0 00-2.93 7.07c0 2.629 1.07 5.207 2.93 7.07 1.86 1.86 4.441 2.93 7.07 2.93s5.21-1.07 7.07-2.93zm0 0M312.57 362.066a10.087 10.087 0 002.93-7.07c0-2.633-1.07-5.21-2.93-7.07-1.86-1.86-4.441-2.93-7.07-2.93s-5.21 1.07-7.07 2.93a10.073 10.073 0 00-2.93 7.07c0 2.629 1.07 5.207 2.93 7.07 1.86 1.86 4.441 2.93 7.07 2.93s5.21-1.07 7.07-2.93zm0 0M263.07 362.066a10.087 10.087 0 002.93-7.07c0-2.633-1.07-5.21-2.93-7.07-1.86-1.86-4.441-2.93-7.07-2.93s-5.21 1.07-7.07 2.93a10.073 10.073 0 00-2.93 7.07c0 2.629 1.07 5.207 2.93 7.07 1.86 1.86 4.441 2.93 7.07 2.93s5.21-1.07 7.07-2.93zm0 0M157 364.996c2.629 0 5.21-1.07 7.07-2.93a10.087 10.087 0 002.93-7.07c0-2.633-1.07-5.21-2.93-7.07-1.86-1.86-4.441-2.93-7.07-2.93s-5.21 1.07-7.07 2.93a10.073 10.073 0 00-2.93 7.07c0 2.629 1.07 5.207 2.93 7.07a10.08 10.08 0 007.07 2.93zm0 0M362.07 362.066a10.087 10.087 0 002.93-7.07c0-2.633-1.07-5.21-2.93-7.07-1.86-1.86-4.441-2.93-7.07-2.93s-5.21 1.07-7.07 2.93a10.073 10.073 0 00-2.93 7.07c0 2.629 1.07 5.207 2.93 7.07 1.86 1.86 4.441 2.93 7.07 2.93s5.21-1.07 7.07-2.93zm0 0M157 412.996h198c5.523 0 10-4.48 10-10 0-5.523-4.477-10-10-10H157c-5.523 0-10 4.477-10 10 0 5.52 4.477 10 10 10zm0 0M193.32 440.996c-2.629 0-5.21 1.07-7.07 2.93s-2.93 4.437-2.93 7.07c0 2.629 1.07 5.207 2.93 7.07a10.08 10.08 0 007.07 2.93c2.64 0 5.211-1.07 7.07-2.93a10.037 10.037 0 002.93-7.07c0-2.633-1.058-5.21-2.93-7.07a10.059 10.059 0 00-7.07-2.93zm0 0"/><path fill="#fff" d="M408 296.996H104c-5.523 0-10 4.477-10 10v144c0 5.52 4.477 10 10 10h41.656c5.524 0 10-4.48 10-10 0-5.523-4.476-10-10-10H114v-124h284v124H235.656c-5.523 0-10 4.477-10 10 0 5.52 4.477 10 10 10H408c5.523 0 10-4.48 10-10v-144c0-5.523-4.477-10-10-10zm0 0"/></svg>
                   <p>Renuve: {{results.revenue | formatNumber}}</p>
                </div> 
            </div>
        </div>
        
        <div class="container paddingAround">
            <h1 class="actors-heading">Actors</h1>
            <div class="grid">
                <div class="gridElement" v-for='cast in casts' :key='cast.id'>
                    <ActorCardComponent :actor=cast :image_url='IMG_W500'/>
                </div>
            </div>

            <button class="loadMore" v-if="!isHidden" @click="showAll" v-on:click="isHidden = true">Show All</button>


            <div v-if="similarMovie.length > 0"> 
                <h1 class="actors-heading">Similar Movies</h1>

                <div class="movieGrid">
                    <div class="gridElement movie-info" v-for='movie in similarMovie' :key='movie.id'>
                        <MovieCardComponent :movie=movie :image_url='IMG_W500' :imdb_id = imdb_id />
                    </div>
                </div>
            </div>
        </div>

    </div>
  
</template>

<script>


import axios from 'axios'
import {API_KEY, API_URL, YOUTUBE_URL, MOVIE_IMDB_URL, IMG_W1280, IMG_W500} from '@/config'
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import ActorCardComponent from './ActorCardComponent.vue'
import MovieCardComponent from './MovieCardComponent.vue'


Vue.use(require('vue-moment'));


Vue.use(VueYoutube)

var numeral = require("numeral");

var moment = require("moment");

var momentDurationFormatSetup = require("moment-duration-format");


Vue.filter("formatNumber", function (value) {
    return numeral(value).format("$ 0,0"); // displaying other groupings/separators is possible, look at the docs
});

Vue.filter("imdbNumber", function (value) {
    return numeral(value).format("0.0"); // displaying other groupings/separators is possible, look at the docs
});

Vue.filter('formatHours', function(value){
    return moment.duration(value, "minutes").format("h [h], m [m]");
});


export default {
    name: 'DetailsView',

    components: {
        ActorCardComponent,
        MovieCardComponent
    },

    data () {
        return {
            nextPage: 2,
            results: '',
            casts: '',
            similarMovie: '',
            trailers: '',
            YOUTUBE_URL: YOUTUBE_URL,
            showModal: false,
            isHidden: false,
            VueYoutube: VueYoutube,
            momentDurationFormatSetup: momentDurationFormatSetup,
            MOVIE_IMDB_URL: MOVIE_IMDB_URL,
            IMG_W500: IMG_W500,
            IMG_W1280: IMG_W1280,
            
        }
    },
    methods: {

        showAll(){
            axios
            .get( API_URL +'/3/movie/' + this.$route.params.id + '/credits?api_key='  + API_KEY)
            .then(response => {
                this.casts = response.data.cast
            });
        },

        launchModal(){
            axios
            .get(API_URL + '/3/movie/' + this.$route.params.id + '/videos?api_key=' + API_KEY)
            .then(response => {
                this.trailers = response.data.results[0].key;
            }); 
        },
        
        imdb_id(id){
            axios
                .get(API_URL + '/3/movie/' + id + '?api_key=' + API_KEY)
                .then(response => { 
                let imdbId = response.data.imdb_id;
                window.open(MOVIE_IMDB_URL + imdbId, "_blank");
            });
        },
        
    },

    mounted() {

        axios
        .get(API_URL + '/3/movie/' + this.$route.params.id + '/similar?api_key=' + API_KEY)
        .then(response => {
            this.similarMovie = response.data.results
        });

        axios
        .get(API_URL + '/3/movie/' + this.$route.params.id + '?api_key=' + API_KEY)
        .then(response => { 
            this.results = response.data
        });

        axios
        .get( API_URL +'/3/movie/' + this.$route.params.id + '/credits?api_key='  + API_KEY)
        .then(response => {
            this.casts = response.data.cast.slice(0, 6);
        });
    },
    // beforeRouteUpdate (to, from, next) {
    //     this.getContent(to.params.id);
    //     next(this.$route.params.id);
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .display-none {
        display: none;
    }
    .background{
        width: 100%;
        min-height: 600px;
        position: relative;
        padding: 60px 20px;
        background-size: cover;
        background-position: center center, center center !important;
    }
    .movieDetails{
        max-width: 1280px;
        min-height: 450px;
        position: relative;
        margin: 0px auto;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        align-items: center
    }
    .relative{
        position: relative;
    }
    iframe{
        width: 640px;
        height: 400px;
        padding: 20px;
    }
    .modal-content{
        justify-content: center !important;
        align-items: center !important;
        display: flex;
    }
    .modal-close{
        position: absolute;
        right: 2%;
        top: -2%;
    }
    .movie-image{
        width: 300px;
        float: left;
    }
    .movie-image img{
        width: 100%;
        height: auto;
        object-fit: cover;
        transition: all 0.3s ease 0s;
        border-radius: 20px;
    }
    .informationSection{
        font-family: Arial, Helvetica, sans-serif;
        color: rgb(255, 255, 255);
        padding: 40px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .informationSection p{
        font-family: Abel, sans-serif;
        font-size: 18px;
        line-height: 26px;
        margin-top: 20px;
    }
    .rating-release{
        display: flex;
        -webkit-box-pack: start;
        justify-content: flex-start;
    }
    .score{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        color: rgb(0, 0, 0);
        font-weight: 800;
        background: rgb(255, 255, 255);
        border-radius: 25px;
        margin-top: 15px;
    }
    .loadMore{
        width: 25%;
        min-width: 200px;
        height: 70px;
        color: rgb(255, 255, 255);
        cursor: pointer;
        font-family: Abel, sans-serif;
        font-size: 28px;
        display: block;
        background: rgb(0, 0, 0);
        transition: all 0.3s ease 0s;
        border-radius: 40px;
        border: none;
        margin: 20px auto;
        padding: 0px 20px;
        outline: none;
    }
    .loadMore:hover{
        opacity: 0.8;
    }
    .release{
        margin: 0px 0px 0px 40px;
    }
    .svgStyle p{
        margin-right: 10px;
    }
    .svgStyle{
        align-items: center;
    }
    .informationSection h1{
        font-family: Abel, sans-serif;
        font-size: 48px;
        color: rgb(255, 255, 255);
    }
    .actors-heading{
        margin-top: 20px;
        font-family: Abel, sans-serif;
        font-size: 48px;
        color: rgb(0, 0, 0);
    }
    .informationSection h3{
        font-size: 16px;
        line-height: 0;
        margin-top: 30px;
    }
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
    .align-items-end{
        align-items: flex-end;
    }
    .align-items-center{
        align-items: center;
    }
    .justify-content-between{
        justify-content: space-between;
    }
    .d-flex{
        display: flex;
    }
    .informationText{
        height: 100%;
        color: rgb(255, 255, 255);
        background: rgba(0, 0, 0, 0);
        margin-bottom: 0px;
    }
    .flex-direction-column{
        max-width: 700px;
        margin-bottom: 50px;
        flex-direction: column;
    }
    .paddingAround{
        padding: 0 20px;
    }
    .navigation-bar{
        display: flex !important;
        -webkit-box-align: center;
        align-items: center;
        width: 100%;
        height: 70px;
        color: rgb(255, 255, 255);
        background: rgb(53, 53, 53);
    }
    .movie-info{
        display: block;
        font-family: Abel, sans-serif;
        color: rgb(255, 255, 255);
        text-align: center;
        background: rgb(28, 28, 28);
        border-radius: 20px;
        padding: 5px;
        height: 100%;
    }
    .navigation-content{
        display: flex;
        width: 100%;
        margin: 0px auto;
        padding: 0px 20px;
    }
    img{
        width: 100%;
        height: auto;
        object-fit: cover;
        transition: all 0.3s ease 0s;
        border-radius: 20px;
    }
    .pagination{
        margin: 60px 0;
    }
    .youtube-icon h1{
        font-size: 25px;
        padding-right: 20px;
    }
    .youtube-icon{
        margin-top: 15px;
    }
    .trailerSVG{
        cursor: pointer;
        transition: 0.5s;
    }
    .trailerSVG:hover{
        transition: 0.5s;
        transform: scale(1.1);
    }
    .homeLink:hover{
        transform: scale(1.05);
        transition: 0.5s;
    }
    .grid{
        position: relative;
        display: grid;
        grid-template-columns: repeat(2, minmax(100px, 1fr));
        gap: 40px;
        padding: 0px 0px 40px 0px
    }
    .movieGrid{
        position: relative;
        display: grid;
        grid-template-columns: repeat(5, minmax(100px, 1fr));
        gap: 40px;
        padding: 40px 0px 40px 0px
    }
    .gridElement{
        animation: 0.5s ease 0s 1 normal none running animateGrid;
    }

    p{
        font-family: Abel, sans-serif;
        font-size: 22px;
        float: left;
        color: rgb(255, 255, 255);
        padding-right: 10px;
        text-decoration: none;
    }


    @media screen and (max-width: 1024px){
        .grid {
            grid-template-columns: repeat(2, minmax(100px, 1fr));
            gap: 40px;
        }
        .movieGrid{
            grid-template-columns: repeat(4, minmax(100px, 1fr));
        }
    }
    @media screen and (max-width: 768px){
        .grid {
         grid-template-columns: repeat(2, minmax(100px, 1fr));
        }
        .modal-close{
            position: absolute;
            right: 5%;
            top: -2%;
        }
        .movieGrid{
            grid-template-columns: repeat(3, minmax(100px, 1fr));
        }
    }
    @media screen and (max-width: 600px){
        .grid {
            grid-template-columns: repeat(2, minmax(100px, 1fr));
        }
        .movieGrid{
            grid-template-columns: repeat(2, minmax(100px, 1fr));
        }
    }
    @media screen and (max-width: 375px){
        .grid {
         grid-template-columns: repeat(1, minmax(100px, 1fr));
        }
        .movieGrid{
            grid-template-columns: repeat(1, minmax(100px, 1fr));
        }
    }
    @media screen and (max-width: 800px) {
        .movie-image{
            margin: 0 auto;
            float: none;
            width: 500px;
        }
    }
    @media screen and (max-width: 550px) {
        .movie-image{
            margin: 0 auto;
            float: none;
            width: auto;
        }
        .informationSection h3{
            font-size: 11px !important;
            line-height: 0;
            margin-top: 30px;
        }
        .navigation-bar{
            height: auto;
        }
        .justify-content-between{
            flex-direction: column;
            padding: 20px;
        }
        .spacing{
            margin: 10px;
        }
    }
</style>