import {request as axios}  from "@/utils/request/index.js";

export default {
    // 资产中心》手动充提管理》货币账户管理
    exdigitalmoneyaccount: ({offset,limit,coinCode,email,mobilePhone,surname,trueName,publicKey}) => {
      return axios.request({
        url: '/exchange/exdigitalmoneyaccount/list',
        method: 'post',
        data:{
            offset, // 从第几条开始
            limit, // 每页多少条
            coinCode, //币种
            email,  //邮箱
            mobilePhone,    //手机号
            surname, //姓
            trueName, //名
            publicKey,  //钱包地址
        }
      })
    },
    // 资产中心》手动充提管理》手动充币
    rechargeCoin: ({id,number,ukey_code}) => {
        return axios.request({
            url: '/exchange/exdigitalmoneyaccount/recharge',
            method: 'post',
            data:{
                id, // 账户id）
                number, // 充币数量）
                ukey_code, //动态口令）
            }
        })
    },
    // 资产中心》手动充提管理》手动充币
    extract: ({id,number}) => {
        return axios.request({
            url: '/exchange/exdigitalmoneyaccount/getcoin',
            method: 'post',
            data:{
                id, // 账户id）
                number, // 充币数量）
            }
        })
    },
    // 资产中心》手动充提管理》生成账号币种
    accountCreate: ({phone}) => {
        return axios.request({
            url: '/exchange/exdigitalmoneyaccount/create',
            method: 'post',
            data:{
                phone,
            }
        })
    },
}