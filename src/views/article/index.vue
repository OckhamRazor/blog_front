<template>
  <div class="container">
    <div>编辑文章</div>
    <scroll-to-top></scroll-to-top>
    <div class="markdown-body code-hybrid" v-html="content">

    </div>
  </div>
</template>

<script>
  import Article from '@/api/article'
  import ScrollToTop from '@/components/scrollToTop'
  const escapeGoat = require('escape-goat')

  export default {
    name: 'Article',
    components: {
      ScrollToTop
    },
    data () {
      return {
        content: ''
      }
    },
    methods: {
      async getArticle (id) {
        if (typeof id === 'undefined') return
        const result = await Article.getArticle(id)
        if (result.code > 0) {
          const data = result.data
          const html = data.html

          this.content = escapeGoat.unescape(html)
        }
      },
      getArticleId () {
        let path = this.$route.path
        let pathArr = path.split('/')

        return pathArr[pathArr.length - 1]
      }
    },
    created: function () {
      let id = this.getArticleId()
      this.getArticle(id)
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';

.container {
  margin-top: $_50px;
}
</style>
