<template>
  <div class="movie-avatar" @keydown.esc="showModal = false" tabindex="0">
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

        <div @click="launchModal(movie.id)">
          <button class="trailer-button" @click="showModal = true">
            <IconComponent name="trailer" />
          </button>
        </div>
      </div>
      <router-link :to="{ name: 'show', params: { id: movie.id } }">
        <span class="movie-name">{{ movie.original_title }}</span>
      </router-link>
    </div>
    <div v-if="showModal" @click="showModal = false" class="modal is-active">
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
  </div>
</template>

<script>
import axios from 'axios';
import IconComponent from './IconComponent';
import { API_URL, API_KEY, YOUTUBE_URL } from '@/config';

export default {
  name: 'MovieCard',

  props: ['movie', 'image_url', 'imdb_id'],

  components: {
    IconComponent
  },

  data() {
    return {
      showModal: false,
      trailers: []
    };
  },

  computed: {
    movie_img: function() {
      return this.image_url + this.movie.poster_path;
    },
    movie_trailer: function() {
      return YOUTUBE_URL + this.trailers;
    }
  },

  methods: {
    launchModal(id) {
      axios
        .get(API_URL + '/3/movie/' + id + '/videos?api_key=' + API_KEY)
        .then(response => {
          this.trailers = response.data.results[0].key;
        });
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
