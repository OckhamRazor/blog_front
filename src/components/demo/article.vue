<template>
  <div class="container markdown-body code-hybrid" v-html="content">
  </div>
</template>

<script>
  import Article from '@/api/article'
  const escapeGoat = require('escape-goat')

  export default {
    name: 'DemoMarkDown',
    data () {
      return {
        content: ''
      }
    },
    methods: {
      async getArticle (id) {
        const result = await Article.getArticle(id)
        if (result.code > 0) {
          const data = result.data
          const content = data.content

          this.content = escapeGoat.unescape(content)
        }
      }
    },
    created () {
      this.getArticle('0121')
    }
  }
</script>

<style lang="scss" scoped>

</style>
