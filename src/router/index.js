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
    component: () => import('../components/SignUp.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../components/Profil.vue')
  },
  {
    path: '/post',
    name: 'Posts',
    component: () => import('../views/Posts.vue')
  },
  {
    path: '/pix',
    name: 'Pix',
    component: () => import('../views/Pix.vue')
  },
  {
    path: '/edittopic',
    name: 'EditTopic',
    component: () => import('../views/EditTopic.vue')
  },
  {
    path: '/editcomment',
    name: 'EditComment',
    component: () => import('../views/EditComment.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
