<template>
  <div>
    <div class="navigation-bar padding-around">
      <div class="container navigation-content">
        <Home />
        <p>|</p>
        <p>{{ results.original_title }}</p>
      </div>
    </div>
    <div class="background" :style="{ backgroundImage: `url(${background})` }">
      <div class="movie-details">
        <div class="movie-image">
          <img v-if="results.poster_path" v-bind:src="posterIMG" />
          <img v-else src="../assets/no-image.jpg" />
        </div>
        <section class="information-section">
          <div>
            <h1>{{ results.original_title }}</h1>
            <h3>Plot</h3>
            <p>{{ results.overview }}</p>
          </div>
          <div class="rating-release">
            <div>
              <h3>Imdb Rating</h3>
              <div class="score">
                <a :href="imdbScore" target="_blank">
                  <div style="color: black;">
                    {{ results.vote_average | imdbNumber }}
                  </div>
                </a>
              </div>
            </div>

            <div class="release">
              <h3>Release Date</h3>
              <p>{{ results.release_date | moment('dddd, MMMM Do YYYY') }}</p>
            </div>
          </div>
          <div
            class="d-flex align-items-center youtube-icon"
            @click="trailerKeyGenerate"
          >
            <h1>Trailer:</h1>
            <button
              class="trailer-button"
              @click="showModal = true"
              @keydown.esc="showModal = false"
            >
              <IconComponent name="trailer" />
            </button>

            <div
              v-if="showModal"
              @click="showModal = false"
              class="modal is-active"
            >
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
            <!-- Modal for Trailer -->
          </div>
        </section>
      </div>
    </div>
    <div class="navigation-bar padding-around">
      <div class="container media-column justify-content-between d-flex">
        <div class="d-flex spacing svg-style">
          <IconComponent name="clock" />
          <p>Runtime: {{ results.runtime | formatHours }}</p>
        </div>
        <div class="d-flex spacing svg-style">
          <IconComponent name="currency" />
          <p>Budget: {{ results.budget | formatNumber }}</p>
        </div>
        <div class="d-flex spacing svg-style">
          <IconComponent name="ticket" />
          <p>Renuve: {{ results.revenue | formatNumber }}</p>
        </div>
      </div>
    </div>

    <div class="container padding-around">
      <h1 class="actors-heading">Actors</h1>
      <div class="actors-grid">
        <div
          class="grid-element actors-grid-element"
          v-for="cast in casts"
          :key="cast.id"
        >
          <ActorCardComponent :actor="cast" :image_url="IMG_W500" />
        </div>
      </div>

      <button
        class="loadMore"
        v-if="!isActive"
        @click="
          showAll();
          isActive = true;
        "
      >
        Show All
      </button>

      <div v-if="similarMovie.length">
        <h1 class="actors-heading">Similar Movies</h1>

        <div class="grid">
          <div
            class="grid-element movie-info"
            v-for="movie in similarMovie"
            :key="movie.id"
          >
            <MovieCardComponent :movie="movie" :image_url="IMG_W500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {
  API_KEY,
  API_URL,
  YOUTUBE_URL,
  MOVIE_IMDB_URL,
  IMG_W1280,
  IMG_W500
} from '@/config';
import Vue from 'vue';
import ActorCardComponent from '../components/ActorCardComponent.vue';
import MovieCardComponent from '../components/MovieCardComponent';
import Home from '../components/BackToHomeComponent';
import IconComponent from '../components/IconComponent';

Vue.use(require('vue-moment'));

var numeral = require('numeral');

var moment = require('moment');

var DurationForma = require('moment-duration-format');

Vue.filter('formatNumber', function(value) {
  return numeral(value).format('$ 0,0');
});

Vue.filter('imdbNumber', function(value) {
  return numeral(value).format('0.0');
});

Vue.filter('formatHours', function(value) {
  return moment.duration(value, 'minutes').format('h [h], m [m]');
});

