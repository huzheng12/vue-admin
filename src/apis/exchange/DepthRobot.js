/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-04-10 11:14:42
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-05-13 09:40:15
 */

import axios from '@/utils/request/index'

export default {
  // 深度机器人账号列表查询
  accountInfoList({
    robotType,
    order,
    offset,
    limit,
    fixPriceCoinCode,
    mycolumn,
    search,
  }) {
    return axios.request({
      url: '/exchange/exrobotdeep/accountInfoList',
      method: 'post',
      data: {
        robotType,
        order,
        offset,
        limit,
        fixPriceCoinCode,
        mycolumn,
        search,
      },
    })
  },

  // 批量设定账号
  setAccount({ id, account, pwd }) {
    return axios.request({
      url: '/exchange/exrobotdeep/setAccount',
      method: 'post',
      data: {
        // 机器人账号id
        id,
        // 机器人用户账号
        account,
        // 机器人用户密码
        pwd,
      },
    })
  },

  // 深度机器人列表查询
  exrobotdeepList({
    robotType,
    order,
    offset,
    limit,
    fixPriceCoinCode,
    mycolumn,
    search,
    isSratAuto,
  }) {
    return axios.request({
      url: '/exchange/exrobotdeep/list',
      method: 'post',
      data: {
        // 机器人类型
        robotType,
        // 排序方式
        order,
        // 偏移量
        offset,
        // 页行数
        limit,
        // 定价币
        fixPriceCoinCode,
        // 自定义条件查询键
        mycolumn,
        // 自定义条件查询值
        search,
        // 开关状态
        isSratAuto,
      },
    })
  },

  // 机器人配置参数查询
  modifysee({ id }) {
    return axios.request({
      url: `/exchange/exrobotdeep/modifysee/${id}`,
      method: 'post',
    })
  },

  // 机器人配置参数修改
  modify({
    id,
    coinCode,
    buyDeep,
    sellDeep,
    everyEntrustCount,
    stopLine,
    buyOneDiffRate,
    sellOneDiffRate,
  }) {
    return axios.request({
      url: '/exchange/exrobotdeep/modify',
      method: 'post',
      data: {
        // 机器人id
        id,
        // 交易区/交易区
        coinCode,
        // 委买目标档数
        buyDeep,
        // 委卖目标档数
        sellDeep,
        // 委量百分比上限
        everyEntrustCount,
        // 委量绝对值上限
        stopLine,
        // 买1差值率
        buyOneDiffRate,
        // 卖1差值率
        sellOneDiffRate,
      },
    })
  },

  // 开启深度机器人
  startAuto({ ids }) {
    return axios.request({
      url: '/exchange/exrobotdeep/startAuto',
      method: 'post',
      data: {
        // 机器人id
        ids,
      },
    })
  },

  // 关闭k线机器人
  closeAuto({ id }) {
    return axios.request({
      url: `/exchange/exrobotdeep/closeAuto/${id}`,
      method: 'post',
    })
  },

  // 机器人运行日志查询
  exrobotlogList({ order, offset, limit, mycolumn, search }) {
    return axios.request({
      url: '/exchange/exrobotlog/list',
      method: 'post',
      data: {
        // 排序方式
        order,
        // 偏移量
        offset,
        // 页行数
        limit,
        // 自定义条件查询键
        mycolumn,
        // 自定义条件查询值
        search,
      },
    })
  },

  // 获取交易委托
  exentrustList({
    offset,
    limit,
    email,
    mobilePhone,
    entrustTime_GT,
    entrustTime_LT,
    surname,
    trueName,
    // 交易币种
    coinCode,
    // 交易区
    fixPriceCoinCode,
    // 出价类型
    entrustWay,
    // 委托类型
    entrustType,
  }) {
    return axios.request({
      url: '/exchange/exentrust/list',
      method: 'post',
      data: {
        typeStatus: 'listed',
        // 委托来源
        source: 2,
        // 偏移量
        offset,
        // 页行数
        limit,
        email,
        mobilePhone,
        entrustTime_GT,
        entrustTime_LT,
        surname,
        trueName,
        // 交易币种
        coinCode,
        // 交易区
        fixPriceCoinCode,
        // 出价类型
        entrustWay,
        // 委托类型
        entrustType,
      },
    })
  },

  // 获取交易明细数据
  orderFindByentrustNum({ entrustNum, coinCode, type }) {
    return axios.request({
      url: '/exchange/exentrust/orderFindByentrustNum',
      method: 'post',
      data: {
        // 委托单号
        entrustNum,
        // 币种类型
        coinCode,
        // 委托类型 1买入 2卖出
        type,
      },
    })
  },

  // 获取交易币种列表
  findall() {
    return axios.request({
      url: '/exchange/exproduct/findall',
      method: 'post',
    })
  },
  // 获取交易区币种
  toList() {
    return axios.request({
      url: '/exchange/excointocoin/toList',
      method: 'post',
    })
  },
}
