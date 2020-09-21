import {request as axios}  from "@/utils/request/index.js";

export default {
  // otc》otc规则管理》交易币种管理》拉去数据
  otcList: params => {
    const { offset, limit, coinCode } = params
    return axios.request({
      url: '/exchange/exproduct/otcList',
      method: 'post',
      data: {
        offset, // 从第几条开始
        limit, // 每页多少条
        coinCode //币种
      }
    })
  },
  // otc》otc规则管理》交易币种管理》单个币种查询 修改币种
  otcModifySee: params => {
    const { id } = params
    return axios.request({
      url: '/exchange/exproduct/otcModifySee',
      method: 'post',
      data: {
        id
      }
    })
  },
  // otc》otc规则管理》交易币种管理》单个币种查询 添加币种
  otcAdd: params => {
    const { coinCode, eatFee, eatFeeType, coinPercent, otcState, otcMinPercent, otcMaxPercent, sellMaxCoin, sellMinCoin } = params
    return axios.request({
      url: '/exchange/exproduct/otcAdd',
      method: 'post',
      data: {
        coinCode, //币种
        eatFee, //吃单手续费
        eatFeeType, //费率类型 0固定费率 1百分比费率
        coinPercent, //交易订单百分比
        otcState, //是否开启 0否 1是
        otcMinPercent,  //限价最低百分比
        otcMaxPercent,   //限价最高百分比
        sellMaxCoin,  //最大成交数量
        sellMinCoin   //最小成交数量
      }
    })
  },
  // otc》otc规则管理》交易币种管理》获取所有币种
  getCoinCode: () => {
    return axios.request({
      url: '/exchange/exproduct/findall',
      method: 'post',

    })
  },
  // otc》otc规则管理》交易币种管理》新增申诉
  addAppealTemplate: ({ templateName, tempContent, tempLang, tempState }) => {
    return axios.request({
      url: '/exchange/otcAppealTemplate/addOtcAppealTemplate',
      method: 'post',
      data: { templateName, tempContent, tempLang, tempState }
    })
  },
  // otc》otc规则管理》申诉》删除申诉
  removeAppealTemplate: (ids) => {
    return axios.request({
      url: '/exchange/otcAppealTemplate/removeOtcAppealTemplate',
      method: 'post',
      data: {ids}
    })
  },
  // otc》otc规则管理》申诉》修改申诉
  editAppealTemplate: ({ templateName, tempContent, tempLang, tempState, id }) => {
    return axios.request({
      url: '/exchange/otcAppealTemplate/editOtcAppealTemplate',
      method: 'post',
      data: { templateName, tempContent, tempLang, tempState, id }
    })
  },
  // otc》otc规则管理》申诉》获取申诉模块列表
  getAppealTemplateList: ( id ) => {
    return axios.request({
      url: '/exchange/otcAppealTemplate/list',
      method: 'post',
      data: { id }
    })
  },
  // otc》otc规则管理》申诉》获取申诉模板列表 分页

  getAppealTemplatePage: ({ templateName, tempContent, tempLang, tempState, offset, limit }) => {
    return axios.request({
      url: '/exchange/otcAppealTemplate/page',
      method: 'post',
      data: { templateName, tempContent, tempLang, tempState, offset, limit }
    })
  }
}