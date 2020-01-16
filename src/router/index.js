import Vue from 'vue'
import Router from 'vue-router'
import MoviesList from '@/components/MoviesList.vue'
import DetailsView from '@/components/DetailsView.vue'
import ActorDetailsPage from '@/components/ActorDetailsPage.vue'
import NotFound from '@/components/NotFound'
import UpcomingMovies from '@/components/UpcomingMovies'
import Search from '@/components/Search'



Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'movies',
        component: MoviesList
    },
    {
      path: '/search',
      name: 'search',
      component: Search
  },
    {
      path: '/popular-movies',
      name: 'popular',
      component: MoviesList
    },
    {
      path: '/upcoming-movies',
      name: 'upcoming',
      component: UpcomingMovies
    },
    {
        path: '/movies/:id',
        name: 'show',
        component: DetailsView
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
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})