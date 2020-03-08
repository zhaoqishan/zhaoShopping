import request from '@/utils/request'
/** Home 模块 **/
export function getHomeData(params) {
  return request({
    url: '/homeApi',
    method: 'get',
    params
  })
}
// 特色专区
export function getHomeSpecialZone(params) {
  return request({
    url: '/homeApi/specialZone',
    method: 'get',
    params
  })
}
/** 分类(Category) 模块 **/
// Category 列表页面数据
export function getList(params) {
  return request({
    url: '/homeApi/categories',
    method: 'get',
    params
  })
}
// Category 右边内容页面数据 需要根据左边点击传值
export function getCategoryData(params) {
  return request({
    url: '/homeApi/categories',
    method: 'get',
    params
  })
}
// Category 右边内容页面数据 需要根据左边点击传值
export function getCategoryDetailData(urlStr, params) {
  return request({
    url: '/homeApi/categoriesdetail' + urlStr,
    method: 'get',
    params
  })
}
/** 吃什么 模块 **/
// 今日菜单的所有菜单分类
export function getTodayMenuCategoryList(params) {
  return request({
    url: '/recipe/allScene',
    method: 'get',
    params
  })
}
// 菜品菜单
export function getTodayMenuDetail(urlStr, params) {
  return request({
    url: '/recipe/menulist' + urlStr,
    method: 'get',
    params
  })
}
/** 购物车页面 猜你喜欢 **/
export function getGuessYouLike(params) {
  return request({
    url: '/cart/youlike',
    method: 'get',
    params
  })
}

/** 登录界面接口 ***/
// 1.获取手机验证码(GET)
// Easy Mock 模拟发送验证码
export function getPhoneCaptcha(params) {
  return request({
    url: '/send_code',
    method: 'get',
    params
  })
}
// 2.手机验证码登录(POST)
// Easy Mock 模拟用户登录
export function phoneCaptchaLogin(data) {
  return request({
    url: '/login_code',
    method: 'post',
    data
  })
}
// 3.账号密码登录(POST)
export function pwdLogin(data) {
  return request({
    url: '/recipe/menulist',
    method: 'post',
    data
  })
}
/** 个人中心 **/
// 1.绿卡Vip
export function getVipContent(params) {
  return request({
    url: '/vip',
    method: 'get',
    params
  })
}
