import {request as axios}  from "@/utils/request/index.js";

export default {
  // 文稿分类>获取文章分类列表
  getAppcategoryList: ({id, langCode, pageNum,pageSize}) => {
    return axios.request({
      url: '/appCategory/list',
      method: 'get',
      params: {
        id,
        langCode,
        pageNum,
        pageSize
      }
    })
  },
  // 文稿分类>根据分类加载文章类型列表数据
  getSelectlistByCategory: (cid) => {
    return axios.request({
      url: '/appcategory/selectlistByCategory',
      method: 'post',
      data: {
        cid
      }
    })
  },
  // 文稿分类>删除文章类型
  removeAppcategory: (id) => {
    return axios.request({
      url: '/appCategory/remove',
      method: 'post',
      data: {
        id
      }
    })
},
  // 文稿分类>获取单个文章类型
  modifyseeAppcategory: (id) => {
    return axios.request({
      url: '/appCategory/getOne',
      method: 'get',
      params: {
        id
      }
    })
  },
  // 增加文章类型
  addAppcategory: ({ 
        preateId,
        preateName,
        name,
        langCode
  }) => {
    return axios.request({
      url: '/appCategory/add',
      method: 'post',
      data: {
        preateId,
        preateName,
        name,
        langCode
      }
    })
  },
  // 文稿分类>修改文章类型
  modifyAppcategory: ({ 
    id,
    name,
    preateId,
  }) => {
    return axios.request({
      url: '/appCategory/modify',
      method: 'post',
      data: {
        id, // 
        name,
        preateId
      }
    })
  },
}