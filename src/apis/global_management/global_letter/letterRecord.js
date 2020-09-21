import {request as axios}  from "@/utils/request/index.js";

export default {
  // 多语种信件 > 查询
  listMessageVo: ({ isAuto, offset, limit, title_like, sendDate_GT, sendDate_LT, isSend }) => {
    return axios.request({
      url: '/appmessage/listMessageVo',
      method: 'post',
      data: {
        isAuto,         // 自动发送记录 1 手动 0
        offset,         // 偏移量
        limit,          // 数量   
        title_like,     // 标题关键字
        sendDate_GT,    // 发送时间起始
        sendDate_LT,    // 发送时间截至
        isSend          // 状态 0 未发送 已发送 1 已撤回 3
      }
    })
  },

  // 多语种信件 >  获取一条的信息
  modifysee: ({ id }) => {
    return axios.request({
      url: `/appmessage/${id}`,
      method: 'get'
    })
  },

  // 用户列表 > 用户列表
  list: ({ ids, offset, limit }) => {
    return axios.request({
      url: '/customer/appcustomer/list',
      method: 'post',
      data: {
        ids,       // 客户ID 多个用,隔开
        offset,    // 从第几条开始
        limit      // 每页多少条
      }
    })
  }


}
