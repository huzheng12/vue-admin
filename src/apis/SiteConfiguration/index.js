/**
 * @name
 * @author
 * @time 2020-03-16 10:39:30
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-03-17 14:52:27
 */

import AccountManagement from './AccountManagement'
import systemConfig from './systemConfig'
import CoinShelvesManage from './CoinShelvesManage'
import SiteInfoManagement from './SiteInfoManagement'
import MarketManagement from './MarketManagement'
import AppVersionManagement from './AppVersionManagement'

export default {
  ...AccountManagement,
  ...CoinShelvesManage,
  ...systemConfig,
  ...SiteInfoManagement,
  ...MarketManagement,
  ...AppVersionManagement
}
