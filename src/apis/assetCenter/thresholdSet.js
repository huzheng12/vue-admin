import {request as axios}  from "@/utils/request/index.js";

export default {
    // 资产中心》获取平台钱包币种阈值设置
    getBalanceReminderList: ({coinCode}) => {
        return axios.request({
            url: '/web/balanceReminder/list',
            method: 'post',
            data: {
                coinCode // 币种类型 不支持模糊查询
            }
        })
    },
    // 资产中心》添加
    saveBalanceReminder: ({ coinCode, thresholdValue }) => {
        return axios.request({
            url: '/web/balanceReminder/save',
            method: 'post',
            data: {
                coinCode,
                thresholdValue
            }
        })
    },
    // 资产中心》修改阈值和开启状态
    editBalanceReminder: ({ coinCode, thresholdValue, status }) => {
        return axios.request({
            url: '/web/balanceReminder/edit',
            method: 'post',
            data: {
                coinCode,
                thresholdValue,
                status
            }
        })
    },
    // 资产中心》删除
    removeBalanceReminder: (coinCode) => {
        return axios.request({
            url: '/web/balanceReminder/remove',
            method: 'post',
            data: {
                coinCode
            }
        })
    },
    // 资产中心》修改状态
    // editStatusBalanceReminder: ({coinCode, status}) => {
    //     return axios.request({
    //         url: '/web/balanceReminder/editStatus',
    //         method: 'post',
    //         data: {
    //             coinCode,
    //             status
    //         }
    //     })
    // }
}