export default {
  name: 'DetailsView',

  components: {
    ActorCardComponent,
    MovieCardComponent,
    Home,
    IconComponent
  },
  // Refreshing data after changing route
  watch: {
    $route(to, from) {
      this.params = to.params.id;
      console.log('watch:', this.params, from);

      // Getting data of the re renderd movie
      this.currentMovieData();

      // Taking new data of the similar movies

      this.similarMovies();

      // Taking data of the new cast of the current movies

      this.castOfMovie();
    }
  },

  data() {
    return {
      results: [],
      casts: [],
      similarMovie: [],
      trailers: [],
      params: [],
      showModal: false,
      isActive: false,
      IMG_W500: IMG_W500,
      DurationForma: DurationForma
    };
  },
  computed: {
    background: function() {
      if (this.results.backdrop_path) {
        return IMG_W1280 + this.results.backdrop_path;
      } else {
        return '../assets/no-image.jpg';
      }
    },
    posterIMG: function() {
      return this.IMG_W500 + this.results.poster_path;
    },
    imdbScore: function() {
      return MOVIE_IMDB_URL + this.results.imdb_id;
    },
    movieTrailer: function() {
      return YOUTUBE_URL + this.trailers;
    }
  },

  methods: {
    showAll() {
      axios
        .get(
          API_URL +
            '/3/movie/' +
            this.$route.params.id +
            '/credits?api_key=' +
            API_KEY
        )
        .then(response => {
          this.casts = response.data.cast;
        });
    },

    currentMovieData() {
      // Taking data of the current movie
      axios
        .get(
          API_URL + '/3/movie/' + this.$route.params.id + '?api_key=' + API_KEY
        )
        .then(response => {
          this.results = response.data;
        });
    },

    similarMovies() {
      // Taking data of the similar movies
      axios
        .get(
          API_URL +
            '/3/movie/' +
            this.$route.params.id +
            '/similar?api_key=' +
            API_KEY
        )
        .then(response => {
          this.similarMovie = response.data.results;
        });
    },

    castOfMovie() {
      // Taking data of the cast of the current movies
      axios
        .get(
          API_URL +
            '/3/movie/' +
            this.$route.params.id +
            '/credits?api_key=' +
            API_KEY
        )
        .then(response => {
          this.casts = response.data.cast.slice(0, 6);
        });
    },

    trailerKeyGenerate() {
      axios
        .get(
          API_URL +
            '/3/movie/' +
            this.$route.params.id +
            '/videos?api_key=' +
            API_KEY
        )
        .then(response => {
          this.trailers = response.data.results[0].key;
        });
    }
  },

  mounted() {
    this.currentMovieData();

    this.similarMovies();

    this.castOfMovie();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-image {
  width: 300px;
  float: left;
}
.movie-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: all 0.3s ease 0s;
  border-radius: 20px;
}

.rating-release {
  display: flex;
  justify-content: flex-start;
}
.svg-style p {
  margin-right: 10px;
}
.svg-style {
  align-items: center;
}

.actors-heading {
  margin-top: 20px;
  font-family: Abel, sans-serif;
  font-size: 48px;
  color: rgb(0, 0, 0);
}
.actors-grid-element:nth-child(4n + 4) {
  background: #eaeaea;
}
.actors-grid-element:nth-child(4n + 3) {
  background: #eaeaea;
}

.score {
  margin-top: 15px;
}
.youtube-icon h1 {
  font-size: 25px;
  padding-right: 20px;
}

.youtube-icon {
  margin-top: 15px;
}
.trailer-SVG {
  cursor: pointer;
  transition: 0.5s;
}
.trailer-SVG:hover {
  transition: 0.5s;
  transform: scale(1.1);
}

@media screen and (max-width: 550px) {
  .media-column {
    flex-direction: column;
    padding: 20px;
  }
  .spacing {
    margin: 10px;
  }
}
</style>
