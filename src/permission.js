/**
 * @name
 * @author SunSeekerX
 * @time 2020-02-03 15:58:17
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-29 09:52:42
 */

import router from './router'
import storage from 'web-storage-apis'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { handleApiRequestException } from '@/utils/handleError' // Handle error

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

function shouldGetDict(to) {
  if (to.meta.usingDict === undefined) {
    return false
  } else if (to.meta.usingDict && !store.state.dict.length) {
    return true
  } else {
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  const token = store.state.token ?? storage.getStorageSync('USER_TOKEN')
  try {
    // 判断要去的页面是否使用了数据字典并且数据字典有值
    if (token && shouldGetDict(to)) {
      // 需要拉取数据字典数据
      await store.dispatch('GET_ALL_DICT')
    }
  } catch (error) {
    // 此处不应该捕获错误，需要处理如果字典拉取失败的情况
    handleApiRequestException(error)
    return next(false)
  } finally {
    NProgress.done()
  }

  // set page title
  document.title = getPageTitle(to.meta.title)

  if (storage.getStorageSync('USER_TOKEN')) {
    if (store.state.sidebarMenu.length == 0) {
      // if (
      //   sessionStorage.getItem('route') &&
      //   JSON.parse(sessionStorage.getItem('route')).length > 0
      // ) {
      //   // store.commit(
      //   //   'UPDATE_SIDEBAR',
      //   //   JSON.parse(sessionStorage.getItem('route'))
      //   // )
      //   store.dispatch('FETCH_PERMISSION')
      //   next({ path: to.path })
      // } else {
      //   // store.commit('UPDATE_SIDEBAR', JSON.parse(JSON.stringify(router.options.routes)))
      //   store.dispatch('FETCH_PERMISSION')
      //   // router.addRoutes(router.options.routes)ß
      //   // store.commit('UPDATE_SIDEBAR',DynamicRoutes)
      //   // router.addRoutes(DynamicRoutes)
      //   next({ path: to.path })
      // }
      store.dispatch('FETCH_PERMISSION')
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    } else {
      if (to.path !== '/login') {
        next()
      } else {
        next('/')
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
