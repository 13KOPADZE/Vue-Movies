<template>
  <div>
    <div class="search-background">
      <div class="container control">
          <p class="control has-icons-left relative">
              <input class="input" type="text" placeholder="Search Movie" v-model='query' @keyup='SearchResult(query)'>
              <svg class="pos" xmlns="http://www.w3.org/2000/svg" width="25px"  viewBox="0 0 512 512"><path fill="#fff" d="M495 466.2L377.2 348.4c29.2-35.6 46.8-81.2 46.8-130.9C424 103.5 331.5 11 217.5 11 103.4 11 11 103.5 11 217.5S103.4 424 217.5 424c49.7 0 95.2-17.5 130.8-46.7L466.1 495c8 8 20.9 8 28.9 0 8-7.9 8-20.9 0-28.8zm-277.5-83.3C126.2 382.9 52 308.7 52 217.5S126.2 52 217.5 52C308.7 52 383 126.3 383 217.5s-74.3 165.4-165.5 165.4z"/></svg>    
          </p>
      </div>
    </div>
    <div class="container paddingAround">
      <div class="tabs is-large">
        <ul>
          <li :class="{'is-active': isActive}" @click="toggleClass"><router-link to="/popular-movies">Popular Movies</router-link></li>
          <li><router-link to="/upcoming-movies">Upcoming Movies</router-link></li>
        </ul>
      </div>
      <div class="grid">
        <div class="gridElement" v-for='result in results' :key='result.id'>  
            <img v-bind:src="'http://image.tmdb.org/t/p/w500/' + result.poster_path">
        </div>
      </div>

      <button class="loadMore">Load More</button>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {API_KEY, API_URL} from '@/config'

export default {
  name: 'MoviesList',
  data () {
    return {
      query: '',
      results: '',
      isActive: false
    }
  },

  methods: {

    toggleClass(){
      this.isActive = true;
    },

    fetch(query) {
      axios.get(query)
      .then(response => { 
        this.results = response.data.results 
      })  
    },
    
    SearchResult(query) {
      this.fetch(API_URL+'/3/search/movie?api_key='+API_KEY+'&query=' + query);
    }
    
  },
  
    
  mounted: function mounted () {
    this.fetch(API_URL+'/3/movie/popular?api_key='+API_KEY);
  }

  
      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .active{
    color: aqua
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
  }
  .gridElement{
    animation: 0.5s ease 0s 1 normal none running animateGrid;
  }

  h1{
      font-family: Abel, sans-serif;
      font-size: 42px;
      color: black;
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
  }
  @media screen and (max-width: 375px){
    .grid {
      grid-template-columns: repeat(1, minmax(100px, 1fr));
    }
  } 
</style>