/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-03-27 09:58:13
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-03-30 11:15:51
 */

import axios from '@/utils/request/index'

export default {
  /**
   * @name 法币信息管理
   */

  // 根据id查询法币信息
  currencyInfo: ({ id }) => {
    return axios.request({
      url: `/exlawcoin/see/${id}`,
      method: 'post'
    })
  },

  // 查询法币信息列表
  currencyInfoList: ({
    name,
    coinSymbol,
    coinCode,
    coinDecimal,
    rate,
    offset,
    limit,
    creator,
    created,
    id
  }) => {
    return axios.request({
      url: '/exlawcoin/list',
      method: 'post',
      data: {
        // 法币币种
        name,
        // 币种符号
        coinSymbol,
        // 币种代号
        coinCode,
        // 保留小数位
        coinDecimal,
        // 汇率
        rate,
        offset,
        limit,
        creator,
        created,
        id
      }
    })
  },

  // 查询所有信息
  findall: () => {
    return axios.request({
      url: '/exlawcoin/findall',
      method: 'post'
    })
  },

  // 根据名称查找
  findByName: ({ name }) => {
    return axios.request({
      url: '/exlawcoin/findByName',
      method: 'post',
      data: {
        // 示例：人民币
        name
      }
    })
  },

  // 新增一个法币信息
  addCurrency: ({ name, coinSymbol, coinCode, coinDecimal, rate }) => {
    return axios.request({
      url: '/exlawcoin/add',
      method: 'post',
      data: {
        // 法币币种
        name,
        // 币种符号
        coinSymbol,
        // 币种代号
        coinCode,
        // 保留小数位
        coinDecimal,
        // 汇率
        rate
      }
    })
  },

  // 修改法币信息
  modifyCurrency: ({ id, name, coinSymbol, coinCode, coinDecimal, rate }) => {
    return axios.request({
      url: '/exlawcoin/modify',
      method: 'post',
      data: {
        id,
        // 法币币种
        name,
        // 币种符号
        coinSymbol,
        // 币种代号
        coinCode,
        // 保留小数位
        coinDecimal,
        // 汇率
        rate
      }
    })
  },

  // 根据id删除法币信息
  removeCurrency: ({ ids }) => {
    return axios.request({
      url: '/exlawcoin/remove',
      method: 'post',
      data: {
        // 多个id用英文逗号隔开
        ids
      }
    })
  },

  /**
   * @name 兑换汇率管理
   */

  // 新增一条兑换汇率信息
  addRate: ({ lan, exchange, rate, coinSymbol, coinCode, isSynC2C }) => {
    return axios.request({
      url: '/excointomoney/add',
      method: 'post',
      data: {
        // 示例：zh_CN
        lan,
        // 示例：人民币
        exchange,
        // 示例：11
        rate,
        // 示例：￥1
        coinSymbol,
        // 示例：CNY
        coinCode,
        // 示例：0
        isSynC2C
      }
    })
  },

  // 根据id查询兑换汇率信息
  rateInfo: ({ id }) => {
    return axios.request({
      url: `/excointomoney/see/${id}`,
      method: 'post'
    })
  },

  // 修改兑换汇率信息
  modifyRate: ({id, lan, exchange, rate, coinSymbol, coinCode, isSynC2C }) => {
    return axios.request({
      url: `/excointomoney/modify`,
      method: 'post',
      data: {
        id,
        // 示例：zh_CN
        lan,
        // 示例：人民币
        exchange,
        // 示例：11
        rate,
        // 示例：￥1
        coinSymbol,
        // 示例：CNY
        coinCode,
        // 示例：0
        isSynC2C
      }
    })
  },

  // 开关兑换汇率
  setRateState: ({ state, id }) => {
    return axios.request({
      url: `/excointomoney/setState/${id}`,
      method: 'post',
      data: {
        // 示例：1
        state
      }
    })
  },

  // 兑换汇率信息列表查询
  rateList: ({
    offset,
    limit,
    id,
    lan,
    exchange,
    rate,
    coinSymbol,
    coinCode
  }) => {
    return axios.request({
      url: '/excointomoney/list',
      method: 'post',
      data: {
        // 示例：1
        offset,
        // 示例：10
        limit,
        id,
        lan,
        exchange,
        rate,
        coinSymbol,
        coinCode
      }
    })
  }
}
