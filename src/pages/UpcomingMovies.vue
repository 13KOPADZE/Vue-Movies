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
        <SliderCardComponent
          :movie="result"
          :background_url="IMG_W1280"
          :imdb_id="imdb_id"
        />
      </slide>
    </hooper>
    <div class="search-background">
      <div class="search-background">
        <div class="genres">
          <ul class="container d-flex wrapped genres ">
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
    <div
      @keydown.esc="showModal = false"
      tabindex="0"
      v-if="showModal"
      @click="showModal = false"
      class="modal is-active"
    >
      <div class="modal-background"></div>

      <div class="modal-content">
        <iframe v-bind:src="movie_trailer"></iframe>

        <button
          class="modal-close is-large"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </div>
    </div>
    <!-- Modal for Trailer -->

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
          class="gridElement movie-info"
          v-for="result in results"
          :key="result.id"
        >
          <MovieCardComponent
            :movie="result"
            :image_url="IMG_W500"
            :launchModal="launchModal"
            :imdb_id="imdb_id"
          />
        </div>
      </div>

      <button
        class="loadMore"
        @click="loadMoreMovies"
        @keydown="SearchResult(query)"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {
  API_KEY,
  API_URL,
  IMG_W500,
  IMG_W1280,
  MOVIE_IMDB_URL,
  YOUTUBE_URL
} from '@/config';
import MovieCardComponent from '../components/MovieCardComponent';
import SliderCardComponent from '../components/SliderCardComponent';
import { Hooper, Slide } from 'hooper';
// import VueRouter from 'vue-router'

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
      nextPage: 2,
      IMG_W500: IMG_W500,
      IMG_W1280: IMG_W1280,
      query: [],
      results: [],
      upcoming: [],
      loadMore: [],
      isHiding: false,
      searchText: true,
      showModal: false,
      genres: [],
      trailers: [],
      YOUTUBE_URL: YOUTUBE_URL
    };
  },
  computed: {
    movie_trailer: function() {
      return this.YOUTUBE_URL + this.trailers;
    }
  },

  methods: {
    launchModal(id) {
      axios
        .get(API_URL + '/3/movie/' + id + '/videos?api_key=' + API_KEY)
        .then(response => {
          this.trailers = response.data.results[0].key;
        });
    },
    imdb_id(id) {
      axios
        .get(API_URL + '/3/movie/' + id + '?api_key=' + API_KEY)
        .then(response => {
          let imdbId = response.data.imdb_id;
          window.open(MOVIE_IMDB_URL + imdbId, '_blank');
        });
    },

    loadMoreMovies() {
      axios
        .get(
          API_URL +
            '/3/movie/upcoming?api_key=' +
            API_KEY +
            '&page=' +
            this.nextPage
        )
        .then(response => {
          this.results = this.results.concat(response.data.results);
        });
      this.nextPage++;
    },

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
