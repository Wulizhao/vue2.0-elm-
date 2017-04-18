<template lang="html">
  <div class="cart-control" >
    <transition name="dec">
      <div class="decrease" v-show="food.count > 0" @click="decCart" >
        <img src="../images/dec.svg" alt="" class="cart-icon">
      </div>
    </transition>
    <div class="count" v-show="food.count > 0">
      <span>{{this.food.count}}</span>
    </div>
    <div class="add" @click="addCart">
      <img src="../images/add.svg" alt="" class="cart-icon">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapActions} from 'vuex'
// /////////////////////////////
export default {
  props: {
    parentfood: {
      type: Object
    }
  },
  data () {
    return {
      food: this.parentfood
    }
  },
  created () {
    // console.log(this.food)
  },
  methods: {
    ...mapActions([
      'addCart'
    ]),
    addCart () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)// /////在food中加入一个count的变化量
        this.$emit('countChange')
      } else {
        this.food.count ++
        this.$emit('countChange')
      }
    },
    decCart () {
      this.food.count --
      this.$emit('countChange')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
// ///////////点击按钮动画/////////////进场与退场////////////////
.dec-enter-active {
  // ///////////运动过程// /////
  transition: all .3s linear;// /////变化所有，时间，线性
}
.dec-enter {
  // //////////进场的初设状态
  opacity: 0;
  transform: translate3d(1.2rem,0,0); // /////位置
},
.dec-leave-active {
  transition: all .1s linear;
  opacity: 0; // ///离开变化的属性
  transform: translate3d(1.2rem,0,0) rotate(180deg)// 旋转;
}
// ////////////////////////////////////////
  .cart-control {
    @include inCl;
    position: relative;

    .decrease {
      @include innMid;
      padding: .5rem;
      .cart-icon {
        @include wh(1.2rem, 1.2rem);
      }
    }
    .count {
      @include innMid;
      @include fonts(.6rem, .6rem, 400, #222);
    }
    .add {
      @include innMid;
      padding: .5rem;
      .cart-icon {
        @include wh(1.2rem, 1.2rem);
      }
    }
  }
</style>
