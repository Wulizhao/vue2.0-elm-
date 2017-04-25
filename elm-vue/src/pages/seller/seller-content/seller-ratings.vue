<template lang="html">
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="leftview">
          <h2 class="score">{{seller.score}}</h2>
          <div class="title">
            综合评分
          </div>
          <div class="rank">
            高于周围商家{{seller.rankRate}}
          </div>
        </div>
        <div class="rightview">
          <div class="scroe-wrapper">
            <span class="title">服务态度</span>
            <star :fontSize="1" :value="seller.serviceScore" :disabled="true"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="scroe-wrapper">
            <span class="title">食物评分</span>
            <star :fontSize="1" :value="seller.foodScore" :disabled="true"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="time">
            <span>送达时间：<span class="deliveryTime">{{seller.deliveryTime}}分钟</span></span>
          </div>
        </div>
      </div>
      <div class="ratings-wrapper">
        <ul>
          <li v-for="item in ratings" class="rating-item">
            <div class="avatar">
              <img :src="item.avatar" alt="" style="width:1.6rem;height:1.6rem;border-radius:50%">
            </div>
            <div class="right-wrapper">
              <div class="username">
                {{item.username}}
              </div>
              <div class="star">
                <star :fontSize="1" :value="item.score" :disabled="true"></star>
                <span class="delivery-time" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">
                <span>{{item.text}}</span>
              </div>
              <div class="recommend ellipsis" v-show="item.recommend">
                <ul>
                  <li v-for="item in item.recommend" class="r-item">{{item}}</li>
                </ul>
              </div>
            </div>

          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import star from '../../../components/star'
export default {
  data () {
    return {
      ratings: {}
    }
  },
  props: {
    seller: {}
  },
  components: {
    star
  },
  created () {
    this.fetchData()
  },
  methods: {
    // 获取数据---------------
    fetchData () {
      var _this = this
      this.$http.get('./api/ratings')
      .then(function (res) {
        _this.ratings = res.data.data
        console.log(res.data.data)
      }).catch(function (err) {
        console.log('home', err)
      })
    }
    // //////
  }
}
</script>

<style lang="scss">
@import "src/style/mixin";
.ratings {
  @include wh(100%, 100%);
  overflow: hidden;
  .ratings-content {
    width: 100%;
    height: 100%;
    .overview {
      display: flex;
      border-bottom: 0.02rem solid #eee;
      .leftview {
        flex: 0 0 6.85rem;
        margin-top: .8rem;
        margin-bottom: .8rem;
        border-right: 0.02rem solid #eee;
        text-align: center;
        .score {
          @include fonts(1.4rem, 1.6rem, 400, rgb(255,153,0));
        }
        .title {
          @include fonts(.6rem, 1rem, 700, #222);
        }
        .rank {
          @include fonts(.5rem, 1rem, 500, rgb(147,153,159));
        }
      }
      .rightview {
        flex: 1;
        padding: .6rem .6rem 0 .6rem;
        .scroe-wrapper {
          .title {
            @include fonts(.6rem, .8rem, 700, #222);
          }
          .score {
            @include fonts(.6rem, .8rem, 600, rgb(255,153,0));
            margin-left: .8rem;
          }

        }
        .time {
          @include fonts(.6rem, .8rem, 700, #222);
          margin-top: .3rem;
        }
        .deliveryTime {
          @include fonts(.7rem, .8rem, 700, rgb(147,153,159));
        }

      }
    }
    .ratings-wrapper {
      overflow: auto;
      @include wh(100%, 16.7rem);
      .rating-item {
        display: flex;
        margin: .5rem .5rem .5rem 1rem;
        padding: 0 0 1rem 0;
        border-bottom: .02rem solid rgba(7,17,27,.1);
        .avatar {
          flex: 0 0 2rem;
          text-align: center;
          border-radius: 50%;
        }
        .right-wrapper {
          flex: 1;
          margin-left: .4rem;
          .username {
            @include fonts(.8rem, .8rem, 600, #222);
          };
          .star {
            margin-top: -.3rem;
            .delivery-time {
              @include fonts(.6rem, .6rem, 600, #ccc);
              margin: 0 0 0 .5rem;
              position: relative;
              top: .04rem;
            }
          }
          .text {
            margin-top: .3rem;
            padding-right: 2rem;
            @include fonts(.6rem, .9rem, 400, #333);
          }
          .recommend {
            width: 60%;
            .r-item {
              display: inline-block;
              @include fonts(.6rem, .6rem, 400, #777);
              margin: 0 .2rem 0 .2rem;
              padding: .1rem;
              background-color: rgba(17,27,37,.2);
              border-radius: .2rem;
            }
          }
        }
      }
    }
  }

}
</style>
