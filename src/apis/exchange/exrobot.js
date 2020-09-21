import {request as axios}  from "@/utils/request/index.js";

export default {
    // 分红机器人列表查询
    getBonusList: ({robotType, offset, limit, fixPriceCoinCode}) => {
        return axios.request({
            url: `/exchange/exrobot/bonusList?robotType=${robotType}`,
            method: 'post',
            data: {
                // robotType,
                offset, 
                limit, 
                fixPriceCoinCode // 语种
            }
        })
    },
    // 批量绑定账号
    setAccount: ({ id, account, pwd}) => {
        return axios.request({
            url: '/exchange/exrobot/setAccount',
            method: 'post',
            data: {
                id, // 机器人账号id
                account, // 机器人用户账号
                pwd, // 机器人用户密码
            }
        })
    },
}