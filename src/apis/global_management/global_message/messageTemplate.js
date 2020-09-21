import {request as axios}  from "@/utils/request/index.js";

export default {
  // 多语种短信 > 获取短信模板类型
  smsTypeList: () => {
    return axios.request({
      url: '/appsmstemplate/smsTypeList',
      method: 'post'
    })
  },

  // 多语种短信 > 获取系统语种信息
  getSysLangInfo: () => {
    return axios.request({
      url: '/appconfig/getSysLangInfo',
      method: 'post'
    })
  },

  // 多语种短信 > 获取短信模板列表
  list: ({ offset, limit, tempLang, tempName, tempType }) => {
    return axios.request({
      url: '/appsmstemplate/list',
      method: 'post',
      data: {
        offset,    // 偏移量
        limit,     // 条数
        tempLang,  // 语种
        tempName,  // 模板名字
        tempType   // 模板类型
      }
    })
  },

  // 多语种短信 > 开启或关闭模板
  openOrClose: ({ id }) => {
    return axios.request({
      url: '/appsmstemplate/openOrClose',
      method: 'post',
      data: {
        id  // 主键
      }
    })
  },

  // 多语种短信 > 添加短信模板
  add: ({ tempName, tempType, tempContent, thirdTemplateId, tempState }) => {
    return axios.request({
      url: '/appsmstemplate/add',
      method: 'post',
      data: {
        tempName,           // 模板名字
        tempType,           // 模板类型
        tempContent,        // 模板内容
        thirdTemplateId,    // 第三方模板id
        tempState           // 模板状态 0-关闭，1-开启
      }
    })
  },

  // 多语种短信 > 通过id获取短信模板
  modifysee: ({ id, lang }) => {
    return axios.request({
      url: '/appsmstemplate/modifysee',
      method: 'post',
      data: {
        id,           // 主键
        lang          // 语种
      }
    })
  },

  // 多语种短信 > 获取语言
  getKey: ({ id, lang }) => {
    return axios.request({
      url: '/appdic/getKey',
      method: 'post',
      data: {
        id,           // 主键
        lang          // 语种
      }
    })
  },

  //  多语种短信 > 修改短信模板
  modify: ({ tempName, tempType, tempContent, thirdTemplateId, tempState, id }) => {
    return axios.request({
      url: '/appsmstemplate/modify',
      method: 'post',
      data: {
        tempName,          // 模板名字
        tempType,          // 模板类型
        tempContent,       // 模板内容
        thirdTemplateId,   // 第三方模板id
        tempState,         // 模板状态 0-关闭，1-开启   
        id                 // 模板id
      }
    })
  },

  //  多语种短信 > 删除短信模板
  remove: ({ ids }) => {
    return axios.request({
      url: '/appsmstemplate/remove',
      method: 'post',
      data: {
        ids    // 模板id
      }
    })
  }

}
