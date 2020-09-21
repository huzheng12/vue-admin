import {request as axios}  from "@/utils/request/index.js";

export default {
    // 资产中心》坏账》坏账查询
    getBadList: ({ offset, limit, coinCode, email, mobilePhone, inAddress }) => {
        return axios.request({
            url: '/exchange/rechargeMng/badList',
            method: 'post',
            data: {
                offset, // 从第几条开始
                limit, // 每页多少条
                coinCode, //币种
                email,  //邮箱
                mobilePhone,    //手机号
                inAddress,//钱包地址
            }
        })
    },
    // 资产中心》坏账》坏账处理
    updateRechargeMng: ({ transactionNum, txId, status }) => {
        return axios.request({
            url: '/exchange/rechargeMng/update',
            method: 'post',
            data: {
                transactionNum,
                txId,
                status
            }
        })
    }
}