import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register'
import Create from '../views/Create'
import store from '../store/index'
import Update from '../views/Update'
import Test from '../views/Test'
//import {auth} from '../firebase'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/create',
    name: 'createNote',
    component: Create,
    meta: {requiresAuth: true}
  },
  {
    path: '/notes/:id',
    name: 'updateNote',
    component: Update,
    meta: {requiresAuth: true}
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
    meta: {requiresAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  //const isAuthenticated = auth.currentUser;
  //console.log(isAuthenticated, to.meta.requiresAuth);
  if(to.meta.requiresAuth && !(await store.dispatch('user/getCurrentUser'))) {
    next({name: 'Login'});
  } else if(!to.meta.requiresAuth && (await store.dispatch('user/getCurrentUser'))) {
    next({name: 'Home'})
  } else {
    next();
  }
});

export default router
