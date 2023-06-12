import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home'),
    meta: {title: '首页', index: 0}
  },
  {
    path: '/shop/:shopId',
    component: () => import('@/views/shop'),
    redirect: '/shop/:shopId/home',
    children: [
      {
        path: '/shop/:shopId/home',
        component: () => import('@/views/shop/home'),
        meta: {title: '店铺首页', index: 0}
      },
      {
        path: '/shop/:shopId/category',
        component: () => import('@/views/shop/category'),
        meta: {title: '商品分类', index: 1}
      }
    ]
  },
  {
    path: '/shop/:shopId/goods',
    component: () => import('@/views/shop/goods'),
    meta: {title: '商品展示', index: 2}
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: {title: '404'}
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
