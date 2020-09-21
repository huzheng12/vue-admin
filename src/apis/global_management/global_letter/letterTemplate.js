import {request as axios}  from "@/utils/request/index.js";

export default {
  // 多语种信件 > 系统信件模板列表
  sendMessageList: ({ offset, limit, messageCategory }) => {
    return axios.request({
      url: '/appmessagecategory/list',
      method: 'post',
      data: {
        offset,           // 偏移量
        limit,            // 条数
        messageCategory   // 系统语种
      }
    })
  },

  //  多语种信件 > 添加
  add: ({ messageCategory, name, describes, trigger }) => {
    return axios.request({
      url: '/appmessagecategory/add',
      method: 'post',
      data: {
        messageCategory,    // 系统语种
        name,               // 模板名字
        describes,          // 模板内容
        trigger             // 触发点
      }
    })
  },

  // 多语种信件 > 获取单条数据
  modifysee: ({ id }) => {
    return axios.request({
        url: '/appmessagecategory/modifysee',
        method: 'post',
        data: {
          id               // 唯一标识
        }
    })
  },

  //  多语种信件 > 修改
  modify: ({ id, name, describes, trigger }) => {
    return axios.request({
        url: '/appmessagecategory/modify',
        method: 'post',
        data: {
          id,                 // 唯一标识
          name,               // 模板名字
          describes,          // 模板内容
          trigger             // 触发点
        }
    })
  },
 
  //  多语种信件 > 开启或关闭
  switchOpen: ({ ids, type }) => {
    return axios.request({
        url: '/appmessagecategory/switchOpen',
        method: 'post',
        data: {
          ids,                 // 唯一标识
          type,               // open/close
        }
    })
  },
  
  // 多语种信件 > 获取触发点
  findkeyAndVal: ({ pkey }) => {
    return axios.request({
        url: '/appdic/findkeyAndVal',
        method: 'post',
        data: {
          pkey
        }
    })
  }


}
