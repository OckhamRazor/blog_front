<template>
  <div class="container">
    <mavon-editor
      ref="markdownEditor"
      class="markdown-editor"
      :ishljs="false"
      :subfield="true"
      :value="plainText"
      code_style="code-hybrid"
      @change="change"
      @save="save"
      @imgAdd="imgAdd"
      @fullscreen="fullScreen"></mavon-editor>
  </div>
</template>

<script>
  import Article from '@/api/article'
  import Upload from '@/api/upload'
  import Config from '@/config/index'
  import { escape } from '@/utils/index'

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
        uploadData: {},
        myPlainText: this.plainText
      }
    },
    methods: {
      change (value, render) {
        this.$emit('change', value, render)
      },
      async save (value, render) {
        let plainText = escape(value)
        let html = escape(render)

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

        formdata.append('file', file, file.name)
        formdata.append('token', this.uploadData.token)

        const result = await Upload.upload(formdata)
        const key = result.data && result.data.key
        let url = Config.cdn + key

        this.$refs.markdownEditor.$imgUpdateByUrl(filename, url)
        this.$refs.markdownEditor.$img2Url(filename, url)
      },
      async getUploadToken () {
        const result = await Upload.getUploadToken()
        this.uploadData.token = result.token
      }
    },
    created () {
      this.getUploadToken()
    }
  }
</script>

<style lang="scss" scoped>
.markdown-editor {
  min-height: 14rem;
  z-index: 998;
}
</style>
