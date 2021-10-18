import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../components/SignUp.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../components/Profil.vue')
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/Posts.vue')
  },
  {
    path: '/pix',
    name: 'Pix',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Pix.vue')
  },
  {
    path: '/editpost',
    name: 'EditPost',
    component: () => import('../components/EditPost.vue')
  },
  {
    path: '/editcomment',
    name: 'EditComment',
    component: () => import('../components/EditComment.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
