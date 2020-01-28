<template>
  <div>
    <Header />
    <!-- HeaderComponent -->

    <div id="app">
      <!-- Main Content  -->

      <router-link to="/"></router-link>

      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import 'bulma/css/bulma.css';
import 'nprogress/nprogress.css';
import Header from './pages/Header.vue';
import NProgress from 'nprogress';
import Footer from './pages/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  mounted() {
    // Add a request interceptor
    axios.interceptors.request.use(function(config) {
      NProgress.start();
      return config;
    });
    // Add a response interceptor
    axios.interceptors.response.use(function(config) {
      NProgress.done();
      return config;
    });
  }
};
</script>

<style>
@import url('style/style.css');
#app {
  min-height: calc(100vh - 225px);
}
</style>
