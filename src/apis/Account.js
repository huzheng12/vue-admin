/**
 * @name
 * @author SunSeekerX
 * @time 2020-02-03 19:56:25
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-03 20:00:32
 */
import {request as axios}  from "@/utils/request/index.js";

export default {
  // 用户登录页面>登录
  login: ({ username, password, loginCode, loginToken }) => {
    return axios.request({
      url: '/login',
      method: 'post',
      data: {
        username,
        password,
        loginCode,
        loginToken
      }
    })
  },
  // 用户登录页面>验证码
  verificationCode: () => {
    return axios.request({
      url: '/logincode',
      method: 'get'
    })
  },
  // 用户主页>退出登录
  logout: () => {
    return axios.request({
      url: '/logout',
      method: 'post'
    })
  },
  // 用户主页>修改密码
  modifyPassword: ({ pwd, newPwd, rePwd }) => {
    return axios.request({
      url: '/user/modifypwd',
      method: 'post',
      data: {
        pwd,
        newPwd,
        rePwd
      }
    })
  },
  // 权限管理>获取父类菜单
  getLoadmenu: () => {
    return axios.request({
      url: '/menu/loadmenu',
      method: 'post',
    })
  },
  // 权限管理>获取父类菜单下的树
  getLoadtree: ({rootmenu}) => {
    return axios.request({
      url: '/menu/loadtree',
      method: 'post',
      data:{
        rootmenu
      }
    })
  },
  // 权限管理>添加菜单
  addMenu: ({name,url,permission,sortno,type,icon,pkey,rootmenu}) => {
    return axios.request({
      url: '/menu/add',
      method: 'post',
      data:{
        name,
        url,
        permission,
        sortno,
        type,
        icon,
        pkey,
        rootmenu
      }
    })
  },
  // 权限管理>删除父类菜单
  removeMenu: ({id}) => {
    return axios.request({
      url: '/menu/remove',
      method: 'post',
      data:{
        id
      }
    })
  },
  // 权限管理>删除父类菜单
  modifyMenu: ({permission,url,sortno,name,type,id}) => {
    return axios.request({
      url: '/menu/modify',
      method: 'post',
      data:{
        permission,
        url,
        sortno,
        name,
        type,
        id
      }
    })
  },
}
