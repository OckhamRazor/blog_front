<template>
  <div class="container">
    编辑文章
    <div>
      工具条
      <span>撤销到上一次保存</span>
      <span>撤销所有修改</span>
      <span>发布更新</span>
    </div>
    <mavon-editor class="markdown-editor" :ishljs="false" v-model="plainText" @save="save" :subfield="subfield" code_style="code-hybrid"></mavon-editor>
  </div>
</template>

<script>
  import Article from '@/api/article'
  const escapeGoat = require('escape-goat')

  export default {
    name: 'DemoMarkDown',
    data () {
      return {
        value: '',
        plainText: '',
        subfield: true
      }
    },
    methods: {
      getArticleId () {
        let path = this.$route.path
        let pathArr = path.split('/')

        return pathArr[pathArr.length - 1]
      },
      async getArticle (id) {
        if (typeof id === 'undefined') return
        const result = await Article.getArticle(id)
        if (result.code > 0) {
          const data = result.data
          const plainText = data.plainText

          this.plainText = escapeGoat.unescape(plainText)
        }
      },
      async save (value, render) {
        let plainText = escapeGoat.escape(value)
        let html = escapeGoat.escape(render)

        plainText = plainText.replace(/\n/g, '\\n').replace(/\r/g, '\\r') // 替换换行符
        html = html.replace(/\n/g, '\\n').replace(/\r/g, '\\r') // 替换换行符

        var _result = await Article.save({
          html: html,
          plainText: plainText
        })

        if (_result.code > 0) {
          this.$toast.success({
            title: '操作成功',
            message: _result.message || ''
          })
        }
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
.page-title {
  font-size: $_24px;
  font-weight: normal;
}
.markdown-editor {
  min-height: calc(100vh - 4rem);
  z-index: 998;
}
</style>
