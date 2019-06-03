import axios from 'axios'
// import Cookie from 'js-cookie'
// import store from '~/store'
import * as appSetting from '~/configs/appSetting'
// import router from '~/router/index'
// import {Message} from 'element-ui'
import qs from 'qs'

// 创建AXIOS实例;
const service = axios.create({
  baseURL: appSetting.DOMAIN_APIS,
  timeout: 60000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// REQUEST拦截器
service.interceptors.request.use(
  (config) => {
    if (config.method !== 'get') {
      config.data = JSON.stringify(config.data)
    }
    config.headers.common['access_token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhMmRjZDA4ZC1lMmM1LTQ0MGMtYjAxMC0wMTY1YzQ3MmNjYzUiLCJjcGMiOiJsY2IiLCJlcWkiOm51bGwsInN1YiI6IjAwMDMiLCJleHAiOjE1MzY2NDIzODIsImlhdCI6MTUzNjU5OTE4Mn0.FMnpkBQp5swkMjiqmGWOPqCJXIPBdJ4Wp0F3xEA_PczobdsJKIrD_PQWS7RD7aeXMdM4PpQR6AHxUV0EeyVuFg'
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// // RESPONSE拦截器;
// service.interceptors.response.use(response => {
//   var code = response.data.Code
//   if (code === 'ERROR' && response.data.Command) {
//     if (response.data.Command === 'NotPlatform') {
//       // 跳转到登录
//       window.location.href = appSetting.DOMAIN_LOGIN
//     } else if (response.data.Command === 'NotAuthorized') {
//       // 无权限
//       // router.push({path: '/noauthorized'})
//       console.log('无权限，跳转', 1111)
//     } else {
//       // 错误 注销登录
//       store.dispatch('ACCESS_TOKEN_LOGOUT').then(() => {
//         location.reload()
//       })
//     }
//   } else {
//     return response
//   }
// }, error => {
//   console.log(error)
//   Message.error('服务器错误')
//   return Promise.reject(error)
// })

export default service
