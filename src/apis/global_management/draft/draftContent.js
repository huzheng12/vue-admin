import {request as axios}  from "@/utils/request/index.js";

export default {
  // 获取tree
  // getTree
  getLoadTree: ({ langCode }) => {
    return axios.request({
      url: '/appCategory/loadTree',
      method: 'get',
      params:{
        langCode
      }
    })
  },
  // 文稿内容>获取文章内容列表
  getApparticleList: ({ pageNum, pageSize, categoryId}) => {
    return axios.request({
      url: '/appContent/page',
      method: 'get',
      params: {
        pageNum, // 偏移量
        pageSize, // 数量
        categoryId, // 父id
      }
    })
  },
  // 文稿内容>添加文章内容
  addApparticle: ({ 
    categoryName,
    status,
    categoryId, 
    seoTitle, 
    seoKeyword,
    seoDescribe,
    content,
    orOutLink,
    outLink,
    titleImage,
    title,
    shortContent,
    writer,
    source,
    website,
    langCode,
    writerAvatar
  }) => {
    return axios.request({
      url: '/appContent/add',
      method: 'post',
      data: {
        categoryName, // 
        status,
        categoryId, // 
        seoTitle, // 
        seoKeyword,  // 
        seoDescribe,
        content,
        orOutLink,
        outLink,
        titleImage,
        title,
        shortContent,
        writer,
        source,
        website,
        langCode,
        writerAvatar
      }
    })
  },
   // 文稿内容>删除文章内容
   removeApparticle: (ids) => {
    return axios.request({
      url: '/appContent/remove',
      method: 'post',
      data: {
        ids
      }
    })
  },
  changeStatus:({status,id})=>{
    return axios.request({
      url: '/appContent/status',
      method: 'post',
      data: {
        status,
        id
      }
    })
  },
  // 文稿内容>获取单个文章内容
  modifyseeApparticle: (id) => {
    return axios.request({
      url: '/appContent/getOne',
      method: 'post',
      data: {
        id
      }
    })
  },
  // 文稿内容>修改文章内容
  modifyApparticle: ({
    categoryName,
    status,
    categoryId, 
    seoTitle, 
    seoKeyword,
    seoDescribe,
    content,
    orOutLink,
    outLink,
    titleImage,
    title,
    shortContent,
    writer,
    source,
    website,
    langCode,
    writerAvatar,
    id
  }) => {
    return axios.request({
      url: '/appContent/modify',
      method: 'post',
      data: {
        categoryName,
        status,
        categoryId, 
        seoTitle, 
        seoKeyword,
        seoDescribe,
        content,
        orOutLink,
        outLink,
        titleImage,
        title,
        shortContent,
        writer,
        source,
        website,
        langCode,
        writerAvatar,
        id
      }
    })
  },
}