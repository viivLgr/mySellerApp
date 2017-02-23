// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import App from './App'
import goods from 'components/Goods'
import rating from 'components/Rating'
import sell from 'components/Sell'

import './assets/stylus/index.styl'
import './assets/stylus/icon.styl'

Vue.use(Router)
Vue.use(Resource)

const routers = [
  {path: '/',component: goods},
  {path: '/goods',component: goods},
  {path: '/rating',component: rating},
  {path: '/sell',component: sell},
];

const router = new Router({
  linkActiveClass:'active',
  routes: routers
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

