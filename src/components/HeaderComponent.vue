<template>
  <header>
    <div class="container d-flex justify-content-between">
      <router-link to="/">
        <div class="d-flex align-items-center logo">
          <IconComponent name="logo" />
          <p>Vue Movies</p>
        </div>
      </router-link>
      <div class="control has-icons-left relative">
        <input
          class="input"
          type="text"
          v-model.trim="query"
          placeholder="Search Movie"
          @keydown.enter="SearchResult(query)"
        />
        <IconComponent name="search" />
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios';
import { API_KEY, API_URL } from '@/config';
import Events from '../Events';
import IconComponent from './IconComponent';

export default {
  name: 'Header',

  components: {
    IconComponent
  },

  data() {
    return {
      search: [],
      query: [],
      results: []
    };
  },
  methods: {
    fetch(query) {
      axios.get(query).then(response => {
        this.results = response.data.results;
        Events.$emit('search', this.results);
      });
    },

    SearchResult(query) {
      let url =
        API_URL + '/3/search/movie?api_key=' + API_KEY + '&query=' + query;
      query == ''
        ? (url = API_URL + '/3/movie/popular?api_key=' + API_KEY)
        : true;

      this.fetch(url);
      this.$router.push({ name: 'search', query: { query } });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: none;
  border-radius: 30px;
  background: #353535;
  color: aliceblue;
  font-size: 20px;
  outline: none;
  height: 50px;
}
p {
  margin-left: 13px;
  font-size: 30px;
  color: #fff;
  font-family: cursive;
}

input:focus {
  box-shadow: none;
}

@media screen and (max-width: 400px) {
  .logo p {
    margin-left: 5px;
    font-size: 15px;
    color: #fff;
    font-family: cursive;
  }
}
</style>
