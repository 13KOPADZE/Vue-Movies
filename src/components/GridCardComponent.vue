<template>
  <div>
    <div class="grid">
      <div
        class="grid-element movie-info"
        v-for="result in results"
        :key="result.id"
      >
        <MovieCardComponent :movie="result" />
      </div>
    </div>

    <button class="loadMore" @click="MovieList">
      Load More
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import MovieCardComponent from './MovieCardComponent.vue';
import { API_KEY, API_URL } from '@/config';

export default {
  name: 'GridCardComponent',

  components: {
    MovieCardComponent
  },

  data() {
    return {
      currentPage: 1,
      query: [],
      results: []
    };
  },

  methods: {
    MovieList() {
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
    }
  },
  mounted() {
    this.MovieList();
  }
};
</script>
