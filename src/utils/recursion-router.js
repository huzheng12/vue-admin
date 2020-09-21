/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
import router,{website,notFind,btnRoute,global_management,layout,customerService,common} from '@/router'
import store from '@/store'

export function recursionRouter(userRouter = [], allRouter = []) {
    var realRoutes = []
    allRouter.forEach((v) => {
        userRouter.forEach((item) => {
            if (item.id === v.meta.id) {
                if (item.children && item.children.length > 0) {
                    v.children = recursionRouter(item.children, v.children)
                }
                realRoutes.push(v)
            }
        })
    })
    return realRoutes
}
//parentId 父id value整个数组
export function simpleDataFormat(parentId, value){
    var children = [];
    // console.log(value);
    for (let item of value){
      if(item.pkey == parentId){
        var baseData = Object.assign({},item);
        baseData.label = item.name;
        children.push(baseData);
      }
    }
    
    if(children.length > 0){
      for (let item2 of children){
        var _data = simpleDataFormat(item2.mkey, value);
        if(_data.length > 0){
          item2.children = _data;
        }
      }
    }
    return children;
  }

/**
 *
 * @param {Array} routes 用户过滤后的路由
 *
 * 抽取公共部分,过滤真正路由
 */
export function filterRouter(param,btn){
  // console.log(recursionRouter);
  let websiteRoutes=recursionRouter(param.site_configuration,website)
  let oauthRoutes=recursionRouter(param.global_management,global_management)
  let customerRoutes=recursionRouter(param.customer_service,customerService)
  // let otcRoutes=recursionRouter(param.otc_management,otc)
  // let assetCenterRoutes=recursionRouter(param.asset_center,asset_center)
  // let coinsManageRoutes=recursionRouter(param.coins_management,coins_management)

  let btnRoutes=btnRouteFilter(btn,btnRoute,layout)
  // console.log(btnRoutes);
  
  // const list={}
  // list.websites=websiteRoutes
  // list.global_management=oauthRoutes
  // list.customer_service=customerRoutes
  // list.otc=otcRoutes
  // list.asset_center=assetCenterRoutes
  // list.coins_management=coinsManageRoutes
  // store.commit('UPDATE_ROUTEINFO',list)
  const routeList=common.concat(websiteRoutes,btnRoutes,customerRoutes,oauthRoutes,notFind)
  router.addRoutes(routeList)

  store.commit('UPDATE_SIDEBAR',JSON.parse(JSON.stringify(routeList)))

  
}


/**
 *
 * @param {Array} routes 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
export function setDefaultRoute(routes) {
    routes.forEach((v) => {
        if (v.children && v.children.length > 0) {
            v.redirect = { name: v.children[0].name }
            setDefaultRoute(v.children)
        }
    })
}


/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @param  {Array} layout  layout路由
 * @return {Array} realRoutes 过滤后的路由
 */
function btnRouteFilter(userRouter=[],allRouter=[],layout=[]){
  var realRoutes = []
  
    allRouter.forEach((v) => {
        userRouter.forEach((item) => {
            if(v.meta.id==item.id){
              layout[0].children.push(v)
              realRoutes=Object.assign([],layout)
            }
        })
    })
  return realRoutes
}


/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @param  {Array} layout  layout路由
 * @return {Array} realRoutes 过滤后的路由
 */

 export function filterBtnRoute(id){
  const btnRoute=JSON.parse(sessionStorage.getItem('btnRoute'))
  let flag=false
  btnRoute.forEach(item=>{
    // console.log(item==1174)
    if(item.id===id){
      flag=true
    }
  })
  return flag
 }