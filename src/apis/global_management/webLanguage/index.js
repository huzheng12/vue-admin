import {request as axios}  from "@/utils/request/index.js";

export default {
  // WEB语言包翻译 > 站点基础词汇》通过typeKey查询数据
  getBaseConfigData: ({ typeKey }) => {
    return axios.request({
      url: '/applanguage/getBaseConfigData',
      method: 'post',
      data: {
        typeKey  
      }
    })
  },
  // WEB语言包翻译 > 站点基础词汇》初始化列表
  applanguageToBasePage: ({ baseConfigzh_CN }) => {
    return axios.request({
      url: '/applanguage/toBasePage/baseConfigzh_CN',
      method: 'post',
      data: {
        baseConfigzh_CN   
      }
    })
  },
  // WEB语言包翻译 > 站点基础词汇》保存修改
  appconfigSave: ({ jsonData,typeKey }) => {
    return axios.request({
      url: '/appconfig/save',
      method: 'post',
      data: {
        jsonData,
        typeKey   
      }
    })
  },
  // WEB语言包翻译 > 站点基础词汇》页面标题名称
  applanguageList: ({ offset,languageDic,limit,langType,wordSource,langVal_like,langKey_like }) => {
    return axios.request({
      url: '/applanguage/list',
      method: 'post',
      data: {
        offset,
        limit,
        languageDic,
        langType,
        wordSource,
        langVal_like,
        langKey_like
      }
    })
  },
  // WEB语言包翻译 > 页面标题名称》保存单条数据修改
  applanguageUpdate: ({ langValCell,langTypeCell,id }) => {
    return axios.request({
      url: `/applanguage/update/${id}`,
      method: 'post',
      data: {
        langValCell,
        langTypeCell   
      }
    })
  },
  // WEB语言包翻译 > 页面标题名称》保存单条数据修改
  applanguageAdd: ({ wordSource,langKey,langVal_zh_CN,langVal_en,langVal_kor,langVal_fr,langVal_es,langVal_zh_TW,langVal_jp,langType }) => {
    return axios.request({
      url: '/applanguage/add',
      method: 'post',
      data: {
        wordSource,
        langKey,
        langVal_zh_CN,
        langVal_en,
        langVal_kor,
        langVal_fr,
        langVal_es,
        langVal_zh_TW,
        langVal_jp,
        langType
      }
    })
  },
  // WEB语言包翻译 > 页面标题名称》导出json文件
  exportJsonFile: ({ wordSource,langType,langCode }) => {
    return axios.request({
      url: '/applanguage/exportJsonFile',
      method: 'post',
      data: {
        wordSource,
        langType,
        langCode   
      }
    })
  },
}