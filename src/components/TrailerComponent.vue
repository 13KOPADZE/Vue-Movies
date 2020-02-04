<template>
  <div>
    <div>
      <button
        class="trailer-button"
        @click="trailerKeyGenerate(movie.id)"
        @keydown.esc="showModal = false"
      >
        <IconComponent name="trailer" />
      </button>
    </div>
    <div v-if="showModal" @click="showModal = false" class="modal is-active">
      <div class="modal-background"></div>

      <div class="modal-content">
        <iframe v-bind:src="movieTrailer"></iframe>

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
import { API_URL, API_KEY, YOUTUBE_URL } from '@/config';
import IconComponent from './IconComponent';

export default {
  components: {
    IconComponent
  },
  props: ['movie'],

  data() {
    return {
      showModal: false,
      trailers: []
    };
  },
  computed: {
    movieTrailer: function() {
      return YOUTUBE_URL + this.trailers;
    }
  },
  methods: {
    trailerKeyGenerate(id) {
      axios
        .get(API_URL + '/3/movie/' + id + '/videos?api_key=' + API_KEY)
        .then(response => {
          this.trailers = response.data.results[0].key;
        });
      this.showModal = true;
      console.log(this.trailerKeyGenerate);
    }
  }
};
</script>
