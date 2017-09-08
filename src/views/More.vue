<template>
  <div class="container">
    <h1 class="main-title">Building...</h1>
    <div id="wave" class="wave-container"></div>
  </div>
</template>

<script>
import drawWaveCanvas from '@/assets/js/animation/waves'
export default {
  name: 'More',
  mounted () {
    drawWaveCanvas({
      width: 500,
      height: 500
    })
  }
}
</script>
<style lang="scss" scoped>
.main-title {
  text-align: center;
  margin: 50px auto;
}
.wave-container {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 0 , 0, .3);
}
</style>
