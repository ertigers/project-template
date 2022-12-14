import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 消除错误路由跳转错误提示
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject) return originalPush.call(this, location, resolve, reject)
  return originalPush.call(this, location).catch((e) => {})
}

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/setup',
    component: () => import('@/views/setup/index'),
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
  }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRoutes = [
  // 系统设置
  {
    path: '/system-settings',
    component: Layout,
    redirect: '/system-settings/user-manage',
    name: 'SystemSettings',
    meta: { title: 'systemSettings', icon: 'el-icon-s-help', roles: ['sysadmin', 'admin'] },
    children: [
      { path: 'user-manage', component: () => import('@/views/system-settings/user-manage/index'), name: 'UserManage', meta: { title: 'userManage', icon: 'table', roles: ['sysadmin'] }},
      { path: 'role-manage', component: () => import('@/views/system-settings/role-manage/index'), name: 'RoleManage', meta: { title: 'roleManage', icon: 'table', roles: ['sysadmin', 'admin'] }},
      { path: 'permission-manage', component: () => import('@/views/system-settings/permission-manage/index'), name: 'PermissionManage', meta: { title: 'permissionManage', icon: 'table', roles: ['sysadmin', 'admin'] }},
      { path: 'logs-manage', component: () => import('@/views/system-settings/logs-manage/index'), name: 'LogsManage', meta: { title: 'LogsManage', icon: 'table', roles: ['sysadmin', 'admin'] }}
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
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
