<template>
  <div>
    <hooper
      :hoverPause="false"
      :itemsToShow="1"
      :progress="true"
      :autoPlay="true"
      :wheelControl="false"
      :playSpeed="3500"
      :infiniteScroll="true"
      :centerMode="true"
    >
      <slide v-for="result in results" :key="result.id">
        <SliderCardComponent :movie="result" />
      </slide>
    </hooper>
    <div class="search-background">
      <div class="search-background">
        <div class="genres">
          <ul class="container d-flex wrapped genres">
            <li
              @click="filterGeners(genres.id)"
              v-for="genres in genres"
              :key="genres.name"
            >
              {{ genres.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container padding-around">
      <div class="tabs is-large">
        <ul>
          <li>
            <router-link to="/popular-movies">Popular Movies</router-link>
          </li>
          <li class="is-active">
            <router-link to="/upcoming-movies">Upcoming Movies</router-link>
          </li>
        </ul>
      </div>

      <div class="grid">
        <div
          class="grid-element movie-info"
          v-for="result in results"
          :key="result.id"
        >
          <MovieCardComponent :movie="result" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_KEY, API_URL, YOUTUBE_URL } from '@/config';
import MovieCardComponent from '../components/MovieCardComponent';
import SliderCardComponent from '../components/SliderCardComponent';
import { Hooper, Slide } from 'hooper';

export default {
  name: 'MoviesList',

  components: {
    MovieCardComponent,
    Hooper,
    Slide,
    SliderCardComponent
  },

  data() {
    return {
      query: [],
      results: [],
      upcoming: [],
      showModal: false,
      genres: [],
      trailers: []
    };
  },
  computed: {
    movie_trailer: function() {
      return YOUTUBE_URL + this.trailers;
    }
  },

  methods: {
    filterGeners(id) {
      let query =
        API_URL +
        '/3/discover/movie?api_key=' +
        API_KEY +
        '&sort_by=popularity.desc&with_genres=' +
        id;
      this.fetch(query);
    },

    fetch(query) {
      axios.get(query).then(response => {
        this.results = response.data.results;
      });
    }
  },

  mounted: function mounted() {
    this.fetch(API_URL + '/3/movie/upcoming?api_key=' + API_KEY);

    axios
      .get(API_URL + '/3/genre/movie/list?api_key=' + API_KEY)
      .then(response => {
        this.genres = response.data.genres;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hooper {
  display: flex;
  outline: none;
}
.padding-around {
  padding: 0 20px;
}
.search-background {
  background: #1c1c1c;
  padding: 30px 20px;
}
</style>
