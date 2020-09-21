import {request as axios}  from "@/utils/request/index.js";

export default {
  // 币币交易 > 获取交易区币种
  toList: () => {
    return axios.request({
      url: '/exchange/excointocoin/toList',
      method: 'post'
    })
  },

  // 币币交易 >  获取交易对列表
  list: ({ unstate, order, offset, limit, tradeArea }) => {
    return axios.request({
      url: '/exchange/excointocoin/list',
      method: 'post',
      data: {
        unstate,    // 2（正常交易对）
        order,      // asc（排序方式）
        offset,     // 偏移量
        limit,      // 页行数
        tradeArea   // 交易区
      }
    })
  },

  // 币币交易 > 添加交易对
  add: ({
    tradeArea,           
    coinCode,            
    averagePrice,        
    fixPriceType,        
    keepDecimalFixPrice, 
    keepDecimalCoinCode, 
    rose,                
    decline,             
    takeFeeRate,          
    makeFeeRate,         
    sellMinCoin,         
    oneTimeOrderNum,     
    klineType,
    buyMinMoney          
  }) => {
    return axios.request({
      url: '/exchange/excointocoin/add',
      method: 'post',
      data: {
        tradeArea,           // 交易区
        coinCode,            // 交易币种
        averagePrice,        // 初始定价
        fixPriceType,        // 交易区类型
        keepDecimalFixPrice, // 价格小数位
        keepDecimalCoinCode, // 数量小数位
        rose,                // 限价涨幅(%)
        decline,             // 限价跌幅(%)
        takeFeeRate,          // 吃单手续费率(%)
        makeFeeRate,         // 挂单手续费率(%)
        sellMinCoin,         // 单笔最小下单数量(个)
        oneTimeOrderNum,     // 单笔最大下单数量(个)
        klineType,            // K线模式
        buyMinMoney
      }
    })
  },


  // 币币交易 > 修改交易对时查看交易对信息
  modifysee: ({ id }) => {
    return axios.request({
      url: `/exchange/excointocoin/modifysee/${id}/USDT`,
      method: 'post'
    })
  },


  // 币币交易 > 修改交易对
  modify: ({ 
      id,
      tradeArea,           
      coinCode,            
      averagePrice,        
      buyMinMoney,        
      keepDecimalFixPrice, 
      keepDecimalCoinCode, 
      rose,                
      decline,             
      takeFeeRate,          
      makeFeeRate,         
      sellMinCoin,         
      oneTimeOrderNum,     
      klineType         
  }) => {
    return axios.request({
      url: '/exchange/excointocoin/modify',
      method: 'post',
      data: {
        id,                  // 交易对id
        tradeArea,           // 交易区
        coinCode,            // 交易币种
        averagePrice,        // 初始定价
        buyMinMoney,         // 市价买最小下单数
        keepDecimalFixPrice, // 价格小数位
        keepDecimalCoinCode, // 数量小数位
        rose,                // 限价涨幅(%)
        decline,             // 限价跌幅(%)
        takeFeeRate,         // 吃单手续费率(%)
        makeFeeRate,         // 挂单手续费率(%)
        sellMinCoin,         // 单笔最小下单数量(个)
        oneTimeOrderNum,     // 单笔最大下单数量(个)
        klineType            // K线模式
      }
    })
  },

  // 币币交易 > 开启交易对
  open: ({ id }) => {
    return axios.request({
      url: `/exchange/excointocoin/open/${id}`,
      method: 'post'
    })
  },

  // 币币交易 > 关闭交易对
  close: ({ id }) => {
    return axios.request({
      url: `/exchange/excointocoin/close/${id}`,
      method: 'post'
    })
  },

  // 币币交易 > 删除交易对
  remove: ({ id }) => {
    return axios.request({
      url: `/exchange/excointocoin/remove/${id}`,
      method: 'post'
    })
  },
  
  // 币币交易 > 添加K线机器人
  addKlineRobot: ({ id }) => {
    return axios.request({
      url: `/exchange/excointocoin/addKlineRobot/${id}`,
      method: 'post',
      data: {
        robotType: 1
      }
    })
  },
  // 币币交易 > 添加分红机器人
  addBonusRobot: () => {
    return axios.request({
      url: `/exchange/excointocoin/addKlineRobot`,
      method: 'post',
      data: {
        robotType: 4
      }
    })
  },

  // 币币交易 > 添加深度机器人
  addDeepRobot: ({ id }) => {
    return axios.request({
      url: `/exchange/excointocoin/addDeepRobot/${id}`,
      method: 'post'
    })
  },

  //  币币交易 > 测试接口
  testApi: ({ id, coinCode, fixPriceCoinCode }) => {
    return axios.request({
      url: `/exchange/exrobot/testApi/${id}`,
      method: 'post',
      data: {
        coinCode,
        fixPriceCoinCode
      }
    })
  }



}
