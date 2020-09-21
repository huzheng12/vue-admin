import {request as axios}  from "@/utils/request/index.js";

export default {
  // 币币交易 > 交易区列表
  list: ({ order, offset, limit, struts_EQ }) => {
    return axios.request({
      url: '/exchange/extradingarea/list',
      method: 'post',
      data: {
        order,         // asc
        offset,        // 偏移量
        limit,         // 数量   
        struts_EQ      // 状态
      }
    })
  },

  // 币币交易 >  添加交易区
  add: ({ tradingArea, status, sort }) => {
    return axios.request({
      url: '/exchange/extradingarea/add',
      method: 'post',
      data: {
        tradingArea,
        status, 
        sort 
      }
    })
  },

  // 币币交易 > 获取所有币种
  findall: () => {
    return axios.request({
      url: '/exchange/exproduct/findall',
      method: 'post'
    })
  },


  // 币币交易 > 编辑时查看信息
  modifysee: ({ id }) => {
    return axios.request({
      url: `/exchange/extradingarea/modifysee/${id}`,
      method: 'post'
    })
  },

  // 币币交易 > 修改交易区
  modify: ({ id, sort }) => {
    return axios.request({
      url: '/exchange/extradingarea/modify',
      method: 'post',
      data: {
        id,
        sort 
      }
    })
  },

  // 币币交易 > 开启交易区
  openChange: ({ id }) => {
    return axios.request({
      url: `/exchange/extradingarea/openChange/${id}`,
      method: 'post'
    })
  },

  // 币币交易 > 关闭交易区
  closeChange: ({ id }) => {
    return axios.request({
      url: `/exchange/extradingarea/closeChange/${id}`,
      method: 'post'
    })
  }

}
