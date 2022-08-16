import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/index.vue'
import Login from '../views/login.vue'

// 首页
import Home from '../views/home/index.vue'
// 疫情防疫
import Prevention from '../views/prevention/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path: "", 
        redirect: "/home"
      },
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/prevention',
        name: 'Prevention',
        component: Prevention
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },


]

const router = new VueRouter({
  routes
})

export default router
