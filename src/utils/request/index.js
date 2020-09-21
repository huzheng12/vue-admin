/**
 * @name Export request object
 * @author SunSeekerX
 * @time 2019-12-06 10:15:04
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-03 19:59:18
 */

import createRequest from './request.js'

// Export default axios
export const request = createRequest()

// export const upload = createRequest({
//     baseURL: process.env.VUE_APP_ALIOSS_URL
//   })
