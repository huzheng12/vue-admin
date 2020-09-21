/**
 * @name Handle error
 * @author SunSeekerX
 * @time 2019-11-27 15:18:44
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-10 14:22:02
 */

import { Message } from 'element-ui'

let timer = null
/**
 * @name 防抖通知
 * @param { Object } 通知配置对象
 */

function MessageFun(options) {
  if (timer) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
    }, 300)
    return
  }

  Message(
    Object.assign(
      {
        message: 'success',
        type: 'success'
      },
      options
    )
  )

  timer = setTimeout(() => {
    timer = null
  }, 300)
}

function handleRequestFail({ message = '请求失败', type = 'warning' }) {
  MessageFun({ message, type })
}

/**
 * @name Handle api request exception
 * @description when api request fail, you should using this in your catch block
 * @param { Error } e exception object
 * @returns void
 */
function handleApiRequestException(e) {
  Message({
    type: 'error',
    message: '请求失败'
  })
  console.error(e)
}

/**
 * @name Handle WebSocket exception
 * @description when WebSocket exception, you should using this in your catch block
 * @param { Error } e exception object
 * @returns void
 */
function handleWebSocketException(e) {
  console.error(e)
}

/**
 * @name Handle application exception
 * @description when Application exception, you should using this in your catch block
 * @param { Error } e exception object
 * @returns void
 */
function handleApplicationException(e) {
  console.error(e)
}

export {
  MessageFun,
  handleRequestFail,
  handleApiRequestException,
  handleWebSocketException,
  handleApplicationException
}
