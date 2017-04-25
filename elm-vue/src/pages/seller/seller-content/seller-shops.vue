<template lang="html">
  <div class="shop-wrapper">
    <div class="shop">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :fontSize="20" :value="seller.foodScore" :disabled="true"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
      </div>
        <ul class="rmark">
          <li class="item">
            <span class="desc">起送价</span>
            <span class="num">{{seller.minPrice}}元</span>
          </li>
          <li class="item">
            <span class="desc">商家配送</span>
            <span class="num">{{seller.deliveryPrice}}元</span>
          </li>
          <li class="item">
            <span class="desc">平均配送时间</span>
            <span class="num">{{seller.deliveryTime}}元</span>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import star from '../../../components/star'
export default {
  props: {
    seller: {}
  },
  components: {
    star
  }
}
</script>

<style lang="scss">
@import "src/style/mixin";
  .shop-wrapper {
    .shop {
      .overview {
        margin: .9rem;
        .title {
          @include fonts(1rem, 1rem, 500, #222);
          margin-bottom: .4rem;
        }
        .desc {
          padding-bottom: .9rem;
          border-bottom: .01rem solid #eee;
          .text {
            @include fonts(.7rem, .7rem, 500, #999);
          }
        }
      }
      .rmark {
        display: flex;
        padding-bottom: .9rem;
        border-bottom: .01rem solid #eee;
        .item {
          flex: 1;
          text-align: center;
          border-right: .01rem solid #eee;
          &:last-child {
            border-right: none;
          }
          .desc {
            @include fonts(.6rem, .8rem, 400, #bbb);
          }
          .num {
            display: block;
          }
        }
      }

    }
  }
</style>
