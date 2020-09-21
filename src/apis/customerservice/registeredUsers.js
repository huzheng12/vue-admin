import {request as axios}  from "@/utils/request/index.js";

export default {
  // 客服中心》注册用户列表》用户列表
  getAppcustomerList: params => {
    const { email, mobilePhone, trueName, isReal, cardId,isSpecial, surname, ids, offset, limit, states } = params
    return axios.request({
      url: '/customer/appcustomer/list',
      method: 'post',
      data: {
        email,
        mobilePhone,
        trueName,
        isReal,
        cardId,
        isSpecial,
        surname,
        ids,
        offset,
        limit,
        states
      }
    })
  },
   // 客服中心》注册用户列表》邮箱激活
   isHasemailAppcustomer: id => {
    return axios.request({
      url: '/customer/appcustomer/isHasemail',
      method: 'post',
      data: {
        id
      }
    })
  },
   // 客服中心》注册用户列表》重置安全策略
   resetSecurityAppcustomer: id => {
    return axios.request({
      url: '/customer/appcustomer/resetSecurity',
      method: 'post',
      data: {
        id 
      }
    })
  },
  // 客服中心》注册用户列表》用户详细信息查询
  auditseeAppcustomer: id => {
    return axios.request({
      url: '/customer/appcustomer/auditsee',
      method: 'post',
      data: {
        id
      }
    })
  },
   // 客服中心》注册用户列表》实名审核验证
   auditRealNameAppcustomer: id => {
    return axios.request({
      url: '/customer/appcustomer/auditRealName',
      method: 'post',
      data: {
        id
      }
    })
  },
  // 客服中心》注册用户列表》驳回实名
  auditbackAppcustomer: id => {
    return axios.request({
      url: '/customer/appcustomer/auditback',
      method: 'post',
      data: {
        id
      }
    })
  },
   // 客服中心》注册用户列表》批量实名审核
   moreAuditAppcustomer: ids => {
    return axios.request({
      url: '/customer/appcustomer/moreAudit',
      method: 'post',
      data: {
        ids
      }
    })
  },
   // 客服中心》注册用户列表》清除实名信息
   auditallAppcustomer: id => {
    return axios.request({
      url: '/customer/appcustomer/auditall',
      method: 'post',
      data: {
        id
      }
    })
  },
   // 客服中心》注册用户列表》重置密码
   setPwAppcustomer: params => {
    const { id, password } = params
    return axios.request({
      url: '/customer/appcustomer/setpw',
      method: 'post',
      data: {
        id, 
        password, 
      }
    })
  },
   // 客服中心》注册用户列表》禁用
   forbiddenAppcustomer: (id) => {
    return axios.request({
      url: '/customer/appcustomer/forbidden',
      method: 'post',
      data: {
        id
      }
    })
  },
   // 客服中心》注册用户列表》解禁
   permissibleAppcustomer: id => {
    return axios.request({
      url: '/customer/appcustomer/permissible',
      method: 'post',
      data: {
        id
      }
    })
  },
   // 客服中心》注册用户列表》交易关闭
   fnCloseChangeAppcustomer: id => {
    return axios.request({
      url: '/customer/appcustomer/fnCloseChange',
      method: 'post',
      data: {
        id 
      }
    })
  },
  // 客服中心》注册用户列表》交易开启
  openChangeAppcustomer: id => {
    return axios.request({
      url: '/customer/appcustomer/openChange',
      method: 'post',
      data: {
        id 
      }
    })
  },
  // 客服中心》注册用户列表》折扣列表
  getUserfeesList: params => {
    const { customerId, type  } = params
    return axios.request({
      url: '/customer/userfees/list',
      method: 'post',
      data: {
        customerId, 
        type
      }
    })
  },
   // 客服中心》注册用户列表》添加设置折扣
   addUserfeesCustomer: params => {
    const { customerId, type, status, takeFeeRate, makeFeeRate } = params
    return axios.request({
      url: '/customer/userfees/add',
      method: 'post',
      data: {
        customerId, 
        type, 
        status,
        takeFeeRate, 
        makeFeeRate 
      }
    })
  },
  // 客服中心》注册用户列表》查询当前折扣信息
  seeUserfeesCustomer: params => {
    const { id } = params
    return axios.request({
      url: '/customer/userfees/see',
      method: 'post',
      data: {
        id
      }
    })
  },
  // 客服中心》注册用户列表》修改设置折扣
  updateUserfeesCustomer: params => {
    const { customerId, type, status, takeFeeRate, makeFeeRate, id } = params
    return axios.request({
      url: '/customer/userfees/update',
      method: 'post',
      data: {
        customerId, 
        type, 
        status,
        takeFeeRate,
        makeFeeRate,
        id
      }
    })
  },
  // 客服中心》注册用户列表》删除折扣
  deleteCustomerUserfees: ids => {
    return axios.request({
      url: '/customer/userfees/delete',
      method: 'post',
      data: {
        ids
      }
    })
  },
   // 客服中心》注册用户列表》白名单列表
   getwhiteList: params => {
    const { email, tel, trueName, ip, type, limit, offset } = params
    return axios.request({
      url: '/web/whitelist/list',
      method: 'post',
      data: {
        email, 
        tel, 
        trueName, 
        ip, 
        type, 
        limit, 
        offset
      }
    })
  },
  // 非白名单列表
  getwhitecustomList: params => {
    const { limit, offset, email_like, mobilePhone_like, trueName_like , cardId} = params
    return axios.request({
      url: '/web/whitelist/customList',
      method: 'post',
      data: {
        limit,
        offset,
        email_like,
        mobilePhone_like,
        trueName_like,
        cardId
      }
    })
  },
  // 移除白名单
  removeWhitelist: ids => {
    return axios.request({
      url: '/web/whitelist/remove',
      method: 'post',
      data: {
        ids
      }
    })
  },
  // 添加白名单
  addWhithOfCustom: whiteData => {
    return axios.request({
      url: '/web/whitelist/addWhithOfCustom',
      method: 'post',
      data: {
        whiteData
      }
    })
  },
   // 客服中心》注册用户列表》银行卡列表
   getAppbankcardList: params => {
    const { email, mobilePhone, offset, mobile, limit} = params
    return axios.request({
      url: '/customer/appbankcard/list',
      method: 'post',
      data: {
        email, 
        mobilePhone, 
        offset,
        mobile, 
        limit, 
      }
    })
  },
   // 客服中心》注册用户列表》白名单设备管理
   getLogindevicerecordlist: params => {
    const { email, mobilePhone, offset, mobile, limit} = params
    return axios.request({
      url: '/device/logindevicerecord/list',
      method: 'post',
      data: {
        email, 
        mobilePhone, 
        offset,
        mobile, 
        limit, 
      }
    })
  },
   // 客服中心》注册用户列表》白名单设备删除
   removeLogindevicerecord: ids => {
    return axios.request({
      url: '/device/logindevicerecord/remove',
      method: 'post',
      data: {
        ids 
      }
    })
  },
  // 客服中心》注册用户列表》资金账户统计
  getExcoinsumList: ({offset, limit}) => {
    return axios.request({
      url: '/exchange/excoinsum/list',
      method: 'post',
      data: {
        offset,
        limit
      }
    })
  },
  // 客服中心》注册用户列表》用户账户管理列表
  getExdigitalmoneyaccountList: ({offset, limit, email, mobilePhone, surname, trueName, publicKey, coinCode}) => {
    return axios.request({
      url: '/exchange/exdigitalmoneyaccount/list',
      method: 'post',
      data: {
        offset,
        limit,
        email, 
        mobilePhone, 
        surname, 
        trueName, 
        publicKey,
        coinCode
      }
    })
  },
  // 客服中心》注册用户列表》提币列表
  getExdmcustomerpublickeyList: ({offset, limit, email, mobilePhone, currencyType}) => {
    return axios.request({
      url: '/exchange/exdmcustomerpublickey/list',
      method: 'post',
      data: {
        offset,
        limit, 
        email, 
        mobilePhone, 
        currencyType
      }
    })
  }
}