<template>
  <div>
    <div class="color-block top-block">
      <div class="content-wrapper animated slideInLeft">
        <img src="~@/assets/images/date_live/Efreet_grey.png">
        <span class="home-title">GC'S</span>
      </div>
      <div class="color-block-link"></div>
    </div>
    <div class="color-block bottom-block">
      <div class="content-wrapper animated slideInRight">
        <span class="home-title">WORLD</span>
        <img src="~@/assets/images/date_live/Princess_grey.png">
      </div>
    </div>
    <div class="home-menu">
      <ul class="animated fadeIn">
        <router-link :to="item.path" v-for="(item, index) in router" :key="'route-link-' + index">
          <li>{{item.name}}</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      router: [
        {
          path: '/article',
          name: 'ARTICLE'
        },
        {
          path: '/more',
          name: 'MORE'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins';

.color-block {
  position: relative;
  width: 100%;
  overflow: hidden;

  &:before {
    @include alb;
    z-index: -2;
    content: '';
    width: 100%;
    height: 100%;
  }
  &:after {
    @include alt;
    z-index: -1;
    content: '';
    width: 100%;
    height: 100%;
  }
  .content-wrapper {
    @include alb;
    bottom: 50px;
  }
}
.top-block {
  min-height: 350px;
  height: calc(50vh + 50px);
  &:before {
    background: url('~@/assets/images/date_live/Efreet.png') no-repeat;
    background-position: bottom right;
    background-size: contain;
  }
  &:after {
    background-color: rgba(255,255,255,.8);
  }
}
.bottom-block {
  min-height: 250px;
  height: calc(50vh - 50px);
  text-align: right;
  &:before {
    background: url('~@/assets/images/date_live/Princess.png') no-repeat;
    background-size: contain;
  }
  &:after {
    background-color: rgba(0,0,0,.8);
  }
  .content-wrapper {
    @include arb;
  }
}
.content-wrapper {
  img {
    max-height: 40vh;
  }
}
.color-block-link {
  @include alb;
  height: 100px;
  width: 100%;

  &:before, &:after {
    content: '';
    display: block;
    @include alb;
    width: 100%;
    height: 100px;
  }
  &:before {
    z-index: 4;
    background: linear-gradient(to right top, rgba(0,0,0,.8), rgba(0,0,0,.8) 50%, transparent 50%, transparent);
  }

  &:after {
    z-index: 3;
    background: linear-gradient(to right top, white, white 50%, transparent 50%, transparent);
  }
}
.home-menu {
  @include ac;
  z-index: 99;
  font-size: 24px;

  ul {
    animation-delay: 1s;
    padding: 5px;
    text-align: center;
    list-style: none;
    padding-left: 0;
    background: linear-gradient(to bottom, #333, #333 30%, #fff 70%) no-repeat left center;
    background-origin: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    li {
      padding: 10px;
    }
  }
}
.home-title{
  color: #999 !important;
  font-size: 60px;
}
</style>
