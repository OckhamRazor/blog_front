<template>
  <div class="container">
    <div class="page-content">
      <h1>404</h1>
      <md-button class="md-raised md-primary" @click="backHome">返回首页</md-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Err404',
    methods: {
      backHome () {
        this.$router.push('/')
      }
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
  width: 100%;
  text-align: center;
}
</style>
