<template>
  <header>
    <a id="focus" href="#focus"></a>
      <div class="container d-flex justify-content-between">
        <router-link to="/">
          <div class="d-flex align-items-center logo"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" viewBox="0 0 58 58"><path fill="#fff" d="M36.537 28.156l-11-7a1.005 1.005 0 00-1.019-.033A1.002 1.002 0 0024 22v14a1.001 1.001 0 001.537.844l11-7a1.002 1.002 0 000-1.688zM26 34.179V23.821L34.137 29 26 34.179z"/><path fill="#fff" d="M57 6H1a1 1 0 00-1 1v44a1 1 0 001 1h56a1 1 0 001-1V7a1 1 0 00-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"/></svg>
            <p>Vue Movies</p>
          </div>
        </router-link>
        <div class="control has-icons-left relative">
            <input class="input" type="text" v-model.trim='query' @keyup='SearchResult(query)' placeholder="Search Movie">
            <svg class="pos" xmlns="http://www.w3.org/2000/svg" width="25px"  viewBox="0 0 512 512"><path fill="#fff" d="M495 466.2L377.2 348.4c29.2-35.6 46.8-81.2 46.8-130.9C424 103.5 331.5 11 217.5 11 103.4 11 11 103.5 11 217.5S103.4 424 217.5 424c49.7 0 95.2-17.5 130.8-46.7L466.1 495c8 8 20.9 8 28.9 0 8-7.9 8-20.9 0-28.8zm-277.5-83.3C126.2 382.9 52 308.7 52 217.5S126.2 52 217.5 52C308.7 52 383 126.3 383 217.5s-74.3 165.4-165.5 165.4z"/></svg>    
        </div>          
      </div>
  </header>
</template>

<script>

import axios from 'axios'
import {API_KEY, API_URL, } from '@/config'


export default {
  
  name: 'Header',
  
  data(){

    return {
    
      search: '',
      query: '',
      results: '',
    
    };

  },
  methods: {

    fetch(query) {
      axios.get(query)
      .then(response => { 
        this.results = response.data.results
      });
    },

    SearchResult(query) {
      let url = API_URL + '/3/search/movie?api_key=' + API_KEY + '&query=' + query;
      this.fetch(url);

      this.$router.push({name: 'search', query: { query } });

    },
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ::placeholder{
    font-size: 20px;
    color: #ccc;
  }
  .d-flex{
    display: flex !important;
  }
  .align-items-center{
    align-items: center;
  }
  .relative{
    position: relative;
  }
  .pos{
    position: absolute;
    left: 16px;
    top: 13px;
  }
  input{
    border: none;
    border-radius: 30px;
    background: #353535;
    color: aliceblue;
    font-size: 20px;
    outline: none;
    height: 50px;
  }
  p{
    margin-left: 13px !important;
    font-size: 30px;
    color: #fff;
    font-family: cursive;
  }
  .justify-content-between{
    justify-content: space-between;
  }

  input:focus{
    box-shadow: none;
  }

  @media screen and (max-width: 400px) {
    .logo p{
      margin-left: 5px !important;
      font-size: 15px;
      color: #fff;
      font-family: cursive;
    }
  }
</style>