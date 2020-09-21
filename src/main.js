/**
 * @name
 * @author SunSeekerX
 * @time 2020-02-03 15:58:17
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-05-13 10:09:55
 */

/**
 * @name Import libs
 */
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'


import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
/**
 * @name Import Files
 */
// import 
import '@/styles/index.scss' // global css
// import FileSaver from 'file-saver'
import App from './App'
import store from './store'
import router from './router'
import '@/permission' // permission control
import '@/icons' // icon
import * as api from '@/apis' // Apis
import * as handleError from '@/utils/handleError' // Handle error
import md5 from '@/utils/md5'
import {filterBtnRoute} from '@/utils/recursion-router'

import './utils/filters' // global filters
import * as util from '@/utils/index'

// import './components/Editor' // vue富文本
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明

/**
 * @name Mounted func
 */
Vue.use(ElementUI)
Vue.prototype.$handleError = handleError // Mounted handle error
Vue.prototype.$api = api // Mounted request apis
Vue.prototype.$md5 = md5
Vue.prototype.$util = util
Vue.prototype.$moment = moment
Vue.prototype.$filterBtnRoute = filterBtnRoute
Vue.prototype.$ALI_OSS_URL = process.env.VUE_APP_ALIOSS_URL 
// Vue.prototype.saveAs = 
/**
 * @name Libs config
 */
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
