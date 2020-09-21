/**
 * @name
 * @author SunSeekerX
 * @time 2020-03-16 16:13:30
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-26 18:35:43
 */

import {request as axios}  from "@/utils/request/index.js";

export default {
  // 站点配置》系统配置》数据字典》初始化树
  listTree: () => {
    return axios.request({
      url: '/appdic/listTree',
      method: 'post'
    })
  },
  // 站点配置》系统配置》数据字典》修改字典对象
  modify: ({ name, value, id, mkey }) => {
    return axios.request({
      url: '/appdic/modify',
      method: 'post',
      data: {
        name,
        value,
        id,
        mkey
      }
    })
  },
  // 站点配置》系统配置》数据字典》删除字段 多个
  remove: ({ ids }) => {
    return axios.request({
      url: '/appdic/remove',
      method: 'post',
      data: {
        ids
      }
    })
  },
  // 站点配置》系统配置》数据字典》删除字段 多个
  list: ({ pkey, order, offset, limit }) => {
    return axios.request({
      url: '/appdic/list',
      method: 'post',
      data: {
        pkey,
        order,
        offset,
        limit
      }
    })
  },
  // 站点配置》系统配置》数据字典》删除字典分组
  removeGroup: ({ id }) => {
    return axios.request({
      url: '/appdic/removeGroup',
      method: 'post',
      data: {
        id
      }
    })
  },
  // 站点配置》系统配置》数据字典》添加字段列表
  addItem: ({ name, value, type, pkey }) => {
    return axios.request({
      url: '/appdic/addItem',
      method: 'post',
      data: {
        name,
        value,
        type,
        pkey
      }
    })
  },
  // 站点配置》系统配置》数据字典》添加分组
  addGroup: ({ mkey, name, type, pkey }) => {
    return axios.request({
      url: '/appdic/addGroup',
      method: 'post',
      data: {
        mkey,
        name,
        type,
        pkey
      }
    })
  },
  // 站点配置》系统配置》数据字典》获取字典对象
  modifysee: ({ id }) => {
    return axios.request({
      url: '/appdic/modifysee',
      method: 'post',
      data: {
        id
      }
    })
  },
   // 站点配置》系统配置》客服配置 》获取配置信息
   getInterfaceConfigCS: () => {
    return axios.request({
      url: '/appconfig/page/interfaceConfigCS',
      method: 'get'
    })
  },
  // 站点配置》系统配置》客服配置 》修改配置信息
  saveInterfaceConfigCS: ({ jsonData, typeKey }) => {
    return axios.request({
      url: '/appconfig/save',
      method: 'post',
      data: {
        jsonData, 
        typeKey
      }
    })
  },
   
}
