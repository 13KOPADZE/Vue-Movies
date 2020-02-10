import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import MovieDetailsPage from '@/pages/MovieDetailsPage';
import ActorDetailsPage from '@/pages/ActorsDetailsPage';
import NotFound from '@/pages/NotFoundPage';
import UpcomingMovies from '@/pages/UpcomingMoviesPage';
import SearchComponent from '@/components/SearchComponent';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'movies',
      component: HomePage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchComponent
    },
    {
      path: '/popular-movies',
      name: 'popular',
      component: HomePage
    },
    {
      path: '/upcoming-movies',
      name: 'upcoming',
      component: UpcomingMovies
    },
    {
      path: '/movies/:id',
      name: 'show',
      component: MovieDetailsPage
    },
    {
      path: '/actor/:id',
      name: 'actor',
      component: ActorDetailsPage
    },
    {
      path: '*',
      name: 'Notfound',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
