<template>
  <div class="container" ref="slideUpDownContainer" :style="style">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'SlideUpDown',
    props: {
      active: Boolean,
      duration: {
        type: Number,
        default: 500
      }
    },
    data: () => ({
      maxHeight: 0
    }),
    watch: {
      active (active) {
        const { slideUpDownContainer } = this.$refs
        if (active) {
          const style = slideUpDownContainer.getAttribute('style')
          slideUpDownContainer.removeAttribute('style')
          this.maxHeight = slideUpDownContainer.offsetHeight
          slideUpDownContainer.setAttribute('style', style)
          // call this explicitely to force a new layout
          slideUpDownContainer.offsetHeight
        } else {
          this.maxHeight = 0
        }
      }
    },
    computed: {
      style () {
        return {
          height: this.maxHeight + 'px',
          'transition-duration': this.duration + 'ms'
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    overflow: hidden;
    transition-property: all;
  }
</style>
