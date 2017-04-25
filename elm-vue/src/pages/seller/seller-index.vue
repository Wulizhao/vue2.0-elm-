<template lang="html">
  <div class="seller-index">
    <div class="header">
      <seller-header  :data="seller"></seller-header>
    </div>
    <div class="tab">
      <seller-tab></seller-tab>
    </div>
    <div class="content" >
      <transition name="router-fade" mode="out-in">
      	<router-view v-on:sellect="getsellectfoods" :seller="seller"></router-view>
      </transition>
    </div>
    <div class="shop-cart">
      <shop-cart :seller="seller" :sellertFoods="sellertFoods"
        v-on:empty="empty"
      ></shop-cart>
    </div>
  </div>
</template>

<script>
import sellerHeader from './seller-header'
import sellerTab from './seller-tab'
import shopCart from './shop-cart'
export default {
  // ///////////组件使用//////////////
  components: {
    sellerHeader,
    sellerTab,
    shopCart
  },
  // ////////////数据///////////////
  data () {
    return {
      seller: {},
      sellertFoods: []
    }
  },
  // /////////////创建后执行//////////////////
  created () {
    this.fetchData()
  },

  // ///////////////方法/////////////////
  methods: {
    getsellectfoods (sellertFoods) {
      this.sellertFoods = sellertFoods
      console.log(this.sellertFoods)
    },
    empty () {
      this.sellertFoods = []
    },
    // 获取数据---------------
    fetchData () {
      var _this = this
      this.$http.get('./api/seller')
      .then(function (res) {
        _this.seller = res.data.data
        // console.log(res.data.data)
      }).catch(function (err) {
        console.log('home', err)
      })
    }
    // //////
  }
}
</script>

<style lang="scss" scoped>
.seller-index {
  // overflow: hidden;
  .header, .tab, .content, .shop-cart {
     // /我们很宽 //////////////
    width: 100%;
    // overflow: hidden;
  }
  .tab {
    // /////底部的content可能压到我的边框，所以我图层上移//////////////
    z-index: 1;
    // ///////////////
  }
  .content {
    // /////我是最外层的大盒子，很无奈，我要使用绝对定位。我要一个距离底部多远的盒子。顶部本来想顺序排在tab后面，定位了就只能top////////////////
    position: absolute;
    top: 8.65rem;
    bottom: 2.3rem;
    // /////////////////
  }
  .shop-cart {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
