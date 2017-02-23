import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/Goods'
import rating from 'components/Rating'
import sell from 'components/Sell'

Vue.use(Router)

const routers = [
  {path: '/goods',component: goods},
  {path: '/rating',component: rating},
  {path: '/sell',component: sell},
];

const router = new Router({
  linkActiveClass:'active',
  routes: routers
})

router.push('/goods');

export default router;
