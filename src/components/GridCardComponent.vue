<template>
  <div>
    <div class="grid">
      <div
        class="grid-element movie-info"
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

    <button class="loadMore" @click="loadMoreMovies">
      Load More
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import MovieCardComponent from './MovieCardComponent.vue';
import { API_KEY, API_URL, IMG_W500 } from '@/config';
import { imdb_id } from '../helper';

export default {
  name: 'GridCardComponent',

  props: ['SearchResult'],

  components: {
    MovieCardComponent
  },

  data() {
    return {
      currentPage: 1,
      IMG_W500: IMG_W500,
      query: [],
      results: []
    };
  },

  methods: {
    loadMoreMovies() {
      axios
        .get(
          API_URL +
            '/3/movie/popular?api_key=' +
            API_KEY +
            '&page=' +
            this.currentPage
        )
        .then(response => {
          this.results = this.results.concat(response.data.results);
        });
      this.currentPage++;
    },

    // Taking IMDB_ID for all movies
    imdb_id(id) {
      return imdb_id(id);
    }
  },
  mounted() {
    this.loadMoreMovies(API_URL + '/3/movie/popular?api_key=' + API_KEY);
  }
};
</script>
