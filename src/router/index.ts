import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../Views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../Views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../Views/Signup.vue')
  },
  {
    path: '/classroom',
    name: 'Classroom',
    component: () => import(/* webpackChunkName: "classroom" */ '../Views/Classroom.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../Views/Admin.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
