/**
 * @name
 * @author SunSeekerX
 * @time 2020-02-03 15:58:17
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-03 19:53:39
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

// import isMobilePhone from 'validator/lib/isMobilePhone'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
// export function validUsername(str) {
//   // return isMobilePhone(str, 'zh-CN')
//   // const valid_map = ['admin', 'editor']
//   // return valid_map.indexOf(str.trim()) >= 0
// }
