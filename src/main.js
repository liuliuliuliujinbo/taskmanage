import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/store'
import 'iview/dist/styles/iview.css';
import "@/assets/style/reset.css"

Vue.use(Vuex);
Vue.use(iView);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
