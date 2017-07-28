<template>
  <div class="container">
    <md-button md-theme="about" class="md-raised md-primary" @click="showMessage('success')">成功弹窗测试</md-button>
    <md-button md-theme="about" class="md-raised md-primary" @click="showMessage('info')">信息弹窗测试</md-button>
    <md-button md-theme="about" class="md-raised md-primary" @click="showMessage('warning')">警告弹窗测试</md-button>
    <md-button md-theme="about" class="md-raised md-primary" @click="showMessage('error')">错误弹窗测试</md-button>
  </div>
</template>

<script>

  export default {
    name: 'DemoMessage',
    methods: {
      showMessage (type) {
        switch (type) {
          case 'success':
            this.$toast.success({
              title: '默认通知',
              message: '这是一个测试通知'
            })
            break
          case 'info':
            this.$toast.info({
              title: '默认通知',
              message: '这是一个测试通知'
            })
            break
          case 'warning':
            this.$toast.warn({
              title: '默认通知',
              message: '这是一个测试通知'
            })
            break
          case 'error':
            this.$toast.error({
              title: '默认通知',
              message: '这是一个测试通知'
            })
            break
          default:
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
