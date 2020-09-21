import {request as axios}  from "@/utils/request/index.js";

export default {
  // 客服中心》商户管理 》功能列表
  getBusinessManagementList: () => {
    return axios.request({
      url: '/exchange/businessManagement/list',
      method: 'post',
    })
  },
  // 客服中心》商户管理 》查询商户信息
  getBusinessInfomation: (id) => {
    return axios.request({
      url: `/exchange/businessInfomation/see/${id}`,
      method: 'post',
      data: {
        id
      }
    })
  },
  // 客服中心》商户管理 》新增商户信息
  addBusinessManagement: ({functionSwitch, deposit, coinCode, agreement}) => {
    return axios.request({
      url: '/exchange/businessManagement/add',
      method: 'post',
      data: {
        functionSwitch,
        deposit,
        coinCode,
        agreement

      }
    })
  },
   // 客服中心》商户管理》更新商户信息
   modifyBusinessManagement: ({functionSwitch, deposit, coinCode, agreement, id}) => {
    return axios.request({
      url: 'exchange/businessManagement/modify',
      method: 'post',
      data: {
        functionSwitch,
        deposit,
        coinCode,
        agreement,
        id
      }
    })
  },
   // 客服中心》商户管理》商户管理列表查询
  getBusinessInfomationList: ({offset, limit, status, responsibleEmail, responsiblePhone, fullName, coinCode, role}) => {
    return axios.request({
      url: '/exchange/businessInfomation/list',
      method: 'post',
      data: {
        offset,
        limit,
        status, 
        responsibleEmail, 
        responsiblePhone, 
        fullName, 
        coinCode, 
        role
      }
    })
  },
  // 客服中心》商户管理》批量通过
  moreAudit: (ids) => {
    return axios.request({
      url: '/exchange/businessInfomation/moreAudit',
      method: 'post',
      data: {
        ids
      }
    })
  },
  // 客服中心》商户管理》修改年费
  modifyDeposit: ({id,  deposit}) => {
    return axios.request({
      url: '/exchange/businessInfomation/modifyDeposit',
      method: 'post',
      data: {
        id,
        deposit
      }
    })
  },
  // 客服中心》商户管理》审核
  auditBusinessInfomation: ({id, status, reason}) => {
    return axios.request({
      url: `/exchange/businessInfomation/audit/${id}`,
      method: 'post',
      data: {
        status,
        reason
      }
    })
  },
   // 客服中心》商户管理》取缔商户
   banBusinessInfomation: ({id, status, remark}) => {
    return axios.request({
      url: '/exchange/businessInfomation/ban',
      method: 'post',
      data: {
        id,
        status,
        remark
      }
    })
  },
  // 客服中心》商户管理》取消取缔
  cancelBanBusinessInfomation: ({id, status}) => {
    return axios.request({
      url: '/exchange/businessInfomation/cancelBan',
      method: 'post',
      data: {
        id,
        status
      }
    })
  },
   // 客服中心》商户管理》操作日志商户列表查询
   getoperationalMerchantLogList: ({offset, limit, operandName, operatorName, operationType}) => {
    return axios.request({
      url: '/exchange/operationalMerchantLog/list',
      method: 'post',
      data: {
        offset, 
        limit, 
        operandName,
        operatorName, 
        operationType
      }
    })
  },
   
}