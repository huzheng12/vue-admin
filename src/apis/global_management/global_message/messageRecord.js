import {request as axios}  from "@/utils/request/index.js";

export default {
  // 多语种短信 > 分页查询短信发送记录
  sendMessageList: ({ offset, limit, mobileNum_like, sendStatus_EQ }) => {
    return axios.request({
      url: '/appmessage/sendMessageList',
      method: 'post',
      data: {
        offset,           // 偏移量
        limit,            // 条数
        mobileNum_like,   // 电话号码
        sendStatus_EQ    // 发送状态
      }
    })
  }

}
