import {request as axios}  from "@/utils/request/index.js";

export default {
  // APP版本管理》APP安装包管理》列表
  versionmanagementlist: params => {
    const { page, count, appType, appStatus } = params
    return axios.request({
      url: '/web/appfileupload/list',
      method: 'get',
      params: {
        page,
        count,
        appType,
        appStatus
      }
    })
  },
  // APP版本管理》APP安装包管理》添加
  addrelease: params => {
    const { appVersion, appCodePath, appType, appFilePath } = params
    return axios.request({
      url: '/web/appfileupload/add',
      method: 'post',
      data: {
        appVersion,
        appCodePath,
        appType,
        appFilePath
      }
    })
  },
  // APP版本管理》APP安装包管理》添加》上传图片
  uploadpicture: params => {
    return axios.request({
      url: '/oss/upload',
      method: 'post',
      data: params // MultipartFile MultipartFile	Y
    })
  },
  // APP版本管理》APP安装包管理》添加》生成二维码
  createQRCode: params => {
    const { content } = params
    return axios.request({
      url: '/oss/createQRCode',
      method: 'post',
      data: {
        content
      }
    })
  },
  // APP版本管理》APP安装包管理》修改版本号
  modifyVersion: ({ appVersion, id }) => {
    return axios.request({
      url: `/web/appfileupload/modifyVersion/${id}`,
      method: 'post',
      data: {
        appVersion
      }
    })
  },
  // APP版本管理》APP安装包管理》一键还原
  recoveryVersion: ({ id })=> {
    return axios.request({
      url: `/web/appfileupload/enable/${id}`,
      method: 'post'
    })
  },
  // APP版本管理》APP下载二维码》列表
  appqrcodelist: () => {
    return axios.request({
      url: '/web/appfileupload/appQRCodeConfig',
      method: 'get'
    })
  },
  // APP版本管理》APP下载二维码》保存
  saveparam: params => {
    const { jsonData } = params
    return axios.request({
      url: '/web/appfileupload/appQRCodeConfig/save',
      method: 'post',
      data: {
        jsonData
      }
    })
  },
}