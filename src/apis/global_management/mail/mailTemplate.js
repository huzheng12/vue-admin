import {request as axios}  from "@/utils/request/index.js";

export default {
  // 获取列表
  getMailtemplateList: ({ offset, limit, languageDic}) => {
    return axios.request({
      url: '/mailtemplate/list',
      method: 'post',
      data: {
        offset, // 偏移量
        limit, // 数量
        languageDic
      }
    })
  },
  // 修改
  modifyMailtemplate: ({ 
    id,
    languageDic,
    tempName,
    tempKey,
    tempContent,
    remark,
    tempStatus
  }) => {
    return axios.request({
      url: '/mailtemplate/modify',
      method: 'post',
      data: {
        id,
        languageDic,
        tempName,
        tempKey,
        tempContent,
        remark,
        tempStatus
      }
    })
  },
   // 删除
   removeMailtemplate: (ids) => {
    return axios.request({
      url: '/mailtemplate/remove',
      method: 'post',
      data: {
        ids
      }
    })
  },
  // 获取单个
  modifyseeMailtemplate: (id) => {
    return axios.request({
      url: '/mailtemplate/modifysee',
      method: 'post',
      data: {
        id
      }
    })
  },
  // 添加
  addMailtemplate: ({ 
    tempName,
    tempKey,
    tempContent,
    remark,
    mailConfigId,
    tempStatus,
    languageDic
  }) => {
    return axios.request({
      url: '/mailtemplate/add',
      method: 'post',
      data: {
        tempName,
        tempKey,
        tempContent,
        remark,
        mailConfigId,
        tempStatus,
        languageDic
      }
    })
  },
}