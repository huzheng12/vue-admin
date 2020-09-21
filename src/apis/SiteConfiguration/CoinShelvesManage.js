import {request as axios}  from "@/utils/request/index.js";


export default{
    // 站点配置》币种上架管理》币种资料管理》列表查询
    coinProduct: params =>{
        const { offset,limit,coinCode } = params
        return axios.request({
            url: '/product/coins',
            method: 'get',
            params: {
                offset,
                limit,
                coinCode, // 币种代码
            }
        })
    },
    // 站点配置》币种上架管理》币种资料管理》添加币种
    addProduct: params =>{
        const { name,coinCode,totalNum,allName,issueTime,picturePath,stock,walletDownload,blockBrowser,writeBook,officialWebsite,productReferral } = params
        return axios.request({
            url: '/product/add',
            method: 'post',
            data: {
                name,//币种名称
                coinCode, // 币种代码
                totalNum,//发行总量
                issueTime,//发行时间
                picturePath,//币种icon
                stock,//市场流通量
                allName,//全称
                walletDownload,//钱包下载地址
                blockBrowser,//区块查询
                writeBook,//白皮书
                officialWebsite,//官网
                productReferral//币种介绍
            }
        })
    },
    // 站点配置》币种上架管理》币种资料管理》查询单个币种
    product: params =>{
        const { id } = params
        return axios.request({
            url: `/product/${id}`,
            method: 'get',
        })
    },
    // 站点配置》币种上架管理》币种资料管理》上传图片
  appAppealAddPicture: params => {
    return axios.request({
      url: '/upload/addPicture',
      method: 'upload',
      data: params // MultipartFile MultipartFile	Y
    })
  },
    // 站点配置》币种上架管理》币种资料管理》修改币种信息
    modifyOption: params =>{
        const { id, name,coinCode,totalNum,allName,issueTime,picturePath,stock,walletDownload,blockBrowser,writeBook,officialWebsite,productReferral } = params
        return axios.request({
            url: '/product/modifyOption',
            method: 'post',
            data: {
                id, //币种id
                name,//币种名称
                coinCode, // 币种代码
                totalNum,//发行总量
                issueTime,//发行时间
                picturePath,//币种icon
                stock,//市场流通量
                allName,//全称
                walletDownload,//钱包下载地址
                blockBrowser,//区块查询
                writeBook,//白皮书
                officialWebsite,//官网
                productReferral//币种介绍
            }
        })
    },
    // 站点配置》币种上架管理》币种资料管理》上架
    shelves: params =>{
        const { id } = params
        return axios.request({
            url: `/product/shelves/${id}`,
            method: 'get',
        })
    },
    // 站点配置》币种上架管理》币种资料管理》下架
    takeOff: params =>{
        const { id } = params
        return axios.request({
            url: `/product/takeOff/${id}`,
            method: 'get',
        })
    },
    // 站点配置》币种上架管理》币种参数配置》修改币种参数
    modifyConfig: params =>{
        const { id,openTibi,paceType,paceCurrecy,leastPaceNum,oneDayPaceNum,openChongbi,keepDecimalForCurrency,keepDecimalForCoin,autoPaceNum } = params
        return axios.request({
            url: '/product/modifyConfig',
            method: 'post',
            data:{
                id,     //编号
                openTibi,   //0.否 1.是
                paceType,   //手续费类型 1.百分比 2.固定费率
                paceCurrecy,//手续费
                leastPaceNum,//单次提币最小数量
                oneDayPaceNum,//单日提币最大数量
                openChongbi,//是否可冲币 0.否 1.是
                keepDecimalForCurrency,//折合法币保留小数位数
                keepDecimalForCoin, //币的位数
                autoPaceNum
            }
        })
    },
}