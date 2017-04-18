<template lang="html">
  <div class="header">
    <div class="background">
      <img :src="data.avatar" alt="" width="100%" height="100%">
    </div>
    <div class="contents-wrapper">
      <div class="avatar">
        <img :src="data.avatar" alt="" style="width: 3.2rem;height: 3.2rem">
      </div>
      <div class="contents">
        <div class="name-wrapper">
          <span class="brand"></span>
          <span class="name">{{data.name}}</span>
        </div>
        <div class="description-wrapper">
          <span>{{data.description}}</span>
          <span>／{{data.deliveryTime}}分钟送达</span>
        </div>
        <div class="supports-wrapper" v-if="data.supports">
          <ul ref="ul">
            <li v-for="item in data.supports">
              <span class="supports-brand" :class="icons[item.type]"></span>
              <span class="supports">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <div class="more" @click="showAlert">
          <span>{{data.supports.length}}个 ></span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showAlert">
      <span class="bulletin-brand"></span>
      <span class="bulletin-content ellipsis">{{data.bulletin}}</span>
      <i class="icon-keyboard_arrow_right">></i>
    </div>
    <transition name="router-fade" mode="out-in">
      <header-alert v-show="TorF" v-on:close="closeAlert" :data='data'></header-alert>
    </transition>
  </div>
</template>

<script>
import headerAlert from './seller-header-alert'
export default {
  components: {
    headerAlert
  },
  // ////////////数据///////////////
  data () {
    return {
      supportsNumber: 0,
      icons: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      TorF: false
    }
  },
  computed: {
  },
  // /////////父亲传来的数据在此////////////////////
  props: {
    data: { }
  },
  // ////////////////////////////////////////////
  methods: {
    showAlert () {
      this.TorF = true
    },
    closeAlert () {
      console.log(2)
      this.TorF = false
    }
  },
  created () {
    // /////////li的移动函数/////////////
    this.$nextTick(() => {
      let a = 0
      setInterval(() => {
        // console.log(this.$refs.ul)
        let height = this.$refs.ul.offsetHeight
        let length = this.$refs.ul.children.length
        this.$refs.ul.style.marginTop = -a + 'px'
        a = a + height / length
        if (a >= height) {
          a = 0
        }
      }, 1000)
    })
    // //////////////////////
  }
}
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
  .header {
    // ///////////////////背景图/////////////////////////
    position: relative;
    .background {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    // ////////////////////////////////////
    background-color:rgba(7,17,27,.8);
    color: $fc;
    .contents-wrapper {
      position: relative;
      // ///////////大盒子内容有间距//////////////////
      padding: 1.1rem 0.6rem 0.6rem 1.2rem;
      // ///父级设置字体大小为0消除子级行内块的间距///
      font-size: 0;
      // ///////////////兄弟内容横向排列//////////////////////////
      .avatar {
        display: inline-block;
        vertical-align: middle;
        img {
          border-radius: .2rem;
        }
      }
      .contents {
        // /////////我是行内块级元素，我要中线对齐/////////////
        display: inline-block;
        vertical-align: middle;

        // /////////////////////////////
        margin-left: 0.5rem;
        .name-wrapper {
          // ////////////////////行内元素加宽高要设置行内块
          font-size: 0;
          margin-bottom: .2rem;
          .brand {
            display: inline-block;
            vertical-align: middle;
            @include wh(1.5rem, .9rem);
            @include bis("../../images/brand@3x.png");
          }
          .name {
            display: inline-block;
            vertical-align: middle;
            margin-left: .5rem;
            @include sc(.9rem, $fc);
            font-weight: bold;
          }
        }
        .description-wrapper {
          @include sc(.6rem, $fc);
          margin-bottom: .2rem;
        }
        .supports-wrapper {
          @include inCl;
          height: .85rem;
          overflow: hidden;
          // //////////////////////////////
          .decrease {
            @include bis("../../images/decrease_1@3x.png");
          }
          .discount {
            @include bis("../../images/discount_1@3x.png");
          }
          .guarantee {
            @include bis("../../images/guarantee_1@3x.png");
          }
          .invoice {
            @include bis("../../images/invoice_1@3x.png");
          }
          .special {
            @include bis("../../images/special_1@3x.png");
          }
          // //////////////////////////////////////
          .supports-brand {
            @include innMid;
            @include wh(.6rem, .6rem);

          }
          .supports {
            @include innMid;
            font-size: .6rem;
            margin-left: .5rem;
          }

        }
      .more {
        position: absolute;
        @include wh(1.8rem, 1.2rem);
        right: .6rem;
        bottom: .7rem;
        z-index: 100;
        border-radius: .5rem;
        background-color: rgba(117,117,127,.3);
        @include sc(.6rem, $fc);
        line-height: 1.2rem;
        text-align: center;

      }
      }

    }
    // /////////////////左图标右文字套路完整版/////////////////////////////
    .bulletin-wrapper {
      @include inCl;
      height: 1.6rem;
      line-height: 1.6rem;
      background-color: rgba(117,117,127,.3);
      .bulletin-brand {
        @include innMid;
        @include wh(1.2rem, .6rem);
        @include bis("../../images/bulletin@3x.png");
        margin-left: .6rem
      }
      .bulletin-content {
        @include innMid;
        width: 80%;
        font-size: .6rem;
        margin-left: .5rem;
      }
      .icon-keyboard_arrow_right {
        @include innMid;
        @include wh(.7rem, .7rem);
        @include font(.6rem, .7rem);
        margin-left: .3rem
      }
    }
    // //////////////////////////////////////////
  }

</style>
