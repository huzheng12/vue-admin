import {request as axios}  from "@/utils/request/index.js";

export default{
    // otc》otc账户管理》划转记录管理》拉去数据
    otcExDmTransaction: params => {
        const { offset, limit,coinCode,email,mobilePhone,transactionNum,reconciliation,remark } = params
        return axios.request({
        url: '/exchange/otcExDmTransaction/list',
        method: 'post',
        data: {
            offset, // 从第几条开始
            limit, // 每页多少条
            coinCode, //币种
            email,  //邮箱
            mobilePhone,    //手机号
            transactionNum, //订单号
            reconciliation, //对账状态 0：未对账 1：已对账 2：对账失败  3：不需要对账
            remark  //交易备注（中文 例：OTC转BB）
        }
        })
    },
    // otc》otc账户管理》划转记录管理》拉去数据
    otcExdigitalmoneyaccount: params => {
        const { offset, limit,coinCode,email,mobile,lastName,firstName,publicKey } = params
        return axios.request({
        url: '/exchange/otcExdigitalmoneyaccount/list',
        method: 'post',
        data: {
            offset, // 从第几条开始
            limit, // 每页多少条
            coinCode, //币种
            email,  //邮箱
            mobile,    //手机号
            lastName, //姓
            firstName, //名
            publicKey  //钱包地址
        }
        })
    },
}