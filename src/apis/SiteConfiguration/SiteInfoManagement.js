import {request as axios}  from "@/utils/request/index.js";

export default {
  // 站点配置》站点信息管理》友情链接管理列表
  linkslist: () => {
    return axios.request({
      url: '/web/appfriendlink/links',
      method: 'post'
    })
  },
  // 站点配置》站点信息管理》友情链接管理》添加友情链接
  addlink: params => {
    const { name, linkUrl, status, picturePath } = params
    return axios.request({
      url: '/web/appfriendlink/add',
      method: 'post',
      data: {
        name, // 名称
        linkUrl, // 链接地址
        status, // 状态
        picturePath // 图片地址
      }
    })
  },
  // 站点配置》站点信息管理》友情链接管理》修改友情链接页面数据
  linkDatas: params => {
    const { id } = params
    return axios.request({
      url: `/web/appfriendlink/${id}`,
      method: 'get'
    })
  },
  // 站点配置》站点信息管理》友情链接管理》修改友情链接
  modifylink: params => {
    const { id, name, linkUrl, status, picturePath } = params
    return axios.request({
      url: '/web/appfriendlink/modify',
      method: 'post',
      data: {
        id,
        name, // 名称
        linkUrl, // 链接地址
        status, // 状态
        picturePath // 图片地址
      }
    })
  },
  // 站点配置》站点信息管理》友情链接管理》删除友情链接/appconfig/page/extraParamConfig
  removelink: params => {
    const { ids } = params
    return axios.request({
      url: '/web/appfriendlink/remove',
      method: 'post',
      data: {
        ids
      }
    })
  },
  // 站点配置》站点信息管理》附加信息配置列表
  infolist: () => {
    return axios.request({
      url: '/appconfig/page/extraParamConfig',
      method: 'get'
    })
  },
  // 站点配置》站点信息管理》附加信息配置》上传图片
  uploadpic: params => {
    return axios.request({
      url: '/oss/upload',
      method: 'post',
      data: params // MultipartFile MultipartFile	Y
    })
  },
  // 站点配置》站点信息管理》附加信息配置》提交保存
  saveDatas: params => {
    const { typeKey, jsonData } = params
    return axios.request({
      url: '/appconfig/extraParamConfig/save',
      method: 'post',
      data: {
        typeKey,
        jsonData
      }
    })
  },
}