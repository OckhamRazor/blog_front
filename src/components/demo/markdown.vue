<template>
  <div class="container">
    <mavon-editor :ishljs="true" v-model="value" @save="save" :subfield="subfield" code_style="code-hybrid"></mavon-editor>
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
        subfield: true
      }
    },
    methods: {
      async save (value, render) {
        let content = escapeGoat.escape(render)
        content = content.replace(/\n/g, '\\n').replace(/\r/g, '\\r') // 替换换行符

        var _result = await Article.save({
          content: content
        })

        if (_result.code > 0) {
          this.$toast.success({
            title: '操作成功',
            message: _result.message || ''
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
