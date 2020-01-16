<template>
    <div>
        <div class="navigation-bar">
            <div class="container navigation-content">
                <router-link to="/">
                    <p>Home</p>
                </router-link>
                <p>|</p>
                <p>{{results.name}}</p>
            </div>
        </div>
        <div class="background" :style="{ backgroundImage: `url(${'http://image.tmdb.org/t/p/w1280'+results.profile_path})` }" v-if="results.profile_path !== undefined">
            <div class="movieDetails">
                <div class="actor-image">
                    <img v-bind:src="'http://image.tmdb.org/t/p/w500' + results.profile_path" v-if="results.profile_path !== null">
                    <img src="../assets/no-image.jpg" v-else>
                </div>
                <section class="informationSection">
                    <div>
                        <h1>{{results.name}}</h1>
                        <h3>Biography</h3>
                        <p v-if="results.biography !== null">{{results.biography}}</p>
                        <p v-else>No Info</p>
                    </div>
                    <div class="actor-info">
                        <div>
                            <h3>Imdb Id</h3>
                            <div class="imdb_id" v-if="results.imdb_id !== null"><a :href='ACTOR_IMDB_URL + results.imdb_id' target="_blank"><div>{{results.imdb_id}}</div></a></div>
                            <p v-else>No Info</p>
                        </div>
                        
                        <div class="release">
                            <h3>Place Of Birth</h3>
                            <p v-if="results.place_of_birth !==null">{{results.place_of_birth}}</p>
                            <p v-else>No Info</p>
                        </div>
                        <div class="birthday">
                            <!-- <p>{{result.birthday}}</p> -->
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div class="navigation-bar">
            <div class="container justify-content-between d-flex">
                
                <div class="actor-info paddingAround">
                    <div>
                        <h3>Gender</h3>
                        <div class="gender">{{results.gender}}</div>
                    </div>
                    
                    <div class="release">
                        <h3>Place Of Birth</h3>
                        <p v-if="results.place_of_birth !==null">{{results.place_of_birth}}</p>
                        <p v-else>No Info</p>
                    </div>
                    <div class="birthday">
                        <h3>Date Of Birth</h3>
                        <p v-if="results.birthday !==null">{{results.birthday | moment("dddd, MMMM Do YYYY") }}</p>
                        <p v-else>No Info</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container paddingAround">
            <h1 class="actors-heading">Movies</h1>
            
            <div class="grid" >
                <div class="gridElement" v-for='movie in movies' :key='movie.id'> 
                     <router-link :to="{ name: 'show', params: { id: movie.id }}">
                        <div class="movie-info">
                            <img v-bind:src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path" v-if="movie.poster_path !== null">
                            <img src="../assets/no-image.jpg" v-else>
                            <span class="movie-title">{{movie.original_title}}</span>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- <nav class="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
                <a class="pagination-previous">Previous</a>
                <a class="pagination-next">Next page</a>
                <ul class="pagination-list">
                    <li><a class="pagination-link is-current" aria-label="Goto page 1">1</a></li>
                </ul>
            </nav> -->

        </div>
    </div>
  
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import {API_KEY, API_URL, ACTOR_IMDB_URL} from '@/config'

Vue.use(require('vue-moment'));

export default {
    name: 'ActorDetailsPage',
    data () {
        return {
            results: '',
            movies: '',
            ACTOR_IMDB_URL: ACTOR_IMDB_URL
        }
    },
    mounted() {
        axios
        .get(API_URL + '/3/person/'+this.$route.params.id+'?api_key=' + API_KEY)
        .then(response => { 
            this.results = response.data 
        });
        axios
        .get( API_URL +'/3/person/'+this.$route.params.id+'/movie_credits?api_key='  + API_KEY)
        .then(response => {
            this.movies = response.data.cast;
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
    .actor-image{
        width: 300px;
        float: left;
    }
    .actor-image img{
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
    .actor-info{
        display: flex;
        -webkit-box-pack: start;
        justify-content: space-between;
        width: 100%;
    }
    .gender{
        text-align: center;
    }
    .imdb_id{
        margin-top: 15px
    }
    .release{
        margin: 0px 0px 0px 40px;
    }
    .svgStyle p{
        margin-right: 10px;
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
        font-size: 23px;
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
        margin: 10px 0px 0px;
    }
    .actor-character{
        display: block;
        font-size: 16px;
        margin: 0px 0px 10px;
    }
    .align-items-end{
        align-items: flex-end;
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

    .grid{
        position: relative;
        display: grid;
        grid-template-columns: repeat(5, minmax(100px, 1fr));
        gap: 40px;
        padding: 0px 0px 40px 0px
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
            grid-template-columns: repeat(4, minmax(100px, 1fr));
            gap: 40px;
        }
        .actor-image{
            margin: 0 auto;
            float: none;
            width: 500px;
        }
        .informationSection p{
            font-family: Abel, sans-serif;
            font-size: 22px;
            line-height: 26px;
            margin-top: 20px;
        }
        .informationSection h3{
            font-size: 24px !important;
        }
    }
    @media screen and (max-width: 768px){
        .grid {
        grid-template-columns: repeat(3, minmax(100px, 1fr));
        }
        .informationSection h3{
            font-size: 17px !important;
            line-height: 0;
            margin-top: 30px;
        }
        .actor-info p{
            font-size: 17px;
        }
    }
    @media screen and (max-width: 600px){
        .grid {
        grid-template-columns: repeat(2, minmax(100px, 1fr));
        }
        .actor-image{
            margin: 0 auto;
            float: none;
            width: auto;
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
    @media screen and (max-width: 375px){
        .grid {
            grid-template-columns: repeat(1, minmax(100px, 1fr));
        }
        .informationSection h3{
            font-size: 9px !important;
        }
        .informationSection p{
            font-size: unset;
        }
    
}
</style>