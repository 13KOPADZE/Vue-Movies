<template>
  <div>
    <div class="navigation-bar padding-around">
      <div class="container navigation-content">
        <Home />
        <p>|</p>
        <p>{{ results.name }}</p>
      </div>
    </div>
    <div
      class="background"
      :style="{
        backgroundImage: `url(${background})`
      }"
      v-if="results.profile_path"
    >
      <div class="movie-details">
        <div class="actor-image">
          <img v-bind:src="actor_img" v-if="results.profile_path" />
          <img src="../assets/no-image.jpg" v-else />
        </div>
        <section class="information-section">
          <div>
            <h1>{{ results.name }}</h1>
            <h3>Biography</h3>
            <p v-if="results.biography.length">{{ results.biography }}</p>
            <p v-else>No Info</p>
          </div>
          <div class="actor-info">
            <div>
              <h3>Imdb Id</h3>
              <div class="imdb_id" v-if="results.imdb_id">
                <a :href="actor_imdb_link" target="_blank">
                  <div style="color: #fff !important">
                    {{ results.imdb_id }}
                  </div>
                </a>
              </div>
              <p v-else>No Info</p>
            </div>

            <div class="release">
              <h3>Place Of Birth</h3>
              <p v-if="results.place_of_birth">
                {{ results.place_of_birth }}
              </p>
              <p v-else>No Info</p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="navigation-bar">
      <div class="container justify-content-between d-flex">
        <div class="actor-info padding-around">
          <div>
            <h3>Gender</h3>
            <div>
              <div class="gender" v-if="results.gender == 1">
                <IconComponent name="female_icon" />
              </div>
              <div class="gender" v-else>
                <IconComponent name="male_icon" />
              </div>
            </div>
          </div>
          <div class="release">
            <h3>Place Of Birth</h3>
            <p v-if="results.place_of_birth">
              {{ results.place_of_birth }}
            </p>
            <p v-else>No Info</p>
          </div>
          <div class="birthday">
            <h3>Date Of Birth</h3>
            <p v-if="results.birthday">
              {{ results.birthday | moment('dddd, MMMM Do YYYY') }}
            </p>
            <p v-else>No Info</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container padding-around">
      <h1 class="actors-heading">Movies</h1>

      <div class="grid">
        <div
          class="grid-element movie-info"
          v-for="movie in movies"
          :key="movie.id"
        >
          <MovieCardComponent
            :movie="movie"
            :image_url="IMG_W500"
            :imdb_id="imdb_id"
          />
        </div>
      </div>
      <button
        class="loadMore"
        v-if="!isActive"
        @click="showAll"
        v-on:click="isActive = true"
      >
        Show All
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import {
  API_KEY,
  API_URL,
  IMG_W500,
  IMG_W1280,
  ACTOR_IMDB_URL
} from '@/config';
import MovieCardComponent from '../components/MovieCardComponent';
import Home from '../components/BackToHomeComponent';
import IconComponent from '../components/IconComponent';
import { imdb_id } from '../helper';

Vue.use(require('vue-moment'));

export default {
  name: 'ActorDetailsPage',

  components: {
    MovieCardComponent,
    Home,
    IconComponent
  },

  data() {
    return {
      results: [],
      movies: [],
      IMG_W500: IMG_W500,
      isActive: false
    };
  },
  computed: {
    background: function() {
      return IMG_W1280 + this.results.profile_path;
    },
    actor_img: function() {
      return this.IMG_W500 + this.results.profile_path;
    },
    actor_imdb_link: function() {
      return ACTOR_IMDB_URL + this.results.imdb_id + '/';
    }
  },

  methods: {
    imdb_id(id) {
      return imdb_id(id);
    },

    // Request for DATA of actor

    actorData() {
      axios
        .get(
          API_URL + '/3/person/' + this.$route.params.id + '?api_key=' + API_KEY
        )
        .then(response => {
          this.results = response.data;
        });
    },

    // Request for DATA About Movies

    generateMovies() {
      axios
        .get(
          API_URL +
            '/3/person/' +
            this.$route.params.id +
            '/movie_credits?api_key=' +
            API_KEY
        )
        .then(response => {
          this.movies = response.data.cast.slice(0, 10);
        });
    },
    showAll() {
      axios
        .get(
          API_URL +
            '/3/person/' +
            this.$route.params.id +
            '/movie_credits?api_key=' +
            API_KEY
        )
        .then(response => {
          this.movies = response.data.cast;
        });
    }
    // Request for DATA About Movies
  },

  mounted() {
    this.actorData();

    this.generateMovies();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.actor-image {
  width: 300px;
  float: left;
}
.actor-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: all 0.3s ease 0s;
  border-radius: 20px;
}

.actor-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.gender {
  text-align: center;
}
.imdb_id {
  margin-top: 15px;
}

.actors-heading {
  margin-top: 20px;
  font-family: Abel, sans-serif;
  font-size: 48px;
  color: rgb(0, 0, 0);
}

.actor-name {
  display: block;
  font-size: 18px;
  margin: 10px 0px 0px;
}
.actor-character {
  display: block;
  font-size: 16px;
  margin: 0px 0px 10px;
}
p {
  font-family: Abel, sans-serif;
  font-size: 18px;
  float: left;
  color: rgb(255, 255, 255);
  padding-right: 10px;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .actor-info p {
    font-size: 18px;
  }
}
@media screen and (max-width: 600px) {
  .actor-image {
    margin: 0 auto;
    float: none;
    width: 300px;
  }
  .justify-content-between {
    flex-direction: column;
    padding: 20px;
  }
  .spacing {
    margin: 10px;
  }
}
</style>
