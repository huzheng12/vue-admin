import {request as axios}  from "@/utils/request/index.js";

export default {
  // 币币交易 > 查询回收站交易对列表
  list: ({ order, offset, limit }) => {
    return axios.request({
      url: '/exchange/excointocoin/list?state=2',
      method: 'post',
      data: {
        order,         // asc
        offset,        // 偏移量
        limit          // 数量   
      }
    })
  },
  // 币币交易 > 查询回收站交易对列表
  reset: ({ id }) => {
    return axios.request({
      url: `/exchange/excointocoin/reset/${id}`,
      method: 'post'
    })
  },

}
