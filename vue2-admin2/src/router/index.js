import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'dashboard' }
    }]
  },
  // 系统设置
  {
    path: '/system-settings',
    component: Layout,
    redirect: '/system-settings/user-manage',
    name: 'SystemSettings',
    meta: { title: 'systemSettings', icon: 'el-icon-s-help' },
    children: [
      { path: 'user-manage', component: () => import('@/views/system-settings/user-manage/index'), name: 'UserManage', meta: { title: 'userManage', icon: 'table' }},
      { path: 'role-manage', component: () => import('@/views/system-settings/role-manage/index'), name: 'RoleManage', meta: { title: 'roleManage', icon: 'table' }},
      { path: 'permission-manage', component: () => import('@/views/system-settings/permission-manage/index'), name: 'PermissionManage', meta: { title: 'permissionManage', icon: 'table' }}
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
