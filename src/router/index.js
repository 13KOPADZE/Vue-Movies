import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesList from '@/components/MoviesList.vue'
import DetailsView from '@/components/DetailsView.vue'


Vue.use(VueRouter)

export default new VueRouter({
    routers:[
        {
            path: '/home',
            name: 'movies',
            components: MoviesList
        },
        {
            path: '/movies/:id',
            name: 'show',
            components: DetailsView
        },
        // {
        //     path: '*',
        //     name: 'notFound',
        //     components: NotFound
        // }
    ]
})