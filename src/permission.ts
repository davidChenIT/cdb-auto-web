import router from './router'
import useStore from '@/stores/index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth' // 验权
// import { UserRoute } from '@/typings/user/userinfo'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
  const { userStore, permisstionStore } = useStore()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      const hasRoles = userStore?.roles?.length
      console.log(hasRoles, 'hasRoles')
      if (hasRoles) {
        next()
      } else {
        try {
          await userStore.GetInfo() // 获取用户配置 包含用户信息
          //await userStore.GetUserButtonPermission() // 获取用户按钮权限
          const accessRoutes = await permisstionStore.GenerateRoutes()
          console.log('accessRoutes', accessRoutes)
          accessRoutes.forEach((route: any) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (error: any) {
          console.log('error====', error)
          // const { code, message } = error
          // remove token and go to login page to re-login
          await userStore.ResetToken()
          error?.code !== 706 && ElMessage.error(error?.message || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
