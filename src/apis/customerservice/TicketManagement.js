import {request as axios}  from "@/utils/request/index.js";

export default {
  // 客服中心》客户工单管理》工单类别管理》工单类别列表
  ticketcategorylist: params => {
    const { offset, limit, languageDic_EQ, typeName_like, state } = params
    return axios.request({
      url: '/web/appworkordercategory/list',
      method: 'post',
      data: {
        offset,
        limit, // （页行数）
        languageDic_EQ, // （语种）
        typeName_like, // （类别名称）
        state // （状态：0未受理，1已受理）
      }
    })
  },
  // 客服中心》客户工单管理》工单类别管理》编辑工单类别
  editticketcategory: params => {
    const { id, languageDic, typeName, describes } = params
    return axios.request({
      url: '/web/appworkordercategory/modify',
      method: 'post',
      data: {
        id,
        languageDic,
        typeName,
        describes
      }
    })
  },
  // 客服中心》客户工单管理》工单类别管理》添加工单类别
  addticketcategory: params => {
    const { languageDic, typeName, describes } = params
    return axios.request({
      url: '/web/appworkordercategory/add',
      method: 'post',
      data: {
        languageDic,
        typeName,
        describes
      }
    })
  },
  // 客服中心》客户工单管理》工单类别管理》删除工单类别
  removeticketcategory: params => {
    const { ids } = params
    return axios.request({
      url: '/web/appworkordercategory/remove',
      method: 'post',
      data: {
        ids
      }
    })
  },
  // 客服中心》客户工单管理》工单类别管理》查看工单类别
  viewticketcategory: params => {
    const { id } = params
    return axios.request({
      url: `/web/appworkordercategory/see/${id}`,
      method: 'post'
    })
  },
  // 客服中心》客户工单管理》工单任务处理》工单任务列表
  tickettaskslist: params => {
    const { offset, limit, languageDic, workOrderNo, categoryName, state } = params
    return axios.request({
      url: '/web/appworkorder/list',
      method: 'post',
      data: {
        offset,
        limit, // （页行数）
        languageDic, // （语种）
        workOrderNo, // （工单号）
        categoryName, // （类别名称）
        state // （状态：0未受理，1已受理）
      }
    })
  },
  // 客服中心》客户工单管理》工单任务处理》查看工单任务
  viewtickettasks: params => {
    const { id } = params
    return axios.request({
      url: `/web/appworkorder/see/${id}`,
      method: 'post'
    })
  },
  // 客服中心》客户工单管理》工单任务处理》受理工单任务
  edittickettasks: params => {
    const { id, customerId, workContent, workOrderNo, replyMode, editorValue, replyContent } = params
    return axios.request({
      url: '/web/appworkorder/modify',
      method: 'post',
      data: {
        id,
        customerId,
        workContent, // （工单内容）
        workOrderNo, // （工单号）
        replyMode, // （回复方式  0邮件回复  1系统消息  2短信回复  3电话回复）
        editorValue, // （状态：0未受理，1已受理）
        replyContent
      }
    })
  },
  // 客服中心》客户工单管理》工单任务处理》工单类型列表
  tickettypes: () => {
    return axios.request({
      url: '/web/appworkordercategory/list',
      method: 'post'
    })
  },
}