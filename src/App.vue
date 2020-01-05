<template>
<div>
  <Header /><!-- HeaderComponent -->
  
  <div id="app"><!-- Main Content  -->

    <!-- <MovieBackground />

    <MoviesList /> -->

    <DetailsView />
    

  </div>

</div>
</template>

<script>
import 'bulma/css/bulma.css'
import Header from './components/Header.vue'
// import MovieBackground from './components/informationDesk.vue'
// import MoviesList from './components/MoviesList.vue'
import DetailsView from './components/DetailsView.vue'

export default {
  name: 'app',
  components: {
    Header,
    // MovieBackground,
    // MoviesList,
    DetailsView
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
