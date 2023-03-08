import { defineStore } from 'pinia'
import { getRouters } from '@/api/login'
import { UserRoute } from '@/typings/user/userinfo'
import { constantRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
// Glob导入  详情：https://cn.vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('../views/**/*.vue')

// 路由懒加载
const lazyLoadView = (path: string | (() => void)) => {
  const importPage = pages[`../views/${path}.vue`]
  if (!importPage) {
    throw new Error(
      `Unknown page ${path}. Is it located under Pages with a .vue extension?`
    )
  }

  return importPage
}
type RoutesType = UserRoute | RouteRecordRaw

//暂时代替后台获取的路由
const routes1: any = [
  {
    path: '/contentManage',
    // name: '/contentManage',
    component: 'Layout',
    hidden: false,
    meta: { title: '内容管理', icon: '' },
    alwaysShow: true,
    children: [
      {
        path: '/information',
        name: 'information',
        component: 'contentManage/information/Index',
        meta: { title: '资讯管理', icon: '' },
      },
      {
        path: '/template',
        name: 'template',
        component: 'contentManage/template/Index',
        meta: { title: '模板管理', icon: '' },
      },
      {
        path: '/history',
        name: 'history',
        component: 'contentManage/history/Index',
        meta: { title: '历史消息', icon: '' },
      },
      {
        path: '/stock',
        name: 'stock',
        component: 'contentManage/stock/Index',
        meta: { title: '股票管理', icon: '' },
      },
    ],
  },
]
export default defineStore('permisstionStore', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      routes: [] as RoutesType[],
      addRoutes: [] as UserRoute[],
    }
  },
  actions: {
    GenerateRoutes(): Promise<UserRoute[]> {
      return new Promise((resolve, reject) => {
        const accessedRoutes = filterAsyncRouter(routes1)
        this.addRoutes = accessedRoutes
        this.routes = [...constantRoutes, ...accessedRoutes]
        resolve(accessedRoutes)
        // getRouters()
        //   .then((res) => {
        //     const accessedRoutes = filterAsyncRouter(routes1)
        //     //const accessedRoutes = filterAsyncRouter(res.data)
        //     this.addRoutes = accessedRoutes
        //     this.routes = [...constantRoutes, ...accessedRoutes]
        //     // this.routes.push({
        //     //   // path: '/:catchAll(.*)',
        //     //   path: '/:pathMatch(.*)',
        //     //   redirect: '/404',
        //     //   hidden: true,
        //     // })
        //     resolve(accessedRoutes)
        //     console.log('===', this.routes)
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },
  },
})

// 遍历后台传来的路由字符串，转换为组件对象
const filterAsyncRouter = (asyncRouterMap: UserRoute[]) => {
  return asyncRouterMap.filter((route) => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = () => import('@/layout/Index.vue')
      } else {
        route.component = lazyLoadView(route.component)
      }
    }
    if (route.children !== null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}
