<template lang="html">
  <div class="header-alert" >
    <div class="content-wrapper" ref="sc">
      <div class="content">
        <div class="name">
          <span>{{data.name}}</span>
        </div>
        <div class="star">
          <star :value="this.data.score" :margin="10"></star>
        </div>
        <div class="supports-wrapper" v-if="data.supports">
          <div class="title-wrapper">
            <div class="line">
            </div>
            <div class="title">
              优惠信息
            </div>
            <div class="line">
            </div>
          </div>
          <div class="supports">
            <ul>
              <li v-for="item in data.supports">
                <span class="supports-icon" :class="icons[item.type]"></span>
                <span class="supports-text">{{item.description}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="bullertin">
          <div class="title-wrapper">
            <div class="line">
            </div>
            <div class="title">
              商家公告
            </div>
            <div class="line">
            </div>
          </div>
          <div class="bulletin-text">
            <span>{{data.bulletin}}</span>
            <span>{{data.bulletin}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="close" @click="close">
      <span>X</span>
    </div>
  </div>
</template>

<script>
import star from '../../components/star'
import Iscroll from 'better-scroll'
export default {
  components: {
    star
  },
  data () {
    return {
      icons: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  },
  // /父亲传来的数据 ///////////////////////
  props: {
    data: {}
  },
  mounted () {
    let _this = this
    this.$nextTick(function () {
      _this.createScroll()
    }
    )
  },
  // ////////方法///////////
  methods: {
    close () {
      this.$emit('close')
      console.log(1)
    },
    createScroll () {
      let ss = new Iscroll(this.$refs.sc, {})
      console.log(ss)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
  .header-alert {
    // /////浮层//////////////////
    @include wh(100%, 100%);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    overflow: auto;
    background: rgba(7,17,27,.8);
    /// ////////////////////////
    .content-wrapper {
      @include wh(88%, 100%);
      margin: 0 auto 0 auto;
      top: 0;
      left: 0;
      // //////距离底部有多少高
      border-bottom: 3rem solid rgba(0,0,0,0);
      // ////////////////////
      overflow: hidden;
      font-size: 1rem;
      font-weight: bold;
      .name {
        margin-top: 3rem;
        text-align: center;
      }
      .star {
        margin-top: .7rem;
        text-align: center;
      }
      .supports-wrapper {
        margin: 1rem 0 0 0;
        .title-wrapper {
          display: flex;
          .line {
            flex: 1;
            border-bottom: 0.01rem solid rgba(255,255,255,.4);
            // ///////上下移动//////////////
            position: relative;
            top: -.6rem
            // //////////////
          }
          .title {
            padding: 0 .3rem 0 .3rem
          }
        };
        .supports {
          @include font(.8rem, 1.6rem);
          margin: .4rem 0 0 .8rem;
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
          .supports-icon {
            @include innMid;
            @include wh(.8rem, .8rem);
          }
          .supports-text {
            @include innMid;
          }
        }
      }
      .bullertin {
        margin-top: 1rem;
        .title-wrapper {
          display: flex;
          .line {
            flex: 1;
            border-bottom: 0.01rem solid rgba(255,255,255,.4);
            // ///////上下移动//////////////
            position: relative;
            top: -.6rem
            // //////////////
          }
          .title {
            padding: 0 .3rem 0 .3rem
          }
        }
        .bulletin-text {
          @include font(.8rem, 1.6rem);
          text-indent: 1.6rem;
          margin: .4rem .8rem 0 .8rem;
        }
      }
    }
    .close {
      @include wh(100%, 3rem);
      position: fixed;
      bottom: 0;
      left: 0;
      text-align: center;
      @include font(1.2rem, 3rem);
    }
  }
</style>
