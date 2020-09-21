import {request as axios}  from "@/utils/request/index.js";

export default {
    // 资产中心》充币提币管理》充币成功查询
    rechargeMngList: ({offset,limit,coinCode,email,transactionType,mobilePhone,status,created_GT,created_LT,transactionNum,surName,trueName,inAddress}) => {
        return axios.request({
            url: '/exchange/rechargeMng/list',
            method: 'post',
            data:{
                offset, // 从第几条开始
                limit, // 每页多少条
                coinCode, //币种
                email,  //邮箱
                mobilePhone,    //手机号
                surName, //姓
                trueName, //名
                inAddress,//钱包地址
                transactionNum,
                created_GT,
                created_LT,
                status,
                transactionType
            }
        })
    },
    // 资产中心》充币提币管理》ERC20查询
    exerc20List: ({offset,limit,name,addCoinType,operator,contractAddress,id}) => {
        return axios.request({
            url: '/exchange/exerc20/list',
            method: 'post',
            data:{
                offset, // 从第几条开始
                limit, // 每页多少条
                name,
                addCoinType,
                operator,
                contractAddress,
                id
            }
        })
    },
    // 资产中心》充币提币管理》ERC20查询>添加新币种
    exerc20Add: ({contractAddress,myprecision,name,addCoinType,coldAddress,}) => {
        return axios.request({
            url: '/exchange/exerc20/add',
            method: 'post',
            data:{
                contractAddress,
                myprecision,
                name,
                addCoinType,
                coldAddress,
            }
        })
    },
    // 资产中心》充币提币管理》ERC20查询>删除币种
    exerc20rRemove: ({ids}) => {
        return axios.request({
            url: '/exchange/exerc20/remove',
            method: 'post',
            data:{
                ids
            }
        })
    },
    // 资产中心》充币提币管理》ERC20查询>通过id查询
    exerc20See: ({id}) => {
        return axios.request({
            url: `/exchange/exerc20/see/${id}`,
            method: 'post',
        })
    },
    // 资产中心》充币提币管理》ERC20查询>修改币种
    exerc20Modify: ({id,contractAddress,myprecision,name,addCoinType,coldAddress}) => {
        return axios.request({
            url: `/exchange/exerc20/modify/${id}`,
            method: 'post',
            data:{
                contractAddress,
                myprecision,
                name,
                addCoinType,
                coldAddress,
            }
        })
    },
    // 资产中心》充币提币管理》提币申请审核》通过审核
    rechargeMngPost: ({ids}) => {
        return axios.request({
            url: `/exchange/rechargeMng/post/${ids}`,
            method: 'post',
        })
    },
    // 资产中心》充币提币管理》提币申请审核》驳回审核
    rechargeMngStop: ({ids,reason}) => {
        return axios.request({
            url: `/exchange/rechargeMng/stop/${ids}`,
            method: 'post',
            data:{
                reason
            }
        })
    },
}