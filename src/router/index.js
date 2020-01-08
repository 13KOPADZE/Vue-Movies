import Vue from 'vue'
import Router from 'vue-router'
import MoviesList from '@/components/MoviesList.vue'
import DetailsView from '@/components/DetailsView.vue'
import ActorDetailsPage from '@/components/ActorDetailsPage.vue'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'movies',
        component: MoviesList
    },
    {
      path: '/popular-movies',
      name: 'popular',
      component: MoviesList
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
  ]
})