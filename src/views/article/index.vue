<template>
  <div class="container">
    <div class="admin-extra-wrapper">
      <router-link :to="'/dashboard/edit/' + this.id">
        <md-button v-if="showExtraContent" class="md-raised">编辑文章</md-button>
      </router-link>
    </div>
    <ra-scroll-to-top></ra-scroll-to-top>
    <div class="markdown-body code-hybrid" v-html="content">

    </div>
  </div>
</template>

<script>
  import Article from '@/api/article'
  import { mapGetters } from 'vuex'
  const escapeGoat = require('escape-goat')

  export default {
    name: 'Article',
    computed: {
      ...mapGetters({
        roles: 'roles'
      }),
      showExtraContent () {
        if (this.roles.indexOf('admin') !== -1) {
          return true
        }

        return false
      }
    },
    data () {
      return {
        content: '',
        id: ''
      }
    },
    methods: {
      async getArticle (id) {
        if (typeof id === 'undefined') return
        const result = await Article.getArticle(id, {
          html: true,
          plainText: false
        })
        const data = result.data
        const html = data.html

        this.content = escapeGoat.unescape(html)
      },
      getArticleId () {
        let path = this.$route.path
        let pathArr = path.split('/')

        return pathArr[pathArr.length - 1]
      }
    },
    created: function () {
      this.id = this.getArticleId()
      this.getArticle(this.id)
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';
.admin-extra-wrapper {
  text-align: right;
}
</style>
