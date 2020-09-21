import {request as axios}  from "@/utils/request/index.js";

export default {
  // 仪表盘 > 系统用户
  countUsers: () => {
    // return {
    //   success: true,
    //   msg: '成功',
    //   obj: {
    //     userCount: '12322',
    //     merchantCount: '78'
    //   }
    // }
    return axios.request({
      url: '/customer/appcustomer/countUsers',
      method: 'get'
    })
  },
  // 仪表盘 > 24h在线人数
  getHourUser: () => {
    // return {
    //   success: true,
    //   msg: '成功',
    //   obj: {
    //     pc: [{
    //       countDate: '2019-1-1',
    //       countNum: '12'
    //     },
    //     {
    //       countDate: '2019-1-2',
    //       countNum: '13'
    //     },
    //     {
    //       countDate: '2019-1-3',
    //       countNum: '14'
    //     }],
    //     h5: [{
    //       countDate: '2019-1-1',
    //       countNum: '25'
    //     },
    //     {
    //       countDate: '2019-1-2',
    //       countNum: '26'
    //     },
    //     {
    //       countDate: '2019-1-3',
    //       countNum: '27'
    //     }
    //   ]
    //   }
    // }
    return axios.request({
      url: '/customer/appcustomer/getHourUser',
      method: 'post'
    })
  },
  // 仪表盘 > 日活和每日新增人数
  countDayActive: () => {
    // return {
    //   success: true,
    //   msg: '成功',
    //   obj: {
        // dayActive: [{
        //   countDate: '2019-2-12',
        //   countNum: '10'
        // },
        // {
        //   countDate: '2019-2-13',
        //   countNum: '12'
        // }],
    //     newNumber: [{
    //       countDate: '2019-2-12',
    //       countNum: '20'
    //     },
    //     {
    //       countDate: '2019-2-13',
    //       countNum: '40'
    //     }]
    //   }
    // }
    return axios.request({
      url: '/customer/appcustomer/dayActiveAndNew',
      method: 'post'
    })
  },
}