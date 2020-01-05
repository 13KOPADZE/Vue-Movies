import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesList from '@/components/MoviesList.vue'


Vue.use(VueRouter)

export default new VueRouter({
    routers:[
        {
            path: '/movies',
            name: 'movies',
            components: MoviesList
        }
    ]
})