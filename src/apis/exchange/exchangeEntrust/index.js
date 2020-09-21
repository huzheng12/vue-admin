import {request as axios}  from "@/utils/request/index.js";

export default {
  // 币币交易 > 获取交易委托
  list: ({ 
    offset, 
    limit,
    typeStatus,
    email,
    mobilePhone,
    entrustTime_GT,
    entrustTime_LT,
    surname,
    trueName,
    coinCode,
    fixPriceCoinCode,
    entrustWay,
    entrustType,
    source,
    entrustNum
   }) => {
    return axios.request({
      url: '/exchange/exentrust/list',
      method: 'post',
      data: {
        offset,         // 偏移量
        limit,          // 数量  
        typeStatus,    
        email,
        mobilePhone,
        entrustTime_GT,
        entrustTime_LT,
        surname,
        trueName,
        coinCode,          // 交易币种
        fixPriceCoinCode,  // 交易区
        entrustWay,        // 出价类型
        entrustType,       // 委托类型
        source,            // 委托来源
        entrustNum
      } 
    })
  },

  // 币币交易 > 获取所有币种(获取交易币种列表)
  findall: () => {
    return axios.request({
      url: '/exchange/exproduct/findall',
      method: 'post'
    })
  },

  // 币币交易 > 获取交易区币种(交易区)
  toList: () => {
    return axios.request({
      url: '/exchange/excointocoin/toList',
      method: 'post'
    })
  },

  // 币币交易 >  取消委托和批量取消委托
  cancelExEntrust: ({ entrustNums }) => {
    return axios.request({
      url: '/exchange/exentrust/cancelExEntrust',
      method: 'post',
      data: {
        entrustNums
      }
    })
  },

  // 币币交易 > 获取交易明细数据
  orderFindByentrustNum: ({ entrustNum, coinCode, type}) => {
    return axios.request({
      url: '/exchange/exentrust/orderFindByentrustNum',
      method: 'post',
      data: {
        entrustNum,   // 委托单号
        coinCode,     // 币种类型
        type          // 委托类型  1买入 2卖出
      }
    })
  },

  // 币币交易 > 错误委托
  errorList: ({ 
    offset, 
    limit,
    coinCode,
    fixPriceCoinCode,
    entrustWay,
    entrustType,
    source,
    status,
    startTime,
    endTime,
    entrustNum
   }) => {
    return axios.request({
      url: '/exchange/exentrust/errorList',
      method: 'post',
      data: {
        offset,         // 偏移量
        limit,          // 数量  
        coinCode,
        fixPriceCoinCode,
        entrustWay,
        entrustType,
        source,
        status,
        startTime,
        endTime,
        entrustNum
      }
    })
  },

  // 币币交易 > 人工处理
  entrustErrorHandle: ({ entrustNum }) => {
    return axios.request({
      url: '/exchange/exentrust/entrustErrorHandle',
      method: 'post',
      data: {
        entrustNum
      }
    })
  },

  // 币币交易 > 成交订单记录
  recordList: ({ 
      offset, 
      limit,
      coinCode,
      fixPriceCoinCode,
      orderNum,
      transactionCount_LT,
      transactionCount_GT,
      buyEmail,
      buyMobilePhone,
      buyEntrustNum,
      transactionPrice_LT,
      transactionSum_LT,
      transactionTime_LT,
      sellEmail,
      sellMobilePhone,
      sellEntrustNum,
      transactionPrice_GT,
      transactionSum_GT,
      transactionTime_GT
     }) => {
      return axios.request({
        url: '/exchange/exorderinfo/list',
        method: 'post',
        data: {
          offset,         // 偏移量
          limit,          // 数量  
          coinCode,           // 交易币种
          fixPriceCoinCode,   // 交易区
          orderNum,           // 成交单号
          transactionCount_LT,  // 成交数量小于
          transactionCount_GT,  // 成交数量大于
          buyEmail,             // 买方邮箱
          buyMobilePhone,       // 买方手机号
          buyEntrustNum,        // 买方委托单号
          transactionPrice_LT,  // 成交价格小于
          transactionSum_LT,    // 成交金额小于
          transactionTime_LT,   // 成交时间小于
          sellEmail,            // 卖方邮箱
          sellMobilePhone,      // 卖方手机号
          sellEntrustNum,       // 卖方委托单号
          transactionPrice_GT,  // 成交价格大于
          transactionSum_GT,    // 成交金额大于
          transactionTime_GT    // 成交时间大于
        }
      })
    },

  // 币币交易 > 获取交易对列表
  queryOpenArea: () => {
    return axios.request({
      url: '/exchange/extradingarea/queryOpenArea',
      method: 'post'
    })
  },

  // 币币交易 > 交易手续费查询
  listfees: ({ 
      offset, 
      limit,
      coinCode,
      fixPriceCoinCode,
      transactionTime_GT,  
      transactionTime_LT,
      buyPersonInfoEmail,
      buyPersonInfoMobilePhone,
      sellPersonInfoEmail,
      sellPersonInfoMobilePhone
     }) => {
      return axios.request({
        url: '/exchange/exorderinfo/listfees',
        method: 'post',
        data: {
          offset,                              // 偏移量
          limit,                               // 数量  
          coinCode,                            // 交易币种
          fixPriceCoinCode,                    // 交易区
          transactionTime_GT,                  // 开始成交时间
          transactionTime_LT,                  // 结束成交时间
          'buyPersonInfo.email': buyPersonInfoEmail,                     // 买方邮箱
          'buyPersonInfo.mobilePhone': buyPersonInfoMobilePhone,         //  买方手机号
          'sellPersonInfo.email': sellPersonInfoEmail,                   // 卖方邮箱
          'sellPersonInfo.mobilePhone': sellPersonInfoMobilePhone        // 卖方手机号
        } 
      })
    }

}
