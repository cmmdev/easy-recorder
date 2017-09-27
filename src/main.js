import Vue from 'vue'
import 'babel-polyfill'
import App from "./App.vue"
import VueRouter from 'vue-router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

import {router} from "./router";
import {store} from "./store";

Vue.use(iView);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})