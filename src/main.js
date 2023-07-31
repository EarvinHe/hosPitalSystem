import Vue from 'vue'
import "reset-css"
import App from './App.vue'
import './plugins/element.js'
import store from './store';
import router from "@/router/index"


// import { reqAllDepts } from './api';
  Vue.config.productionTip = false

new Vue({
  // 注册Store仓库:组件实例的身上会多一个属性$store属性
  store: store,
  // 注册路由
  router,
  render: h => h(App),
}).$mount('#app')
