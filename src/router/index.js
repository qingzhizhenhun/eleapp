import Vue from 'vue'
import Router from 'vue-router'
//这就是引了路由
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'
//引goods

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      component:goods
    },
    {
      path: '/ratings',
      component:ratings
    },
    {
      path:'/seller',
      component:seller
    }
  ]
})
