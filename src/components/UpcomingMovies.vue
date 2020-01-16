<template>
  <div>
    <div class="background" :class="{ 'display-none': isHiding }">
      <div class="container informationText d-flex align-items-end">
          <div class="flex-direction-column">
              <h1>Ad Astra</h1>
              <p>
                  The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.
              </p>
          </div>
      </div>
    </div>
    <div class="search-background">
      <div class="container control">
          <p class="control has-icons-left relative">
              <input class="input" type="text" placeholder="Search Movie" v-model='query' @keyup='SearchResult(query)'>
              <svg class="pos" xmlns="http://www.w3.org/2000/svg" width="25px"  viewBox="0 0 512 512"><path fill="#fff" d="M495 466.2L377.2 348.4c29.2-35.6 46.8-81.2 46.8-130.9C424 103.5 331.5 11 217.5 11 103.4 11 11 103.5 11 217.5S103.4 424 217.5 424c49.7 0 95.2-17.5 130.8-46.7L466.1 495c8 8 20.9 8 28.9 0 8-7.9 8-20.9 0-28.8zm-277.5-83.3C126.2 382.9 52 308.7 52 217.5S126.2 52 217.5 52C308.7 52 383 126.3 383 217.5s-74.3 165.4-165.5 165.4z"/></svg>    
          </p>
      </div>
      <div class="genres" :class="{ 'display-none': isHiding }"> 
        <ul class="container d-flex wrapped genres">
          <li @click="filterGeners(genres.id)" v-for="genres in genres" :key="genres.name">{{genres.name}}</li>
        </ul>
      </div>
    </div>
    <div class="container tabs is-large" :class="{ 'display-none': searchText}">
      <ul> 
        <li class="searchText is-active">Searched Movies</li>
      </ul>
    </div>

    <div @keydown.esc="showModal = false" tabindex="0" v-if="showModal" @click="showModal = false"  class="modal is-active">
      
      <div class="modal-background"></div>

      <div class="modal-content">

          <iframe v-bind:src="YOUTUBE_URL + trailers"></iframe>
          
          <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>

      </div>

    </div> <!-- Modal for Trailer -->

    
    <div class="container paddingAround">
      <div class="tabs is-large" :class="{ 'display-none': isHiding }">
        <ul>
          <li><router-link to="/popular-movies">Popular Movies</router-link></li>
          <li class="is-active"><router-link to="/upcoming-movies">Upcoming Movies</router-link></li>
        </ul>
      </div>


      <div class="grid"> 
        <div class="gridElement movie-info" v-for='result in results' :key='result.id'> 
            <div class="movie-avatar">
              <img :src="IMG_W500 + result.poster_path" v-if="result.poster_path !== null">
              <img src="../assets/no-image.jpg" v-else>
              <div class="trailer_play">
                <div class="d-flex justify-content-between">
                  
                  <div @click="imdb_id(result.id)">
                    <div class="score"><div style="color: black;">{{result.vote_average | imdbNumber}}</div></div>
                  </div>

                  <div @click="launchModal(result.id)">
                    <svg @click="showModal = true"   xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 461.001 461.001"><path d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.751 169.663l-126.06 60.123c-3.359 1.602-7.239-.847-7.239-4.568V168.607c0-3.774 3.982-6.22 7.348-4.514l126.06 63.881c3.748 1.899 3.683 7.274-.109 9.082z" fill="#f61c0d"/></svg>
                  </div>
                </div>
                <router-link :to="{ name: 'show', params: { id: result.id }}">
                  <span class="movie-name">{{result.original_title}}</span>
                </router-link>
              </div>
            </div>
        </div>
      </div>
      
        <button class="loadMore" @click="loadMoreMovies"  :class="{ 'display-none': isHiding }" @keydown="SearchResult(query)">Load More</button>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {API_KEY, API_URL, IMG_W500, IMG_W1280, MOVIE_IMDB_URL, YOUTUBE_URL} from '@/config'
// import VueRouter from 'vue-router'

