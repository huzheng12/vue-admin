import {request as axios}  from "@/utils/request/index.js";

export default {
  // 币币交易 > 下拉框查询交易币和定价币
  selectlist: () => {
    return axios.request({
      url: '/klineRepair/selectlist',
      method: 'post'
    })
  },

  // 币币交易 > 根据交易对和时间加载数据
  loadData: ({ time, coinCode }) => {
    return axios.request({
      url: '/klineRepair/loadData',
      method: 'post',
      data: {
        time,         // 2020-03-01 22:26
        coinCode      // USDT_ETH
      }
    })
  },

  // 币币交易 > k线数据修复提交
  kLineUpdateExcel: ({ timestamp, coinCode, fixCoinCode, high, low, open, close, volume }) => {
    return axios.request({
      url: '/klineRepair/kLineUpdateExcel',
      method: 'post',
      data: {
        timestamp,      // 时间  
        coinCode,       //  
        fixCoinCode,    // 
        high,           // 高
        low,            // 低
        open,           // 开 
        close,          // 收
        volume          // 数量
      }
    })
  },


}
