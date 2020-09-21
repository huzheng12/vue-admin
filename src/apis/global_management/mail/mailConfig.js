import {request as axios}  from "@/utils/request/index.js";

export default {
  // 获取列表
  getMailConfigList: ({ offset, limit, protocol_like, customName_like}) => {
    return axios.request({
      url: '/mailconfig/list',
      method: 'post',
      data: {
        offset, // 偏移量
        limit, // 数量
        protocol_like, // 协议
        customName_like // 发送用户
      }
    })
  },
  // 修改
  modifyMailconfig: ({ 
    sort,
    host,
    port,
    protocol,
    emailUser,
    agreedUser,
    agreedPwd,
    customName,
    prefix,
    status,
    id
  }) => {
    return axios.request({
      url: '/mailconfig/modify',
      method: 'post',
      data: {
        sort,
        host,
        port,
        protocol,
        emailUser,
        agreedUser,
        agreedPwd,
        customName,
        prefix,
        status,
        id
      }
    })
  },
   // 删除
   removeMailconfig: (ids) => {
    return axios.request({
      url: '/mailconfig/remove',
      method: 'post',
      data: {
        ids
      }
    })
  },
  // 通过id获取邮箱配置对象
  modifyseeApparticle: (id) => {
    return axios.request({
      url: '/mailconfig/modifysee',
      method: 'post',
      data: {
        id
      }
    })
  },
  // 添加
  addMailconfig: ({ 
    sort,
    host,
    port,
    protocol,
    emailUser,
    agreedUser,
    agreedPwd,
    customName,
    prefix,
    status
  }) => {
    return axios.request({
      url: '/mailconfig/add',
      method: 'post',
      data: {
        sort,
        host,
        port,
        protocol,
        emailUser,
        agreedUser,
        agreedPwd,
        customName,
        prefix,
        status
      }
    })
  },
}