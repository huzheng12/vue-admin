import {request as axios}  from "@/utils/request/index.js";

export default {
  // 币币交易 > k线修复记录查询
  list: ({ priceCoinCode, offset, limit }) => {
    return axios.request({
      url: '/klineRepair/list',
      method: 'post',
      data: {
        priceCoinCode, // 交易区
        offset,        // 偏移量
        limit          // 数量   
      }
    })
  }
}
