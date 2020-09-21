import {request as axios}  from "@/utils/request/index.js";

export default {
  // 仪表盘 > 交易量查询(币币交易额和币币每日交易手续费)
  transcction: ({ pair, startTime, endTime }) => {
    return axios.request({
      url: '/exchange/statistics/transaction',
      method: 'post',
      data: {
        pair,        // 交易对 多个用,分开 BTC-USDT,BTC-EOS
        startTime,   // 开始日期
        endTime      // 结束日期
      } 
    })
  },
  // transcction: () => {
  //   return {
  //     success: true,
  //     msg: '成功',
  //     obj: [{
  //       transcctionPrice: '11',
  //       transcctionDate: '2019-12-1',
  //       takeFee: '12',
  //       makeFee: '2',
  //       pair: 'BTC/USDT'
  //     },
  //     {
  //       transcctionPrice: '12',
  //       transcctionDate: '2019-12-1',
  //       takeFee: '13',
  //       makeFee: '3',
  //       pair: 'EOS/USDT'
  //     },
  //     {
  //       transcctionPrice: '13',
  //       transcctionDate: '2019-12-2',
  //       takeFee: '14',
  //       makeFee: '4',
  //       pair: 'BTC/USDT'
  //     },
  //     {
  //       transcctionPrice: '14',
  //       transcctionDate: '2019-12-2',
  //       takeFee: '15',
  //       makeFee: '5',
  //       pair: 'EOS/USDT'
  //     }]
  //   }
  // },
  // 仪表盘 > 机器人盈亏查询
  robotDeep: ({ pair, startTime, endTime }) => {
    return axios.request({
      url: '/exchange/statistics/robotDeep',
      method: 'post',
      data: {
        pair,        // 交易对 多个用,分开 BTC-USDT,BTC-EOS
        startTime,   // 开始日期
        endTime      // 结束日期
      } 
    })
  },
  // robotDeep: () => {
  //   return {
  //     success: true,
  //     msg: '成功',
  //     obj: [{
  //       statisticsDate: '2019-12-1',
  //       profit: '-12',
  //       pair: 'BTC_USDT'
  //     },
  //     {
  //       statisticsDate: '2019-12-1',
  //       profit: '12',
  //       pair: 'EOS_USDT'
  //     },
  //     {
  //       statisticsDate: '2019-12-1',
  //       profit: '12',
  //       pair: 'ETH_USDT'
  //     }]
  //   }
  // },
  // 仪表盘 > 充提币查询
  extract: ({ coinCode, startTime, endTime }) => {
    return axios.request({
      url: '/exchange/statistics/extract',
      method: 'post',
      data: {
        coinCode,    // 币种 BTC
        startTime,   // 开始日期
        endTime      // 结束日期
      } 
    })
  },
  // extract: () => {
  //   return{
  //     success: true,
  //     msg: '成功',
  //     obj: [{
  //         coinCode: 'BTC',
  //         fee: '20',
  //         transactionMoney: '1',
  //         transcctionDate: '2019-11-10',
  //         create: '2019-2-6',
  //         transactionType: '1'
  //     },
  //     {
  //         coinCode: 'BTC',
  //         fee: '21',
  //         transactionMoney: '12',
  //         transcctionDate: '2019-11-10',
  //         create: '2019-2-6',
  //         transactionType: '2'
  //     }, 
  //     {
  //         coinCode: 'BTC',
  //         fee: '22',
  //         transactionMoney: '13',
  //         transcctionDate: '2019-11-12',
  //         create: '2019-2-6',
  //         transactionType: '2'
  //     }, 
  //     {
  //         coinCode: 'BTC',
  //         fee: '20',
  //         transactionMoney: '14',
  //         transcctionDate: '2019-11-12',
  //         create: '2019-2-6',
  //         transactionType: '1'
  //     }]
  // }
  // },
  // 仪表盘 > 排行榜查询
  rankingList: () => {
    return axios.request({
      url: '/exchange/statistics/rankingList',
      method: 'post'
    })
  },
  // 筛选 > 下拉框查询交易币和定价币
  selectlist: () => {
    return axios.request({
      url: '/klineRepair/selectlist',
      method: 'post'
    })
  },
  // 筛选 > 下拉框币种
  findall: () => {
    return axios.request({
      url: '/exchange/exproduct/findall',
      method: 'post'
    })
  }

}