import {request as axios}  from "@/utils/request/index.js";

export default {
  // 仪表盘 > 获取法币排行榜
  getBusinessRankAndSize: ({ type }) => {
    return axios.request({
      url: '/exchange/businessInfomation/getBusinessRank',
      method: 'post',
      data: {
        type  // 0.商户和用户混合数据 1.商户数据 2.用户数据
      }
    })
  },
  // 仪表盘 > 法币交易额和OTC每日交易手续费
  getOtcWeekTradingMoneyAndFee: ({ startDate, endDate }) => {
    return axios.request({
      url: '/exchange/otcapptransaction/getOtcWeekTradingMoneyAndFee',
      method: 'post',
      data: {
        startDate,  // 开始日期
        endDate     // 结束日期
      }
    })
  },
  // getBusinessRankAndSize: () => {
  //   return {
  //     success: true,
  //     msg: '成功',
  //     obj: [{
  //       id: '1',
  //       coinCode: '12',
  //       customerId: '13212',
  //       transactionPrice: '12',
  //       transactionDate: '2019-12-13',
  //       nickName: '大家看法',
  //       realName: 'ncxm',
  //       email: '@qq.com',
  //       phone: '415545645',
  //       maxCoinCode: 'usdt'
  //     },
  //     {
  //       id: '1',
  //       coinCode: '12',
  //       customerId: '13212',
  //       transactionPrice: '12',
  //       transactionDate: '2019-12-13',
  //       nickName: '大家看法',
  //       realName: 'ncxm',
  //       email: '@qq.com',
  //       phone: '415545645',
  //       maxCoinCode: 'usdt'
  //     }]
  //   }
  // },
  // getOtcWeekTradingMoneyAndFee: () => {
  //   return {
  //     success: true,
  //     msg: '成功',
  //     obj: [{
  //       transactionDate: '2019-1-1',
  //       coinCode: 'btc',
  //       transactionPrice: '10',
  //       takeFee: '12',
  //       makeFee: '15',
  //       transactionCount: '45'
  //     },
  //     {
  //       transactionDate: '2019-1-1',
  //       coinCode: 'usdt',
  //       transactionPrice: '11',
  //       takeFee: '20',
  //       makeFee: '21',
  //       transactionCount: '55'
  //     },
  //     {
  //       transactionDate: '2019-1-2',
  //       coinCode: 'btc',
  //       transactionPrice: '20',
  //       takeFee: '13',
  //       makeFee: '15',
  //       transactionCount: '45'
  //     },
  //     {
  //       transactionDate: '2019-1-2',
  //       coinCode: 'usdt',
  //       transactionPrice: '14',
  //       takeFee: '30',
  //       makeFee: '22',
  //       transactionCount: '56'
  //     }]
  //   }
  // },

}