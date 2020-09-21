import {request as axios}  from "@/utils/request/index.js";

export default {
  // 客服中心》推荐用户管理》推荐用户记录》推荐用户记录列表
  userperformancelist: params => {
    const { limit, page, email, mobilePhone, reCode } = params
    return axios.request({
      url: '/commend/list',
      method: 'post',
      data: {
        limit, // （页行数）
        page, // （第几页）
        email,
        mobilePhone,
        reCode
      }
    })
  },
  // 客服中心》推荐用户管理》推荐返佣明细》推荐返佣明细列表
  bonuslist: params => {
    const { limit, page, email, phone, coinCode, startTime, endTime, status } = params
    return axios.request({
      url: '/bonus/page',
      method: 'post',
      data: {
        limit, // （页行数）
        page, // （第几页）
        email,
        phone,
        coinCode,
        startTime,
        endTime,
        status
      }
    })
  },
}