<template>
  <div class="container">
    <div class="page-content">
      <h1>404</h1>
      <p>飞虫会快会吞噬这里，尽快离开这里吧</p>
    </div>
  </div>
</template>
<script>
  import BugController from '@/assets/js/animation/bug'
  export default {
    name: 'Page404',
    mounted () {
      new BugController({ // eslint-disable-line
        mouseOver: 'die',
        zoom: 15,
        imageSprite: '/static/images/fly-sprite.png'
      })
    }
  }
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: calc(100vh - 0.96rem);

  align-items: center;
}
.page-content {
  flex: 1;
}

.page-content{
  text-align: center;
  & > h1 {
    font-size: 1rem;
    font-weight: normal;
  }
  & > p {
    font-size: .6rem;
  }
}
</style>
