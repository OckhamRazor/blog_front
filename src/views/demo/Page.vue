<template>
  <div class="container">
    <md-tabs md-fixed md-theme="custom">
      <md-tab id="message" md-label="弹窗组件">
        <demo-message></demo-message>
      </md-tab>

      <md-tab id="markdown" md-label="Markdown">
        <demo-markdown></demo-markdown>
      </md-tab>

      <md-tab id="article" md-label="文章">
        <demo-article></demo-article>
      </md-tab>

      <md-tab id="pictures" md-label="Pictures">
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
  import DemoMessage from '@/components/demo/message'
  import DemoMarkdown from '@/components/demo/markdown'
  import DemoArticle from '@/components/demo/article'

  export default {
    name: 'DemoPage',
    components: {
      DemoMessage,
      DemoMarkdown,
      DemoArticle
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';

.container {
  margin-top: $_50px;
}
</style>
