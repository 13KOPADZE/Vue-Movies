<template>
  <div
    class="background"
    :style="{
      backgroundImage: `url(${sliderBackground})`
    }"
    v-if="movie.backdrop_path"
  >
    <div class="container information-text d-flex align-items-center">
      <div class="information-board">
        <div>
          <div class="rating-release justify-content-between d-flex">
            <h1>{{ movie.original_title }}</h1>

            <div class="imdb-score">
              <h3>Imdb Rating</h3>
              <div @click="imdbId(movie.id)">
                <div class="score">
                  <div style="color: black;">
                    {{ movie.vote_average | imdbNumber }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3>Plot</h3>
          <p>{{ movie.overview }}</p>
        </div>

        <div class="about-movie">
          <router-link :to="{ name: 'show', params: { id: movie.id } }">
            <button class="movie-details-button">
              Movie Details
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IMG_W1280 } from '@/config';
import { imdb_id } from '../helper';
export default {
  name: 'SliderCard',

  props: ['movie', 'background_url'],

  computed: {
    sliderBackground: function() {
      return IMG_W1280 + this.movie.backdrop_path;
    }
  },
  methods: {
    imdbId(id) {
      return imdb_id(id);
    }
  }
};
</script>

<style scoped>
.information-text {
  height: 100%;
  color: rgb(255, 255, 255);
  background: rgba(0, 0, 0, 0);
  margin-bottom: 0px;
}
.information-board {
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
}
.imdb-score h3 {
  padding: 0px 0 10px 0;
}
.movie-details-button {
  cursor: pointer;
  width: 125px;
  height: 35px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  font-weight: bold;
  background: mintcream;
  transition: 0.5s;
}
.movie-details-button:hover {
  transform: scale(1.05);
  transition: 0.5s;
}
h1 {
  color: #fff;
  font-size: 24px;
}
p {
  padding: 20px 0;
  color: rgb(255, 255, 255);
}
</style>
