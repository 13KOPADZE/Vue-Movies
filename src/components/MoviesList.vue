<template>
<div>
  <div class="search-background">
    <div class="container control">
        <p class="control has-icons-left rela">
            <input class="input" type="text" placeholder="Search Movie" v-model='query' @keyup='getResult(query)'>
            <svg class="pos" xmlns="http://www.w3.org/2000/svg" width="25px"  viewBox="0 0 512 512"><path fill="#fff" d="M495 466.2L377.2 348.4c29.2-35.6 46.8-81.2 46.8-130.9C424 103.5 331.5 11 217.5 11 103.4 11 11 103.5 11 217.5S103.4 424 217.5 424c49.7 0 95.2-17.5 130.8-46.7L466.1 495c8 8 20.9 8 28.9 0 8-7.9 8-20.9 0-28.8zm-277.5-83.3C126.2 382.9 52 308.7 52 217.5S126.2 52 217.5 52C308.7 52 383 126.3 383 217.5s-74.3 165.4-165.5 165.4z"/></svg>    
        </p>
    </div>
  </div>
  <div class="container">
    <h1>
      Popular Movies
    </h1>
    <div class="grid">
      <div class="gridElement" v-for='result in results' :key='result.id'>
        <a href="">
          <img v-bind:src="'http://image.tmdb.org/t/p/w500/' +    result.poster_path" width='200px'>
        </a> 
      </div>
    </div>

    <nav class="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous">Previous</a>
    <a class="pagination-next">Next page</a>
    <ul class="pagination-list">
      <li><a class="pagination-link is-current" aria-label="Goto page 1">1</a></li>
    </ul>
    </nav>
    
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
      results: ''
    }
  },
  methods: {

    fetch(query) {
      axios.get(query)
      .then(response => { 
        this.results = response.data.results 
      })  
    },
    
    getResult(query) {
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
    a{
      transition: 0.5s;
    }
    a:hover{
      opacity: 0.8;
      transition: 0.5s;
    }
    img{
      width: 100%;
      height: 330px;
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
    .rela{
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
    .control{
        font-size: 1.5rem !important;
    }
    
</style>