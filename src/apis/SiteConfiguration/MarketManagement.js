import {request as axios}  from "@/utils/request/index.js";

export default {
  // 站点配置》行情接口管理》单币种实时价格》查询列表
  currencypricelist: () => {
    return axios.request({
      url: '/appconfig/page/realtimepriceconfig',
      method: 'get'
    })
  },
  // 站点配置》行情接口管理》单币种/交易对/多币种实时价格》保存
  saveparams: params => {
    const { typeKey, jsonData } = params
    return axios.request({
      url: '/appconfig/save',
      method: 'post',
      data: {
        typeKey,
        jsonData
      }
    })
  },
  // 站点配置》行情接口管理》单币种实时价格》测试接口
  forcurrencypricetest: () => {
    return axios.request({
      url: '/appconfig/testInterfaceRealTime',
      method: 'post'
    })
  },
  // 站点配置》行情接口管理》交易对实时价格》查询列表
  tradingpairlist: () => {
    return axios.request({
      url: '/appconfig/page/klinedataconfig',
      method: 'get'
    })
  },
  // 站点配置》行情接口管理》交易对实时价格》测试接口
  fortradingpairtest: () => {
    return axios.request({
      url: '/appconfig/testInterfaceOauth',
      method: 'post'
    })
  },
  // 站点配置》行情接口管理》多币种实时价格》查询列表
  multicurrencylist: () => {
    return axios.request({
      url: '/appconfig/page/realTimePairPriceConfig',
      method: 'get'
    })
  },
  // 站点配置》行情接口管理》多币种实时价格》测试接口
  formulticurrencytest: () => {
    return axios.request({
      url: '/appconfig/testMoreRealTime',
      method: 'post'
    })
  },
}