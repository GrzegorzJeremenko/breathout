import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/place/:_id',
    name: 'Place',
    component: () => import('../views/Place.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/favourite',
    name: 'Favourite',
    component: () => import('../views/Favourite.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
