import {request as axios}  from "@/utils/request/index.js";

export default {
  // 通过key获取字典信息
  getKey: ({ key }) => {
    return axios.request({
      url: '/appdic/getKey',
      method: 'post',
      data: {
        key
      }
    })
  },
}