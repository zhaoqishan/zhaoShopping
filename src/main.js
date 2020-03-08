import Vue from 'vue'
import FastClick from 'fastclick'
import VTop from './components/backToTop'
import i18n from './i18n/index'
import VueI18n from 'vue-i18n'
import App from './App'
import store from './store'
import router from './router'
import waterfall from 'vue-waterfall2'// 瀑布流
import Mui from 'vue-awesome-mui'
import '@/plugins/vant'
import '@/config/rem'
// 全局引入 Reset-css
import 'reset-css'
//  全局引入 过滤器
import '@/config/filter'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import locale from 'vant/lib/locale/lang/zh-CN'
// import locale from 'vant/lib/locale/lang/en' // lang i18n

// import '@/styles/index.scss' // global css
import '@/icons' // icon

// 解决移动端点击延迟200ms的问题
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body)
  }, false)
}
// 多语言
Vue.use(VueI18n, {
  i18n: (key, value) => i18n.t(key, value)
})
// set ElementUI lang to EN
Vue.use(Mui)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 注册为全局组件
Vue.component('v-top', VTop)
Vue.use(waterfall)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
