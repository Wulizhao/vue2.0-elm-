import Vue from 'vue'
import Router from 'vue-router'
import SellerIndex from '../pages/seller/seller-index'
import SellerGoods from '../pages/seller/seller-content/seller-goods'
import SellerRatings from '../pages/seller/seller-content/seller-ratings'
import SellerShops from '../pages/seller/seller-content/seller-shops'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/',
      component: SellerIndex,
      children: [
        {
          path: '/goods',
          component: SellerGoods
        },
        {
          path: '/ratings',
          component: SellerRatings
        },
        {
          path: '/shops',
          component: SellerShops
        }

      ]
    }
  ]
})
