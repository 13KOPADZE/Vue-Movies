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
      :class="{ 'display-none': isHiding }"
    >
      <slide v-for="result in results" :key="result.id">
        <SliderCardComponent
          :movie="result"
          :background_url="IMG_W1280"
          :imdb_id="imdb_id"
        />
      </slide>
    </hooper>
    <div></div>
    <div class="search-background">
      <div class="container control">
        <p class="control has-icons-left relative">
          <input
            class="input"
            type="text"
            placeholder="Search Movie"
            v-model.trim="query"
            @keyup="searchResult(query)"
          />
          <svg
            class="absolute"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            viewBox="0 0 512 512"
          >
            <path
              fill="#fff"
              d="M495 466.2L377.2 348.4c29.2-35.6 46.8-81.2 46.8-130.9C424 103.5 331.5 11 217.5 11 103.4 11 11 103.5 11 217.5S103.4 424 217.5 424c49.7 0 95.2-17.5 130.8-46.7L466.1 495c8 8 20.9 8 28.9 0 8-7.9 8-20.9 0-28.8zm-277.5-83.3C126.2 382.9 52 308.7 52 217.5S126.2 52 217.5 52C308.7 52 383 126.3 383 217.5s-74.3 165.4-165.5 165.4z"
            />
          </svg>
        </p>
      </div>

      <div class="genres" :class="{ 'display-none': isHiding }">
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

    <div
      class="container tabs is-large"
      :class="{ 'display-none': searchText }"
    >
      <ul>
        <li class="searchText">Searched Movies</li>
      </ul>
    </div>

    <div class="container padding-around">
      <div class="tabs is-large" :class="{ 'display-none': isHiding }">
        <ul>
          <li class="is-active">
            <router-link to="/popular-movies">Popular Movies</router-link>
          </li>
          <li>
            <router-link to="/upcoming-movies">Upcoming Movies</router-link>
          </li>
        </ul>
      </div>
      <!-- Grid -->
      <GridCardComponent />
      <!--  -->
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
import SliderCardComponent from './SliderCardComponent.vue';
import GridCardComponent from './GridCardComponent';

import { Hooper, Slide } from 'hooper';

export default {
  name: 'MoviesList',

  components: {
    SliderCardComponent,
    GridCardComponent,
    Hooper,
    Slide
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
      genres: [],
      MOVIE_IMDB_URL: MOVIE_IMDB_URL,
      YOUTUBE_URL: YOUTUBE_URL,
      trailers: [],
      movie_id: []
    };
  },

  methods: {
    /**
     *
     */

    loadMoreMovies() {
      axios
        .get(
          API_URL +
            '/3/movie/popular?api_key=' +
            API_KEY +
            '&page=' +
            this.nextPage
        )
        .then(response => {
          this.results = this.results.concat(response.data.results);
        });
      this.nextPage++;
    },

    /**
     *
     */

    launchModal(id) {
      axios
        .get(API_URL + '/3/movie/' + id + '/videos?api_key=' + API_KEY)
        .then(response => {
          this.trailers = response.data.results[0].key;
        });
    },

    /**
     *
     */

    imdb_id(id) {
      axios
        .get(API_URL + '/3/movie/' + id + '?api_key=' + API_KEY)
        .then(response => {
          let imdbId = response.data.imdb_id;
          window.open(MOVIE_IMDB_URL + imdbId, '_blank');
        });
    },

    /**
     *
     */
    filterGeners(id) {
      let query =
        API_URL +
        '/3/discover/movie?api_key=' +
        API_KEY +
        '&sort_by=popularity.desc&with_genres=' +
        id;
      this.fetch(query);
    },

    /**
     *
     */
    fetch(query) {
      axios.get(query).then(response => {
        this.results = response.data.results;
      });
    },

    searchResult(query) {
      let url =
        API_URL + '/3/search/movie?api_key=' + API_KEY + '&query=' + query;
      query == ''
        ? (url = API_URL + '/3/movie/popular?api_key=' + API_KEY)
        : true;
      this.fetch(url);

      if (query == '') {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    }

    /**
     *
     */
  },

  mounted() {
    this.fetch(API_URL + '/3/movie/popular?api_key=' + API_KEY);

    axios
      .get(API_URL + '/3/movie/upcoming?api_key=' + API_KEY)
      .then(response => {
        this.upcoming = response.data.results;
      });

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
.searchText {
  align-items: center;
  border-bottom-color: #dbdbdb;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  color: #4a4a4a;
  display: flex;
  justify-content: center;
  margin-bottom: -1px;
  padding: 0.5em 1em;
  vertical-align: top;
}

.informationText {
  height: 100%;
  color: rgb(255, 255, 255);
  background: rgba(0, 0, 0, 0);
  margin-bottom: 0px;
}
.flex-direction-column {
  max-width: 700px;
  margin-bottom: 50px;
  flex-direction: column;
  padding: 20px;
}
.hooper {
  display: flex;
  outline: none;
}
.wrapped {
  flex-wrap: wrap;
}
.wrapped li {
  padding: 15px;
  cursor: pointer;
}
.active {
  color: aqua;
}
input:focus {
  box-shadow: none;
}
a {
  transition: 0.5s;
}
a:hover {
  opacity: 0.8;
  transition: 0.5s;
}
.search-background {
  background: #1c1c1c;
  padding: 30px 20px;
}
.input {
  border: none;
  border-radius: 30px;
  background: #353535;
  color: aliceblue;
  font-size: 20px;
  outline: none;
  height: 60px;
}
</style>
