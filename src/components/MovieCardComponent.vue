<template>
  <div class="movie-avatar">
    <img :src="movie_img" v-if="movie.poster_path" />
    <img src="../assets/no-image.jpg" v-else />
    <div class="trailer_play">
      <div class="d-flex justify-content-between margin-bottom">
        <div @click="imdb_id(movie.id)">
          <div class="score">
            <div style="color: black;">
              {{ movie.vote_average | imdbNumber }}
            </div>
          </div>
        </div>
        <TrailerComponent :movie="movie" />
      </div>
      <router-link :to="{ name: 'show', params: { id: movie.id } }">
        <span class="movie-name">{{ movie.original_title }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import TrailerComponent from './TrailerComponent';
import { IMG_W500 } from '@/config';
import { imdb_id } from '../helper';

export default {
  name: 'MovieCard',

  props: ['movie'],

  components: {
    TrailerComponent
  },

  computed: {
    movie_img: function() {
      return IMG_W500 + this.movie.poster_path;
    }
  },

  methods: {
    imdb_id(id) {
      return imdb_id(id);
    }
  }
};
</script>

<style scoped>
.margin-bottom {
  margin-bottom: auto;
}
.modal-close {
  position: absolute;
  right: 2%;
  top: -2%;
}
</style>
