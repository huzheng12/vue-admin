import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'web-storage-apis'

import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tagsView from './modules/tagsView'
import sendMessage from './modules/sendMessage'
import { handleRequestFail } from '@/utils/handleError' // Handle error
import { SiteConfiguration } from '@/apis/index'
// import router,{customerService,website,oauth,otc,exchange} from '@/router'
// import website from '@/router/websiteRoutes'

import { filterRouter, simpleDataFormat } from '@/utils/recursion-router'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // Global token
    token: null,
    // User info
    userInfo: {},
    // route:sessionStorage.getItem('route')?JSON.parse(sessionStorage.getItem('route')):router.options.routes
    sidebarMenu: [] /** 侧边栏导航 */,
    topMenu: [], //头部导航
    // routeList:Object.assign([], JSON.parse(sessionStorage.getItem('routerInfo')))||[],
    routerInfo: {}, //所有路由信息
    // 全部字典
    dict: [],
    siteTitle:'', //系统标题
    siteIcon:'', //系统图标
    sidebarTitle: sessionStorage.getItem('title')||'仪表盘',  //侧边栏标题
  },
  modules: {
    app,
    settings,
    user,
    sendMessage,
    tagsView
  },
  getters: {
    sidebar: (state) => state.app.sidebar,
    device: (state) => state.app.device,
    token: (state) => state.user.token,
    avatar: (state) => state.user.avatar,
    name: (state) => state.user.name,
    cachedViews: (state) => state.tagsView.cachedViews,
    /**
     * @param { String } 字典标识
     * @param { String || Numver } 字典value
     * @returns { String } 返回字典name
     */
    getDictByKey: (state) => (key, value) => {
      let arr=[]
      let label=''
      state.dict.forEach(item=>{
        if (item.pkey === key && item.value === String(value)) {
              label=item.name
        }
        if(item.pkey===key){
          arr.push({label:item.name,value:item.value})
        }
      })
      if(value=='all'){
        return arr
      }else{
        return label
      }
      // let count=0
      // for (const item of state.dict) {
      //   if (item.pkey === key && item.value === String(value)) {
      //     return item.name
      //   }
      //   if(item.pkey===key){
      //     arr.push(item.name)
      //     console.log(count++);
      //     // if(arr.length==)
      //     // return item.name
      //   }
      //   // return arr
      // }
      // return null
    },
  },
  mutations: {
    // Update token
    UPDATE_TOKEN(state, { token }) {
      if (token) {
        // Update vuex token
        state.token = token
        // Storage token
        storage.setStorageSync('USER_TOKEN', state.token)
      }
    },
    // Update user info
    UPDATE_USER_INFO(state, { userInfo }) {
      if (userInfo) {
        // Update vuex user info
        state.userInfo = userInfo
        // Storage user info
        storage.setStorageSync('USER_INFO', state.userInfo)
      }
    },
    // User login out
    USER_LOGIN_OUT(state) {
      state.token = ''
      state.userInfo = {}
      storage.removeStorageSync('USER_TOKEN')
      storage.removeStorageSync('USER_INFO')
    },
    // Get app storage
    GET_APP_STORAGE(state) {
      const token = storage.getStorageSync('USER_TOKEN')
      token ? (state.token = token) : null
      const userInfo = storage.getStorageSync('USER_INFO')
      userInfo ? (state.userInfo = userInfo) : null
    },
    // 更新侧边栏导航
    UPDATE_SIDEBAR: (state, rout) => {
      // state.sidebarMenu=Object.assign([], rout)
      // Object.assign(state.sidebarMenu, rout)
      // router.addRoutes(rout)
      // state.sidebarMenu=[]
      state.sidebarMenu=rout
    },
    // 更新头部导航
    UPDATE_TOPMENU: (state, topMenu) => {
      Object.assign(state.topMenu, topMenu)
      // state.topMenu=topMenu
    },
    // UPDATE_ROUTELIST:(state,list)=>{
    //   state.routeList=Object.assign([], list)
    // },
    UPDATE_ROUTEINFO: (state, list) => {
      Object.assign(state.routerInfo, list)
    },
    // 更新字典
    UPDATE_DICT(state, { dict }) {
      state.dict = dict
    },
    // 获取站点标题
    GET_SITE_TITLE(state,title){
      state.siteTitle=title
    },
    // 获取站点图标
    GET_SITE_ICON(state,icon){
      state.siteIcon=icon
    },
    UPDATE_SIDEBAR_TITLE(state,title){
      state.sidebarTitle=title
    }
  },
  actions: {
    FETCH_PERMISSION({ commit }) {
      const mapRoutes = JSON.parse(sessionStorage.getItem('mapRoutes'))
      const topMenuRoutes = JSON.parse(sessionStorage.getItem('topMenu'))
      const btnRoute = JSON.parse(sessionStorage.getItem('btnRoute'))
      if (mapRoutes && topMenuRoutes && btnRoute) {
        commit('UPDATE_TOPMENU', topMenuRoutes)
        filterRouter(mapRoutes, btnRoute)
      } else {
        const map = {} //初步筛选路由的对象
        const topMenu = [] //头部导航菜单
        const permissionList = JSON.parse(sessionStorage.getItem('routerInfo'))
        const btnRoute = [] //按钮路由
        permissionList.forEach((item) => {
          if (item.pkey == '') {
            // console.log(item);
            map[item.rootmenu] = simpleDataFormat(item.mkey, permissionList)
            // commit('UPDATE_TOPMENU',item.rootmenu)
            topMenu.push(item.rootmenu)
            return map
          }
          if (item.type == 2) {
            btnRoute.push(item)
          }
        })
        // console.log(btnRoute);
        sessionStorage.setItem('btnRoute', JSON.stringify(btnRoute))
        commit('UPDATE_TOPMENU', topMenu)
        sessionStorage.setItem('mapRoutes', JSON.stringify(map))
        sessionStorage.setItem('topMenu', JSON.stringify(topMenu))
        filterRouter(map, btnRoute)
      }
    },
    // 获取全部字典
    async GET_ALL_DICT({ commit }) {
      const res = await SiteConfiguration.listTree()
      if (res && res.length) {
        commit('UPDATE_DICT', { dict: res })
      } else {
        handleRequestFail({
          type: 'warning',
          message: '获取字典列表失败',
        })
      }
    },
  },
})

export default store
