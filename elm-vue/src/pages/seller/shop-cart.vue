<template lang="html">
  <div class="shop-cart">
    <div class="left-wrapper" @click="toggleList">
      <div class="logo-wrapper">
        <div class="logo" :class="{'high-light' : totalCount > 0}">
          <img v-show="totalCount === 0" src="../../images/shopcart.svg" alt="" class="cart-icon">
          <img v-show="totalCount > 0" src="../../images/shopcarthigh.svg" alt="" class="cart-icon">
          <div class="num" v-show="totalCount > 0">
            {{totalCount}}
          </div>
        </div>
      </div>
      <div class="price" :class="{'hight-light' : totalPrice > 0}">
        ¥<span>{{totalPrice}}</span>
      </div>
      <div class="desc">
        <span>还需配送费¥{{seller.deliveryPrice}}元</span>
      </div>
    </div>
    <div class="right-wrapper" :class="{'hight-light' : this.totalPrice > seller.minPrice}">
      <span class="go">{{this.payDesc}}</span>
    </div>
    <div class="ball-wrapper" v-show="false">
      <transition name="ball" >
        <div class="ball">

        </div>
      </transition>
    </div>
      <div class="shop-cart-list-wrapper" v-show="listShow" >
        <transition name="list">
          <div class="shop-cart-list" v-show="listShow" >
            <div class="list-title">
              <h2 class="title">购物车</h2>
              <span class="empty" @click="emptyList">清空</span>
            </div>
            <div class="list-content-wrapper" ref="lis">
              <ul>
                <li class="food-wrapper" v-for="item in sellertFoods">
                  <div class="food">
                    <span class="name"> {{item.name}}</span>
                    <div class="right">
                      <span class="price">¥{{item.price * item.count}}</span>
                      <div class="cart-control-wrapper">
                        <cart-control :parentfood="item" ></cart-control>
                      </div>
                    </div>
                  </div>

                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import cartControl from '../../components/cartcontrol'
export default {
  data () {
    return {
      fold: true
    }
  },
  components: {
    cartControl
  },
  props: {
    seller: {},
    // /////////////////////////
    sellertFoods: {
      type: Array,
      default () {
        return [
        ]
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.sellertFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.sellertFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥${this.seller.minPrice}元起送`
      } else if (this.totalPrice < this.seller.minPrice) {
        let diff = this.seller.minPrice - this.totalPrice
        return `还差¥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      return show
    }
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
      console.log(this.$refs.lis.clientHeight)
    },
    emptyList () {
      console.log(1)
      this.$emit('empty')
    }
  }
}
</script>

<style lang="scss">
@import "src/style/mixin";
.list-enter-active,.list-leave-active {
  transition: all 0.3s linear;
  // transform: translate3d(0,0,0)
};

.list-enter,.list-leave-active {
  transform: translate3d(0,100%,0)
};

// /////大盒子里面的小盒子，一个固定宽度，一个自适应
  .shop-cart {
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    height: 2.8rem;
    background-color: #141d27;
    display: flex;
    .left-wrapper {
      flex: 1;
      background-color: #141d27;
      z-index: 10;
      @include inCl;
      .logo-wrapper {
        @include innMid;
        @include wh(2.8rem, 2.8rem);
        position: relative;
        margin: 0 .6rem;
        top: -.5rem;
        background-color: #141d27;
        border-radius: 1.4rem;
        .logo {
          @include innMid;
          @include wh(2.2rem, 2.2rem);
          position: relative;
          top: .3rem;
          left: .3rem;
          background-color: #2b343c;
          border-radius: 1.1rem;
          .cart-icon {
            @include center;
            @include wh(1.2rem, 1.2rem);
          }
          &.high-light {
            background-color: rgb(0,160,220);
          }
        }
        .num {
          position: absolute;
          top: -.2rem;
          right: -.45rem;
          @include wh(1.2rem, .8rem);
          @include fonts(.6rem, .8rem, 400, #fff);
          background-color: rgb(240, 20, 20);
          box-shadow: 0 .2rem .4rem 0 rgba(0,0,0,.4);
          text-align: center;
          border-radius: .4rem
        }
      }
      .price {
        @include innMid;
        @include fonts(1.2rem, 1.2rem, 500, #80858a);
        // ////////////////字间距
        letter-spacing: .1rem;
        // ////////////////////
        padding-right: .6rem;
        border-right: .01rem solid rgba(255,255,255,.2);
        &.hight-light {
          color: #fff
        }
      }
      .desc {
        @include innMid;
        margin-left: .6rem;
        @include fonts(.6rem, .8rem, 400, #80858a);
      }
    }
    .right-wrapper {
      z-index: 10;
      flex: 0 0 5.25rem;
      width: 5.25rem;
      background-color: #80858a;
      text-align: center;
      display: table;
      &.hight-light {
        background-color: #00B43C;
      }
      @include fonts(.8rem, 2.8rem, 450, #eee);
      .go {
        display: table-cell;
      }
    }
    .shop-cart-list-wrapper {
      position: absolute;
      top: 0px;
      left: 0;
      width: 100%;
      z-index: 1;
      transform: translate3d(0,-100%,0);
      .shop-cart-list {
        .list-title {
          @include inCl;
          background-color: rgb(243,246,247);
          height: 2rem;
          .title {
            @include innMid;
            @include fonts(.6rem, 2rem, 400, black);
            margin-left: .9rem;
          }
          .empty {
            @include innMid;
            float: right;
            padding: 0 .8rem 0 .8rem;
            @include fonts(.6rem, 2rem, 400, rgb(0,160,220));
          }
        }
        .list-content-wrapper {
          // height: 2.4rem;
          max-height: 10rem;
          overflow: auto;
          .food-wrapper {
            background-color: #fff;
            .food {
              margin-left: .9rem;
              margin-right: .9rem;
              border-bottom: 0.01rem solid rgba(7,17,27,.1);
              .name {
                @include fonts(.7rem, 2.4rem, 400, black);

              }
              .right {
                .price {
                  @include fonts(.75rem, 2.4rem, 500, red);
                  float: left;
                  width: 4rem;
                }
                .cart-control-wrapper {
                  float: right;

                }
              }

            }
          }
        }

      }
    }
  }

</style>
