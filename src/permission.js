import router from './router'
import { useUserStore } from './store/user'
import { ElNotification } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth.js' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration


const whiteList = ['/login', '/auth-redirect'] // 白名单


router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  // 开始进度条
  NProgress.start()

  // 设置页面的title
  document.title = "xxxxxxx"

  // 从 Cookies 获取用户的token
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login' || to.path === '/') {
      // 如果用户已登录，重定向到主页
      console.log('已经有token了,跳转到首页')
      next({ path: '/news/dashboard' })
      NProgress.done()
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          userStore.getInfo()
          // 基于角色生成可访菜单
          const accessRoutes = userStore.generateRoutes()

          // 动态添加路由
          accessRoutes.forEach(route => {
            router.addRoute(route)
          })

          // 设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除令牌并转到登录页面重新登录
          userStore.logout()
          ElNotification({
            message: error || '异常，请重新登录',
            type: 'error',
          })
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有 token 且 访问白名单中的页面
    if (whiteList.indexOf(to.path) !== -1) {
      // 路由 在白名单的 直接放行
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面。
      console.log('没有token,跳转到登录页')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
