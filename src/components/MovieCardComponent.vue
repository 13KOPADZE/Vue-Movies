<template>
  <div class="movie-avatar">
    <img :src="image_url + movie.poster_path" v-if="movie.poster_path !== null">
    <img src="../assets/no-image.jpg" v-else>
    <div class="trailer_play">
      <div class="d-flex justify-content-between">
        
        <div @click="imdb_id(movie.id)">
          <div class="score"><div style="color: black;">{{movie.vote_average | imdbNumber}}</div></div>
        </div>

        <div @click="launchModal(movie.id)">
          <svg style="cursor: pointer;" @click="showModal = true"   xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 461.001 461.001"><path d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.751 169.663l-126.06 60.123c-3.359 1.602-7.239-.847-7.239-4.568V168.607c0-3.774 3.982-6.22 7.348-4.514l126.06 63.881c3.748 1.899 3.683 7.274-.109 9.082z" fill="#f61c0d"/></svg>
        </div>
      </div>
      <router-link :to="{ name: 'show', params: { id: movie.id }}">
        <span class="movie-name">{{movie.original_title}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>


export default {

    name: 'MovieCard',

    props: ['movie', 'image_url', 'launchModal', 'imdb_id']
    
}
</script>  

<style scoped>

  .grid{
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, minmax(100px, 1fr));
    gap: 40px;
    margin-top: 40px;
  }
  .gridElement{
    animation: 0.5s ease 0s 1 normal none running animateGrid;
    position: relative;
  }
  .movie-info{
    display: block;
    font-family: Abel, sans-serif;
    color: rgb(255, 255, 255);
    text-align: center;
    background: rgb(28, 28, 28);
    border-radius: 20px;
    padding: 5px;
    height: 100%;
  }
  .movie-avatar{
    width: 100%;
    position: relative;
  }
  .movie-avatar img{
    border-radius: 20px;
  }
  .movie-avatar .trailer_play{
    border-radius: 10px;
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .8);
    text-align: center;
    width: 100%;
    height: 100%;
    transition: 0.5s;
  }
  .movie-avatar:hover .trailer_play{
    display: block !important;
    transition: 0.5s;
    padding: 10px;
  }
  .d-flex{
      display: flex !important;
  }
  .justify-content-between{
      justify-content: space-between;
  }
  .score{
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    color: rgb(0, 0, 0);
    font-weight: 800;
    background: rgb(255, 255, 255);
    border-radius: 25px;
    margin: 0 auto;
  }
  .movie-name{
    margin-top: 52px;
    display: block;
    color: #fff;
  }

  @media screen and (max-width: 1024px){
    .grid {
      grid-template-columns: repeat(4, minmax(100px, 1fr));
      gap: 40px;
    }
  }
  @media screen and (max-width: 768px){
    .grid {
      grid-template-columns: repeat(3, minmax(100px, 1fr));
    }
  }
  @media screen and (max-width: 600px){
    .grid {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }
  }
  @media screen and (max-width: 375px){
    .grid {
      grid-template-columns: repeat(1, minmax(100px, 1fr));
    }
  } 
</style>