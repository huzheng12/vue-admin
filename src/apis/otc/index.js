import otcRules from './otcRules'
import otcAccountManage from './otcAccountManage'
import otcOrders from './otcOrders'
export default{
    ...otcRules,
    ...otcAccountManage,
    ...otcOrders
}