<template>
  <div>
    <div class="container tabs is-large">
      <ul>
        <li class="is-active">Searched Movies</li>
      </ul>
    </div>
    <div class="container">
      <div v-if="results.length">
        <div class="grid container">
          <div
            class="gridElement movie-info"
            v-for="result in results"
            :key="result.id"
          >
            <MovieCardComponent
              :movie="result"
              :image_url="IMG_W500"
              :imdb_id="imdb_id"
            />
          </div>
        </div>
        <!-- <GridCardComponent :result="searchResult" /> -->
      </div>

      <div v-else>
        <div class="svg-style">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200px"
            height="200px"
            viewBox="0 0 451.74 451.74"
          >
            <path
              d="M446.324 367.381L262.857 41.692c-15.644-28.444-58.311-28.444-73.956 0L5.435 367.381c-15.644 28.444 4.267 64 36.978 64h365.511c34.133-1.422 54.044-35.556 38.4-64z"
              fill="#e24c4b"
            />
            <path
              d="M225.879 63.025l183.467 325.689H42.413L225.879 63.025z"
              fill="#fff"
            />
            <g fill="#3f4448">
              <path
                d="M196.013 212.359l11.378 75.378c1.422 8.533 8.533 15.644 18.489 15.644 8.533 0 17.067-7.111 18.489-15.644l11.378-75.378c2.844-18.489-11.378-34.133-29.867-34.133-18.49-.001-31.29 15.644-29.867 34.133z"
              />
              <circle cx="225.879" cy="336.092" r="17.067" />
            </g>
          </svg>
          <h1 class="Danger">
            Sorry, we couldn't find any results matching "{{
              this.$route.query.query
            }}"
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import GridCardComponent from './GridCardComponent';
import MovieCardComponent from './MovieCardComponent';
import {
  API_KEY,
  API_URL,
  IMG_W500,
  IMG_W1280,
  MOVIE_IMDB_URL
} from '@/config';
import Events from '../Events';

// import VueRouter from 'vue-router'

export default {
  name: 'search',

  components: {
    // GridCardComponent
    MovieCardComponent
  },

  data() {
    return {
      nextPage: 2,
      IMG_W500: IMG_W500,
      IMG_W1280: IMG_W1280,
      query: [],
      results: [],
      loadMore: []
    };
  },

  methods: {
    setResults(results) {
      this.results = results;
    },
    imdb_id(id) {
      axios
        .get(API_URL + '/3/movie/' + id + '?api_key=' + API_KEY)
        .then(response => {
          let imdbId = response.data.imdb_id;
          window.open(MOVIE_IMDB_URL + imdbId, '_blank');
        });
    }
  },

  created() {
    Events.$on('search', this.setResults);
  }
};
</script>
<style scoped>
.svg-style {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.svg-style h1 {
  margin-top: 30px;
  font-weight: bold;
  color: #1c1c1c;
  text-align: center;
  padding: 20px;
  font-size: 25px;
}
ul li {
  margin-top: 15px;
  color: #3273dc;
  border-bottom: 1px solid #3273dc;
  font-size: 30px;
}
.input {
  border: none;
  border-radius: 30px;
  background: #353535;
  color: aliceblue;
  font-size: 20px;
  outline: none;
  height: 60px;
}
</style>
