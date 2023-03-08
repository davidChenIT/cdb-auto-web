import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import { UserRoute } from '@/typings/user/userinfo'
import Layout from '@/layout/Index.vue'

// type RoutesType = UserRoute | RouteRecordRaw

// 对RouteRecordRaw类型进行扩展
export type AddRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

export const constantRoutes: AddRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/Index.vue'),
  },
  {
    path: '/home',
    component: Layout,
    meta: { title: '首页', noCache: true },
    // hidden: true,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '首页', affix: true },
      },
    ],
  },
  {
    path: '/contentManage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: () => import('@/views/contentManage/template/Edit.vue'),
        name: 'templateEdit',
        meta: { title: '模板编辑' },
      },
    ],
  },
  // 404
  // {
  //   path: '/404',
  //   name: '404',
  //   hidden: true,
  //   component: () => import('@/views/AboutView.vue'),
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes],
})

export default router
