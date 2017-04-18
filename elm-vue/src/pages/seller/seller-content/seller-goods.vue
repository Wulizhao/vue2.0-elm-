<template lang="html">
  <div class="seller-goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item,index) in goods" @click="sellectMenu(index)"
            class="menu-item menu-list-hook" :class="{'current' : currentIndex === index}">
          <div class="item-wrapper">
            <span v-show="item.type > 0" class="menu-icon" :class="icon[item.type]"></span>
            <span class="menu-name">{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="item in goods" class="foods-list-hook">
          <div class="foods-list">
            <div class="foods-list-title">
              {{item.name}}
            </div>
            <ul>
              <li v-for="item in item.foods" class="foods-item">
                <div class="icon">
                  <img :src=item.icon alt="" style="width: 2.9rem;height: 2.9rem">
                </div>
                <div class="content">
                  <h3 class="name">{{item.name}}</h3>
                  <p class="desc">{{item.description}}</p>
                  <div class="extra">
                    <span>月售{{item.sellCount}}份</span>
                    <span>好评率{{item.rating}}%</span>
                  </div>
                  <div class="price">
                    <span><i class="money">¥</i>{{item.price}}</span>
                    <span v-show="item.oldPrice" class="old-price">¥{{item.oldPrice}}</span>
                  </div>
                  <div class="cart-control-wrapper">
                    <cart-control :parentfood="item" v-on:countChange="sellectFoods"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import cartControl from '../../../components/cartcontrol'
import Iscroll from 'better-scroll'
// ////////使用Iscroll来进行滚动配置////////////////////
// iscroll报废了，使用better-scroll
// 1.写方法：用iscroll对dom元素进行初始化
// 2.在请求完数据后调用此方法。
// 3.调用方法用$nextTick确保数据异步请求完成
// 4.滚动的dom元素使用overflow:hidden
// 5.通过getElementsByClassName获取list
// 6.通过属性.clientHeight获得每个li的高度
// 7.push进一个数组
// 8.滚动监听on('scroll',(pos) => { pos.y为滚动的Y高度})
// 9.用一个数据来存
// 10.使用计算属性，每当data数据变化时，计算属性computed里面的伪函数也会跟着变化
// 11.当scrollY落到某个区间里面，获取对应的i
// 12.动态class判断，:class={'className' : 条件}
// 13.点击滚动到相应位置
// 14.点击获取index
// 15.获取要滚动的列表的要到达的子li
// 16.调用scrollToElement(el, time)
// 17.判断foodslist滚动到中间元素的时候,menulist也滚动
export default {
  components: {
    cartControl
  },
  created () {
    this.fetchData()
  },
  data () {
    return {
      goods: {}, // //异步请求食物的数据
      sellectFood: [],
      icon: ['decrease', 'discount', 'special'],
      height: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.height.length; i++) {
        let height1 = this.height[i]
        let height2 = this.height[i + 1]
        if (this.scrollY >= height1 && this.scrollY < height2) {
          return i
        }
      }
      return 0
    }
    // sellectFood () {
    //   let foods = []
    //   console.log(1)
    //   this.goods.forEach((good) => {
    //     good.foods.forEach((food) => {
    //       if (food.count) {
    //         foods.push(food)
    //         console.log(food, food.count)
    //       }
    //     })
    //   })
    //   return foods
    // }

  },
  // ///////////////方法/////////////////
  methods: {
    sellectFoods () {
      // console.log(1)
      this.sellectFood = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            this.sellectFood.push(food)
          }
        })
      })
      // console.log(this.sellectFood)
      this.$emit('sellect', this.sellectFood)
    },
    // 获取数据---------------
    fetchData () {
      var _this = this
      this.$http.get('./api/goods')
      .then(function (res) {
        _this.goods = res.data.data
        _this.$nextTick(function () {
          _this.initScroll()
          _this.calcularHeight()
          // console.log(_this.$refs.foods)
        })
        // console.log(res.data.data)
      }).catch(function (err) {
        console.log('home', err)
      })
    },
    // /////////////////
    initScroll () {
      this.menuScroll = new Iscroll(this.$refs.menu, {
        preventDefault: false
      })
      this.foodsScroll = new Iscroll(this.$refs.foods, {
        probeType: 3,
        preventDefault: false
      })
      let menuList = this.$refs.menu.getElementsByClassName('menu-list-hook')
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
        // ////////////滚动到看不见时menu上滚起来////////////////
        if (this.scrollY >= this.height[Math.round(this.height.length / 2)]) {
          let el = menuList[Math.round(this.height.length / 2)]
          this.menuScroll.scrollToElement(el, 300)
        }
        if (this.scrollY < this.height[Math.round(this.height.length / 2)]) {
          let el = menuList[0]
          this.menuScroll.scrollToElement(el, 300)
        }
      })
    },
    // /////////计算列表高度/////////
    calcularHeight () {
      let foodsList = this.$refs.foods.getElementsByClassName('foods-list-hook')
      let listHeight = 0
      this.height.push(listHeight)
      for (let i = 0; i < foodsList.length; i++) {
        listHeight += foodsList[i].clientHeight
        this.height.push(listHeight)
      }
      console.log(this.height)
    },
    // //////////选择菜单///////////
    sellectMenu (index) {
      let foodsList = this.$refs.foods.getElementsByClassName('foods-list-hook')
      let el = foodsList[index]
      this.foodsScroll.scrollToElement(el, 500)
    }

  }
}
</script>

