<template lang="html">
  <div class="tab">
    <div class="tab-item">
      <router-link to="/goods" tag="li">商品</router-link>
    </div>

    <div class="tab-item">
      <router-link to="/ratings" tag="li">评论</router-link>
    </div>

    <div class="tab-item">
      <router-link to="/shops" tag="li">商家</router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "src/style/mixin";
  .tab {
    height: 2rem;
    justify-content: center;
    border-bottom: 0.01rem solid rgba(7,17,27,.1);
    @include fj();
    .tab-item {
      flex: 1;
      @include font(.8rem, 2rem);
      text-align: center;
      .router-link-active {
        color: red;
        font-weight: 500;
      }
      // border-right: 0.01rem solid rgba(7,17,27,.1)
    }
    // .tab-item:last-child {
    //   border-right: none
    // }
  }
</style>
