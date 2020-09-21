/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-04-10 10:58:40
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-11 14:37:56
 */

import axios from '@/utils/request/index'

export default {
  // K线机器人账户列表查询
  accountInfoList({ robotType, offset, limit, fixPriceCoinCode }) {
    return axios.request({
      url: '/exchange/exrobot/accountInfoList',
      method: 'post',
      data: { robotType, offset, limit, fixPriceCoinCode }
    })
  },

  // 设定机器人账号
  setAccount({ id, account, pwd }) {
    return axios.request({
      url: '/exchange/exrobot/setAccount',
      method: 'post',
      data: {
        // 机器人账号id
        id,
        // 机器人用户账号
        account,
        // 机器人用户密码
        pwd
      }
    })
  },

  // K线机器人列表
  exrobotList({ robotType, offset, limit, fixPriceCoinCode, isSratAuto }) {
    return axios.request({
      url: '/exchange/exrobot/list',
      method: 'post',
      data: {
        robotType,
        offset,
        limit,
        fixPriceCoinCode,
        isSratAuto
      }
    })
  },

  // 单个k线机器人配置参数查看
  modifysee({ id }) {
    return axios.request({
      url: `/exchange/exrobot/modifysee/${id}`,
      method: 'post'
    })
  },

  // 修改k线机器人配置参数
  modify({
    id,
    coinCode,
    atuoPriceType,
    autoPrice,
    autoPriceFloat,
    autoCount,
    priceSource
  }) {
    return axios.request({
      url: '/exchange/exrobot/modify',
      method: 'post',
      data: {
        // 机器人id
        id,
        // 交易币/交易区
        coinCode,
        // 1按定价浮动,2按市价浮动,3按第三方价格下单,4外部行情折算平台币下单模式
        atuoPriceType,
        // 基准下单价格
        autoPrice,
        // 下单价格浮动(%)
        autoPriceFloat,
        // 基准下单量
        autoCount,
        // hry
        priceSource
      }
    })
  },

  // 开启k线机器人
  startAuto({ ids }) {
    return axios.request({
      url: '/exchange/exrobot/startAuto',
      method: 'post',
      data: {
        // 机器人id
        ids
      }
    })
  },

  // 关闭k线机器人
  closeAuto({ id }) {
    return axios.request({
      url: `/exchange/exrobot/closeAuto/${id}`,
      method: 'post'
    })
  },

  // 清空k线
  cleanKline({ ids }) {
    return axios.request({
      url: '/exchange/exrobot/cleanKline',
      method: 'post',
      data: {
        // 机器人id
        ids
      }
    })
  },

  // 清空k线
  testApi({id, coinCode, fixPriceCoinCode }) {
    return axios.request({
      url: `/exchange/exrobot/testApi/${id}`,
      method: 'get',
      params: {
        // 交易币种
        coinCode,
        // 交易区
        fixPriceCoinCode
      }
    })
  }
}
