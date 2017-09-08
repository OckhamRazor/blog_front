<template>
  <div class="ra-loading-layout" :style="{backgroundColor: layoutColor}">
    <md-progress class="ra-process-bar" md-indeterminate></md-progress>
  </div>
</template>

<script>
export default {
  name: 'raProgressBar',
  props: {
    theme: {
      type: String,
      default: 'orange'
    },
    layoutColor: {
      type: String,
      default: 'rgba(255, 255, 255, .6)'
    }
  }
}
</script>

<style lang="scss" scoped>
.ra-loading-layout {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.ra-process-bar {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
