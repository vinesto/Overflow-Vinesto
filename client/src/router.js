import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/LoginForm.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/RegisterForm.vue')
    },
    {
      path: '/MyThread',
      name: 'MyThread',
      component: () => import('./views/MyThread.vue'),
      children: [
        {
          path: '/MyThread/AddThread',
          name: 'AddThread',
          component: () => import('./components/AddThreadForm.vue')
        },
        {
          path: '/MyThread/EditThread/:id',
          name: 'EditThread',
          component: () => import('./components/EditThreadForm.vue')
        },
        {
          path: '/MyThread/RemoveThread/:id',
          name: 'DeleteThread',
        },
      ]
    },
    {
      path: '/MyThread/:id',
      name: 'getThread',
      component: () => import('./components/ThreadDetail.vue'),
      children:[
        {
          path:'/MyThread/:id/post',
          name:'addpost',
          component:() => import('./components/AddPostForm.vue')
        }
      ]
    },
  ]
})