<style lang="scss">
@import "src/style/mixin";
  .seller-goods {
    // ////////我是父亲，我的孩子要横着排，还要能伸缩////////////////
    display: flex;
    // //////////////////////
    height: 100%;
    .menu-wrapper {
      // ////////我是孩子／／／／我用伸缩表达的不伸缩
      flex: 0 0 4rem;
      // ///////////////////
      @include wh(4rem, 100%);
      background-color: #f3f5f7;
      overflow: hidden;
      .menu-item {
        &.current {
          background-color: #fff;
          font-weight: 600;
          font-size: .65rem;
          position: relative;
          top: -0.1rem;
          z-index: 10;
          @include wh(4rem, 2.72rem);
          .item-wrapper {
            border-bottom:none
          }
        }
        @include font(.6rem, .7rem);
        // ////table是垂直居中最好的布局
        display: table;
        @include wh(4rem, 2.7rem);
        padding: 0 .6rem 0 .6rem;
        // ////我是table的孩子，我想水平垂直居中
        .item-wrapper {
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          border-bottom: .01rem solid #ddd;
        }
        // //////////
        .menu-icon {
          @include innMid;
          @include wh(.6rem, .6rem);
          &.decrease {
            @include bis("../../../images/decrease_4@3x.png");
          }
          &.discount {
            @include bis("../../../images/discount_4@3x.png");
          }
          &.special {
            @include bis("../../../images/special_4@3x.png");
          }
        }
        .menu-name {
          vertical-align: middle;
        }
      }
      // ////////只有在li中算起才有效///////
      .menu-item:last-child .item-wrapper{
        border-bottom: none
      }
    }
    .foods-wrapper {
      // //我是孩子，我要伸缩，我占一份
      flex: 1;
      // //////////////////
      overflow: hidden;
      .foods-list {
        .foods-list-title {
          border-left: .2rem solid #aaa;
          background-color: #f3f5f7;
          @include fonts(.7rem, .9rem, 500,rgb(147,153,159));
          padding: .2rem 0 .2rem .6rem
        }

        .foods-item {
          display: flex;
          border-bottom: 0.01rem solid #eee;
          /// //////上一个元素的margin-bottom会和下一个元素的margin-top重叠，所以多加一个padding-bottom
          margin: .9rem;
          padding-bottom: .9rem;
          // ////最后一个li////////
          &:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          //////////////
          .icon {
            flex: 0 0 2.9rem;
            margin-right: .5rem;
          }
          .content {
            flex: 1;
            position: relative;
            .name {
              @include fonts(.7rem, .8rem, 500,rgb(7,17,27));
              margin-bottom: .4rem;
            }
            .desc, .extra {
              @include fonts(.5rem, .6rem, -1,rgb(147,153,159));
              margin-bottom: .4rem;
            }
            .price {
              @include fonts(.8rem, .8rem, 500, red);
              .money {
                font-size: .5rem;
                margin-right: .2rem;
              }
              .old-price {
                @include fonts(.6rem, .8rem, 400, rgb(147,153,159));
                text-decoration: line-through;
              }
            }
            .cart-control-wrapper {
              position: absolute;
              // @include wh(3rem, 1rem);
              right: -.5rem;
              bottom: -.5rem;
            }
          }
        }
        // .foods-item:last-child {
        //   border-bottom: none
        // }
      }
    }
  }
</style>