export default {
  name: 'MoviesList',
  data () {
    return {
      nextPage: 2,
      IMG_W500: IMG_W500,
      IMG_W1280: IMG_W1280,
      query: '',
      results: '',
      upcoming: '',
      loadMore: '',
      isHiding: false,
      searchText: true,
      showModal: false,
      genres: '',
      trailers: '',
      YOUTUBE_URL: YOUTUBE_URL,
    }
  },

  methods: {

    launchModal(id){
      axios
      .get(API_URL + '/3/movie/' + id + '/videos?api_key=' + API_KEY)
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

    loadMoreMovies(){
      axios.get(API_URL + '/3/movie/upcoming?api_key=' + API_KEY + '&page=' + this.nextPage)
      .then(response => { 
          this.results = this.results.concat(response.data.results);
      })
      this.nextPage++;
    },

    filterGeners(id){
      let query = API_URL+'/3/discover/movie?api_key='+API_KEY+'&sort_by=popularity.desc&with_genres='+id
      this.fetch(query)
    },

    fetch(query) {
      axios.get(query)
      .then(response => { 
        this.results = response.data.results 
      });
    },
    
    SearchResult(query) {
      let url = API_URL+'/3/search/movie?api_key='+API_KEY+'&query=' + query;
      query == ''? url = API_URL+'/3/movie/upcoming?api_key='+API_KEY: true;
      this.fetch(url);
      if (query == '') {
        this.isHiding = false;
      }else{
        this.isHiding = true;
      }
      if (query == '') {
        this.searchText = true;
      }else{
        this.searchText = false;
      }
    }
  },
  

    
  mounted: function mounted () {
    this.fetch(API_URL + '/3/movie/upcoming?api_key=' + API_KEY);
    axios
      .get(API_URL+'/3/genre/movie/list?api_key='+API_KEY)
      .then(response => {
        this.genres = response.data.genres;
      })
  },  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .display-none {
      display: none !important;
    }
    .display-block{
      display: none !important;
    }
    .searchText {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border-bottom-color: #dbdbdb;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      color: #4a4a4a;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin-bottom: -1px;
      padding: 0.5em 1em;
      vertical-align: top;
    }

    iframe{
      width: 640px;
      height: 400px;
      padding: 20px;
    }
    .modal-close{
      position: absolute;
      right: 2%;
      top: -2%;
    }
    .delete:active, .modal-close:active{
      background-color: none !important;
    }
    .modal-content{
      justify-content: center !important;
      align-items: center !important;
      display: flex;
    }
    .background{
      background: linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%),  url('../assets/background.jpg');
      width: 100%;
      height: 600px;
      position: relative;
      background-size: cover;
      background-position: center center, center center !important;
    }
    .align-items-end{
      align-items: flex-end;
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
        padding: 20px;
    }
    h1{
       font-family: Abel, sans-serif;
        font-size: 48px;
        color: rgb(255, 255, 255);
    }
    p{
       font-family: Abel, sans-serif;
        font-size: 22px;
        line-height: 26px;
        color: rgb(255, 255, 255);
    }
    .d-flex{
        display: flex !important;
    }
    .align-items-center{
        align-items: center;
    }
    .justify-content-between{
        justify-content: space-between;
    }
    .wrapped{
    flex-wrap: wrap;
  }
  .wrapped li{
    padding: 15px;
    cursor: pointer;
  }
  .active{
    color: aqua
  }
  .movie-avatar{
    width: 100%;
    position: relative;
  }
  .movie-avatar .trailer_play{
    border-radius: 10px;
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .8);
    text-align: center;
    width: 100%;
    height: 100%;
    transition: 0.5s;
  }
  .movie-avatar:hover .trailer_play{
    display: block !important;
    transition: 0.5s;
    padding: 10px;
  }
  .score{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    color: rgb(0, 0, 0);
    font-weight: 800;
    background: rgb(255, 255, 255);
    border-radius: 25px;
    margin: 0 auto;
  }
  .movie-name{
    margin-top: 52px;
    display: block;
    color: #fff;
  }
  input:focus{
    box-shadow: none;
  }
  .paddingAround{
    padding: 0 20px;
  }
  a{
    transition: 0.5s;
  }
  a:hover{
    opacity: 0.8;
    transition: 0.5s;
  }
  .movie-info{
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
    margin-top: 40px;
  }
  .gridElement{
    animation: 0.5s ease 0s 1 normal none running animateGrid;
    cursor: pointer;
  }
  .genres p{
    text-align: center;
    color: #3298dc;
  }

  .genres{
    padding: 5px;
    margin-top: 20px;
    color: #fff;
  }
  .genres li{
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    transition: 0.5s;
    border: 1px solid #32a2ec;
    border-radius: 5px;
  }

  .genres li:hover{
    border: 1px solid #3273dc;
    background: #3273dc;
    transition: 0.5s;
  }

  h1{
      font-family: Abel, sans-serif;
      font-size: 42px;
      color: #fff;
      padding: 20px 0;
  }
  .search-background{
      background: #1C1C1C;
      padding: 30px 20px;
  }
  ::placeholder{
      font-size: 20px;
      color: #ccc;
  }
  .relative{
      position: relative;
  }
  .pos{
    position: absolute;
    left: 16px;
    top: 18px;

  }
  .input{
    border: none;
    border-radius: 30px;
    background: #353535;
    color: aliceblue;
    font-size: 20px;
    outline: none;
    height: 60px;
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
  .control{
      font-size: 1.5rem !important;
  }
  @media screen and (max-width: 1024px){
    .grid {
      grid-template-columns: repeat(4, minmax(100px, 1fr));
      gap: 40px;
    }
  }
  @media screen and (max-width: 768px){
    .grid {
      grid-template-columns: repeat(3, minmax(100px, 1fr));
    }
  }
  @media screen and (max-width: 600px){
    .grid {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }
    ul{
      flex-direction: column;
    }
  }
  @media screen and (max-width: 375px){
    .grid {
      grid-template-columns: repeat(1, minmax(100px, 1fr));
    }
  } 
</style>