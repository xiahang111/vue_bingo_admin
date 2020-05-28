import Vue from 'vue'
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate)
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// element使用CDN全局引入，因此这里可以注释
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import prototype from './utils/prototype'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang'
import '@/icons' // icon
import '@/permission' // permission control

// 引入自定义指令
import './directive'

// 添加粒子特效
import VueParticles from 'vue-particles'

// Vue.use(ElementUI, { locale })

// set ElementUI lang to EN
Vue.use(ElementUI)

const {mockXHR} = require('../mock')
mockXHR()


Vue.use(VueParticles)
Vue.use(prototype)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
