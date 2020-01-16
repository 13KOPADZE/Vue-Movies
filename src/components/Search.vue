<template>
  <div>
    <div class="tabs is-large container">
      <ul>
        <li class="is-active">Searched Movies</li>
      </ul>
    </div>
  </div>   
</template>

<script>
import axios from 'axios'
import {API_KEY, API_URL, IMG_W500, IMG_W1280} from '@/config'
// import VueRouter from 'vue-router'

export default {

  name: 'search',
  
  data () {
    return {
      nextPage: 2,
      IMG_W500: IMG_W500,
      IMG_W1280: IMG_W1280,
      query: '',
      results: '',
      loadMore: '',
    }
  },

  methods: {

    loadMoreMovies(){
      axios.get(API_URL + '/3/movie/popular?api_key=' + API_KEY + '&page=' + this.nextPage)
      .then(response => { 
          this.results = this.results.concat(response.data.results);
      })
      this.nextPage++;

    },

    fetch(query) {
      axios.get(query)
      .then(response => { 
        this.results = response.data.results
      });
    },
    
    SearchResult(query) {
      let url = API_URL+'/3/search/movie?api_key='+API_KEY+'&query=' + query;
      query == ''? url = API_URL+'/3/movie/popular?api_key='+API_KEY: true;
      this.fetch(url);

      this.$router.push({ name: 'search', query: {query} });

    }
  },    
}
</script>
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
  ul li{
    margin-top: 15px;
    color: #3273dc !important;
    border-bottom: 1px solid #3273dc !important;
    font-size: 30px;
  }
  .wrapped li{
    padding: 15px;
    cursor: pointer;
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
  img{
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: all 0.3s ease 0s;
    border-radius: 20px;
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
  .movie-name{
    color: #fff;
    display: block;
    font-size: 16px;
    margin: 0px 0px 10px;
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