import {request as axios}  from "@/utils/request/index.js";

export default {
  // 获取列表
  getMailList: ({ offset, limit, address}) => {
    return axios.request({
      url: '/mail/list',
      method: 'post',
      data: {
        offset, // 偏移量
        limit, // 数量
        address
      }
    })
  },
  // 删除
  removeMail: (ids) => {
    return axios.request({
      url: '/mail/remove',
      method: 'post',
      data: {
        ids
      }
    })
  },
  // 重发电邮
  reSendMail: (ids) => {
    return axios.request({
      url: '/mail/reSend',
      method: 'post',
      data: {
        ids
      }
    })
  },
  
  // 修改
  // modifyMailtemplate: ({ 
  //   id,
  //   languageDic,
  //   tempName,
  //   tempKey,
  //   tempContent,
  //   remark,
  //   tempStatus
  // }) => {
  //   return axios.request({
  //     url: '/mailtemplate/modify',
  //     method: 'post',
  //     data: {
  //       id,
  //       languageDic,
  //       tempName,
  //       tempKey,
  //       tempContent,
  //       remark,
  //       tempStatus
  //     }
  //   })
  // },
   
  // // 获取单个
  // modifyseeMailtemplate: (id) => {
  //   return axios.request({
  //     url: '/mailtemplate/modifysee',
  //     method: 'post',
  //     data: {
  //       id
  //     }
  //   })
  // },
  // // 添加
  // addMailtemplate: ({ 
  //   tempName,
  //   tempKey,
  //   tempContent,
  //   remark,
  //   mailConfigId,
  //   tempStatus,
  //   languageDic
  // }) => {
  //   return axios.request({
  //     url: '/mailtemplate/add',
  //     method: 'post',
  //     data: {
  //       tempName,
  //       tempKey,
  //       tempContent,
  //       remark,
  //       mailConfigId,
  //       tempStatus,
  //       languageDic
  //     }
  //   })
  // },
}