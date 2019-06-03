// ROOT-URI For API;
let DOMAIN_APIS
// ROOT-URI For Image-resources;
let DOMAIN_IMAGE
let DOMAIN_TEMPIMAGE
let DOMAIN_VIDEO
// Setting For Cookies's DOMAIN;
let DOMAIN_COOKIES

let DOMAIN_STATION
let DOMAIN_LOGIN
let DOMAIN_MSGSTATION
let DOMAIN_CLUSTER
let protocol = 'http:'
if(process.browser) {
  protocol = window.location.protocol
}

if (process.env.NODE_ENV === 'dev') {
  // 开发模式
  DOMAIN_APIS = protocol + '//api.clg.emilia.com'
  DOMAIN_TEMPIMAGE = protocol + '//temp.emila1.com'
  DOMAIN_IMAGE = protocol + '//image.emila1.com'
  DOMAIN_VIDEO = protocol + '//video.emila1.com'
  DOMAIN_LOGIN = protocol + '//saas.emila1.com'
  DOMAIN_STATION = protocol + '//stationui.emila1.com'
  DOMAIN_MSGSTATION = protocol + '//stationui.msg.emila1.com'
  DOMAIN_CLUSTER = protocol + '//clusterui.emila1.com'
} else if (process.env.NODE_ENV === 'testing') {
  // 测试组测试
  DOMAIN_APIS = protocol + '//api.clg.emilia.net'
  DOMAIN_TEMPIMAGE = protocol + '//temp.emilia.net'
  DOMAIN_IMAGE = protocol + '//image.emilia.net'
  DOMAIN_VIDEO = protocol + '//video.emilia.net'
  DOMAIN_LOGIN = protocol + '//saas.emilia.net'
  DOMAIN_STATION = protocol + '//stationui.emilia.net'
  DOMAIN_MSGSTATION = protocol + '//stationui.msg.emilia.net'
  DOMAIN_CLUSTER = protocol + '//clusterui.emilia.net'
} else if (process.env.NODE_ENV === 'testing1') {
  // 开发组测试
  DOMAIN_APIS = protocol + '//api.clg.emila1.com'
  DOMAIN_TEMPIMAGE = protocol + '//temp.emila1.com'
  DOMAIN_IMAGE = protocol + '//image.emila1.com'
  DOMAIN_VIDEO = protocol + '//video.emila1.com'
  DOMAIN_LOGIN = protocol + '//saas.emila1.com'
  DOMAIN_STATION = protocol + '//stationui.emila1.com'
  DOMAIN_MSGSTATION = protocol + '//stationui.msg.emila1.com'
  DOMAIN_CLUSTER = protocol + '//clusterui.emila1.com'
} else {
  // 正式外网发布
  DOMAIN_APIS = protocol + '//api.clg.emilia.com'
  DOMAIN_TEMPIMAGE = protocol + '//temp.emilia.com'
  DOMAIN_IMAGE = protocol + '//image.emilia.com'
  DOMAIN_VIDEO = protocol + '//video.emilia.com'
  DOMAIN_LOGIN = protocol + '//saas.emilia.com'
  DOMAIN_STATION = protocol + '//stationui.emilia.com'
  DOMAIN_MSGSTATION = protocol + '//stationui.msg.emilia.com'
  DOMAIN_CLUSTER = protocol + '//clusterui.emilia.com'
}

export {
  DOMAIN_APIS,
  DOMAIN_TEMPIMAGE,
  DOMAIN_IMAGE,
  DOMAIN_VIDEO,
  DOMAIN_COOKIES,
  DOMAIN_LOGIN,
  DOMAIN_STATION,
  DOMAIN_MSGSTATION,
  DOMAIN_CLUSTER
}
