import {request as axios}  from "@/utils/request/index.js";


export default{
    // otc》otc订单管理》全部订单管理》拉去数据
    otcapptransaction: params => {
        const { offset, limit,status,buyEmail,buyMobilePhone,sellEmail,sellMobilePhone } = params
        return axios.request({
            url: '/exchange/otcapptransaction/list',
            method: 'post',
            data: {
                offset, // 从第几条开始
                limit, // 每页多少条
                status, //状态 '1待支付 2已付款待确认 3已完成 4申诉中待回复 5已取消 6申请退款中 7退款已驳回 8申诉完成 9申诉成功,待确认 10申诉失败,待确认 11平台通过申诉 12平台驳回申诉 13退款成功',
                buyEmail,  //买方邮箱
                buyMobilePhone,    //买方电话
                sellEmail, //卖方邮箱
                sellMobilePhone, //卖方手机
            }
        })
    },
    // otc》otc订单管理》用户广告》
    releaseList: params => {
        const { offset, limit,status,email,mobilePhone } = params
        return axios.request({
            url: '/exchange/otcapptransaction/releaseList',
            method: 'post',
            data: {
                offset, // 从第几条开始
                limit, // 每页多少条
                email, //邮箱
                mobilePhone,  //手机
                status,    //状态 0关闭 1开启
            }
        })
    },
    // otc》otc订单管理》用户广告》清理无效广告
    clearAds: () => {
        return axios.request({
            url: '/otc/releaseadvertisement/clear',
            method: 'post',
        })
    },
    // otc》otc订单管理》用户广告》禁用广告
    disableAds: params => {
        const { ids } = params
        return axios.request({
            url: '/otc/releaseadvertisement/banUser',
            method: 'post',
            data:{
                ids
            }
        })
    },
    // otc》otc订单管理》申诉中订单查询》获取已开启的申诉文档
    openList: () => {
        return axios.request({
            url: '/exchange/otcAppealTemplate/openList',
            method: 'post',
        })
    },
    // otc》otc订单管理》申诉中交易查询》单个订单查询
    otcapptransactionLook: params => {
        const { id } = params
        return axios.request({
            url: '/exchange/otcapptransaction/look',
            method: 'post',
            data:{
                id
            }
        })
    },
    // otc》otc订单管理》申诉中交易查询》回复
    orderReplay: params => {
        const { transactionNum,platFormContent } = params
        return axios.request({
            url: '/exchange/otcapptransaction/orderReplay',
            method: 'post',
            data:{
                transactionNum, //交易单号
                platFormContent //平台意见
            }
        })
    },
    // otc》otc订单管理》申诉中交易查询》驳回
    examineAndreject: params => {
        const { transactionNum,platFormContent,type } = params
        return axios.request({
            url: '/exchange/otcapptransaction/examineAndreject',
            method: 'post',
            data:{
                transactionNum, //交易单号
                platFormContent, //平台意见
                type    /*状态1待支付 2已付款待确认 3已支付 4申诉中待回复 5已取消 6申请退款中 7退款已驳回 8申诉完成
                        * 9申诉成功,待确认 10申诉失败,待确认 11平台通过申诉 12平台驳回申诉 13退款成功 14已完成
                        * 15买家申诉中 16卖家申诉中*/
            }
        })
    },
    // otc》otc订单管理》申诉中交易查询》取消订单
    cancleOrder: params => {
        const { transactionNum } = params
        return axios.request({
            url: '/exchange/otcapptransaction/cancleOrder',
            method: 'post',
            data:{
                transactionNum, //交易单号
            }
        })
    },
    // otc》otc订单管理》申诉中交易查询》订单成立
    orderCompleted: params => {
        const { transactionNum } = params
        return axios.request({
            url: '/exchange/otcapptransaction/orderCompleted',
            method: 'post',
            data:{
                transactionNum, //交易单号
            }
        })
    },
}