import {request as axios}  from "@/utils/request/index.js";

export default {
  // 客服中心》手动发送 》保存草稿 / 收件人列表
  getAppcustomerList: params => {
    const { email, mobilePhone, trueName, surname, ids, offset, limit, commonLanguage } = params
    return axios.request({
      url: '/customer/appcustomer/list',
      method: 'post',
      data: {
        email,
        mobilePhone,
        trueName,
        surname,
        ids, // 多人id
        offset,
        limit,
        commonLanguage
      }
    })
  },
  // 客服中心》手动发送 》保存草稿 / 保存和发送
  addAppmessage: ({type, messageCategory, title, editorValue, isAll, receiveUserIdList}) => {
    return axios.request({
      url: '/appmessage/add',
      method: 'post',
      data: {
        type, // 1为发送 2为保存
        messageCategory,
        title,
        editorValue,
        isAll,
        receiveUserIdList
      }
    })
  },
  // 客服中心》手动发送 》查询单个
  getAppmessage: (id) => {
    return axios.request({
      // /modifysee
      url: `/appmessage/${id}`,
      method: 'get',
      data: {
        id
      }
    })
  },
  // 客服中心》手动发送 》列表查询
  getMessageList: ({isSend, offset, limit, languageDic,title}) => {
    return axios.request({
      url: '/appmessage/messageList',
      method: 'post',
      data: {
        isSend,
        offset,
        limit,
        languageDic,
        title
      }
    })
  },
   // 客服中心》手动发送》发送
   sendAppmessage: (ids) => {
    return axios.request({
      url: '/appmessage/send',
      method: 'post',
      data: {
        ids
      }
    })
  },
   // 客服中心》手动发送》修改
   modifyAppmessage: ({id, messageCategory, title, editorValue, categoryName, isAll }) => {
    return axios.request({
      url: '/appmessage/modify',
      method: 'post',
      data: {
        id,
        messageCategory,
        title,
        editorValue, 
        categoryName, 
        isAll
      }
    })
  },
  // 客服中心》手动发送》撤销
  removeAppmessage: (ids) => {
    return axios.request({
      url: '/appmessage/remove',
      method: 'post',
      data: {
        ids
      }
    })
  },
  // 客服中心》手动发送》列表查询
  getListMessageVo: ({offset, limit,isSend, title, languageDic, sendDate_GT, sendDate_LT, messageCategory, isAuto}) => {
    return axios.request({
      url: '/appmessage/listMessageVo',
      method: 'post',
      data: {
        offset,
        limit,
        isSend, 
        title, 
        languageDic, 
        sendDate_GT, 
        sendDate_LT,
        messageCategory,
        isAuto
      }
    })
  },
  // 客服中心》手动发送》查看
  modifyseeAppmessage: (id) => {
    return axios.request({
      url: '/appmessage/modifysee',
      method: 'post',
      data: {
        id
      }
    })
  },
   
}