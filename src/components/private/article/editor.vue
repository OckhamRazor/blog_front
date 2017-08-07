<template>
  <div class="container">
    <mavon-editor
      ref="markdownEditor"
      class="markdown-editor"
      :ishljs="false"
      :subfield="true"
      v-model="plainText"
      code_style="code-hybrid"
      @save="save"
      @imgAdd="imgAdd"
      @fullscreen="fullScreen"></mavon-editor>
  </div>
</template>

<script>
  import Article from '@/api/article'
  const escapeGoat = require('escape-goat')

  export default {
    name: 'ArticleEditor',
    props: {
      id: {
        type: String,
        default: null
      },
      plainText: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        value: ''
      }
    },
    methods: {
      async save (value, render) {
        let plainText = escapeGoat.escape(value)
        let html = escapeGoat.escape(render)

        plainText = plainText.replace(/\n/g, '\\n').replace(/\r/g, '\\r') // 替换换行符
        html = html.replace(/\n/g, '\\n').replace(/\r/g, '\\r') // 替换换行符

        var _result = await Article.save(this.id, {
          html: html,
          plainText: plainText
        })

        this.$toast.success({
          title: '操作成功',
          message: _result.message || ''
        })
      },
      fullScreen (status, value) {
        console.log(status)
      },
      imgAdd (filename, imgFile) {
        this.uploadFile(filename, imgFile)
      },
      async uploadFile (filename, file) {
        if (typeof file === 'undefined') return
        let formdata = new FormData()

        for (var item in file) {
          formdata.append(item, file[item])
        }

        const result = await Article.upload(formdata)
        const data = result.data
        this.$refs.markdownEditor.$imgUpdateByUrl(filename, data.url)
        this.$refs.markdownEditor.$img2Url(filename, data.url)
      }
    }
  }
</script>

<style lang="scss" scoped>
.markdown-editor {
  min-height: 14rem;
  z-index: 998;
}
</style>
