import Vue from 'vue'

// 转义
Vue.filter('replaceStr', (val) => {
  return val
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&ntilde;/g, 'ñ')
        .replace(/&ccedil;/g, 'ç')
})