import ManualDWManage from './ManualDWManage'
import DepositWithdraw from './DepositWithdraw'
import badDebt from './badDebt'
import thresholdSet from './thresholdSet'

export default{
    ...ManualDWManage,
    ...DepositWithdraw,
    ...badDebt,
    ...thresholdSet
}