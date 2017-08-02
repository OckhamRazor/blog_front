<template>
  <div class="container">
    <transition name="fade">
      <md-button class="md-fab md-mini small-menu" @click="slideToTop" v-show="showSmallMenu">
        <md-icon>arrow_upward</md-icon>
      </md-button>
    </transition>
  </div>
</template>

<script>
  import CustomAnimate from '@/utils/customAnimate'

  export default {
    name: 'ScrollToTop',
    data () {
      return {
        scrollY: 0,
        showSmallMenu: false
      }
    },
    methods: {
      slideToTop () {
        CustomAnimate.scrollToTop(600)
      },
      handleResize (e) {
        let _scrollY = window.scrollY
        if (_scrollY - this.scrollY > 20) {
          this.scrollY = _scrollY
          this.showSmallMenu = false
        }
        if (_scrollY - this.scrollY < -50) {
          this.scrollY = _scrollY
          this.showSmallMenu = true
        }
      }
    },
    created: function () {
      window.addEventListener('scroll', this.handleResize)
    },
    beforeDestroy: function () {
      window.removeEventListener('scroll', this.handleResize)
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';
.small-menu {
  position: fixed;
  bottom: $_14px;
  right: $_30px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
