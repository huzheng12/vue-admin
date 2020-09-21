import {request as axios}  from "@/utils/request/index.js";
// import { upload }  from "@/utils/request/index.js";
export default {
  // 多语种配图 > 获取多语种配图列表数据
  bannerList: ({ pageNum, pageSize, langCode }) => {
    return axios.request({
      url: "/appBanner/page",
      method: "post",
      data: {
        pageNum, // 偏移量
        pageSize, // 条数
        langCode, // 语种
      },
    });
  },

  // 多语种配图 > 通过value获取配图类型相对应的name
  getBannerType: () => {
    return axios.request({
      url: "/appbanner/getBannerType",
      method: "post",
    });
  },

  // 多语种配图 > 获取应用类型
  getApplicationType: () => {
    return axios.request({
      url: "/appbanner/getApplicationType",
      method: "post",
    });
  },

  // 多语种配图 > 上传图片
  upload: (params) => {
    return axios.request({
      url: "/oss/upload",
      method: "post",
      data: params,
    });
  },

  // 多语种配图 > 添加配图
  add: ({
    orOutLink,
    name,
    picturePath,
    orTop,
    langCode,
    resource,
    applicationType,
    orShow
  }) => {
    return axios.request({
      url: "/appBanner/add",
      method: "post",
      data: {
        orOutLink, // 0-无 1-外链
        name, // 轮播名称
        orTop, // 是否置顶
        langCode, // 语种
        picturePath, //图片地址
        resource,   //资源id
        applicationType, //0-web 1-app 2-h5
        orShow    //0不显示，1显示
      },
    });
  },

  // 多语种配图 > 通过id获取配图对象
  modifysee: ({ id }) => {
    return axios.request({
      url: "/appBanner/getOne",
      method: "post",
      data: {
        id,
      },
    });
  },

  // 多语种配图 > 修改配图
  modify: ({
    id,
    name,
    picturePath,
    applicationType,
    orOutLink,
    orTop,
    langCode,
    resource,
    orShow
  }) => {
    return axios.request({
      url: "/appBanner/modify",
      method: "post",
      data: {
        id, // 唯一标识
        name, // 图片名字
        picturePath, // 图片地址
        orTop,
        orOutLink,
        applicationType, // 0电脑版1手机版2H5版
        langCode, // 语种类型
        resource,
        orShow
      },
    });
  },

  //  多语种配图 > 删除配图
  remove: ({ ids }) => {
    return axios.request({
      url: "/appBanner/remove",
      method: "post",
      data: {
        ids,
      },
    });
  },
};
