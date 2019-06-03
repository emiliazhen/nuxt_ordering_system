import Vue from 'vue'
// 日期格式化;                         
let filterDateFormatter = (value, fmt) => {
  const date = new Date(value)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
}
let filterDate = (value) => {
  // let date = new Date()
  return (!value || value === '1900/01/01 00:00:00' || value === '9999/12/31 23:59:59') ? '-' : value.substring(0, value.length - 9).replace(/\//g, '-')
}
let filters = {
  filterDateFormatter,
  filterDate
}
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
export default filters
