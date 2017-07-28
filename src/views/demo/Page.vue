<template>
  <div class="container">
    <md-tabs md-fixed md-theme="custom">
      <md-tab id="message" md-label="弹窗组件">
        <demo-message></demo-message>
      </md-tab>

      <md-tab id="music" md-label="Music">
      </md-tab>

      <md-tab id="books" md-label="Books">
      </md-tab>

      <md-tab id="pictures" md-label="Pictures">
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
  import DemoMessage from '@/components/demo/Message'

  export default {
    name: 'DemoPage',
    components: {
      DemoMessage
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';

.container {
  margin-top: $_50px;
}
</style>
