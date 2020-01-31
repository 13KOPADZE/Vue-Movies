<template>
  <div>
    <div class="container tabs is-large padding-around">
      <ul>
        <li class="is-active">Searched Movies</li>
      </ul>
    </div>
    <div class="container padding-around">
      <div v-if="results.length">
        <div class="grid container">
          <div
            class="grid-element movie-info"
            v-for="result in results"
            :key="result.id"
          >
            <MovieCardComponent :movie="result" />
          </div>
        </div>
      </div>

      <div v-else>
        <div class="svg-style">
          <IconComponent name="warning" />
          <h1 class="Danger">
            Sorry, we couldn't find any results matching "{{
              this.$route.query.query
            }}"
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCardComponent from './MovieCardComponent';
import Events from '../Events';
import IconComponent from './IconComponent';

export default {
  name: 'search',

  components: {
    MovieCardComponent,
    IconComponent
  },

  data() {
    return {
      query: [],
      results: []
    };
  },

  methods: {
    setResults(results) {
      this.results = results;
    }
  },
  created() {
    Events.$on('search', this.setResults);
  }
};
</script>
<style scoped>
.svg-style {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.svg-style h1 {
  margin-top: 30px;
  font-weight: bold;
  color: #1c1c1c;
  text-align: center;
  padding: 20px;
  font-size: 25px;
}
ul li {
  margin-top: 15px;
  color: #3273dc;
  border-bottom: 1px solid #3273dc;
  font-size: 30px;
}
</style>
