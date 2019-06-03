import axios from '~/utils/myAxios'
// 分页查询供应商;  {pageSize:每页大小,pageIndex:页码,供应商名称/简称 关键字;keyValues}
export const GETPROVIDERLIST = (params) => axios.get('/provider/getProviderList',{params}).then(res => res.data)
// 获取优质供应商; {}
export const GETGRADEPROVIDERLIST = (params) => axios.get('/provider/getGradeProviderList',{params}).then(res => res.data)
// ID获取单个供应商; {id} 
export const GETPROVIDERBYID = (params) => axios.get('/provider/getProviderById',{params: {'id': params}}).then(res => res.data)
// 分页查询款式； {pageIndex:页码,pageSize:每页大小;largeType:种类,categoryType:品类,goldType:成色,search:关键词搜索,providerId:供应商ID}
export const GETPATTERNBASICLIST = (params) => axios.get('/patternBasic/getPatternBasicList',{params}).then(res => res.data)
// 根据所传id删除收藏夹;
export const DELETEFAVORITE = (params) => axios.delete('/favorite/deletefavorite',{data: params}).then(res => res.data)
