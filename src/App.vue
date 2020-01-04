<template>
<div>
  <Header /> <!-- HeaderComponent -->

  <div id="app"><!-- Main Content  -->

    <MovieBackground /><!-- Background of decoration and text  -->

    <MoviesList />
    <p>
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    <router-view></router-view>
  </div>

</div>
</template>

<script>
import 'bulma/css/bulma.css'
import Header from './components/Header.vue'
import MovieBackground from './components/informationDesk.vue'
import MoviesList from './components/MoviesList.vue'



export default {
  name: 'app',
  components: {
    Header,
    MovieBackground,
    MoviesList
  }
}
</script>

<style>
body{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box !important;
}
header{
  display: flex;
  background: rgb(28, 28, 28);
  padding: 30px 20px;
}

</style>
