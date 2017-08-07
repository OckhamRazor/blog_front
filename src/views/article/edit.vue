<template>
  <div class="container">
    <form novalidate @submit.stop.prevent="submit($v.formData)">
      <div class="form-header">
        <h1>新增文章</h1>
        <div class="form-buttons">
          <md-button class="md-raised md-primary" type="submit">Update It</md-button>
        </div>
      </div>
      <!-- 文章标题 -->
      <md-input-container :class="{'md-input-invalid':  $v.formData.title.$error }">
        <label>文章标题</label>
        <md-input name="title" type="text" v-model="formData.title" required @input="$v.formData.title.$touch()"></md-input>
        <span class="md-error" v-show="!$v.formData.title.required">请输入文章标题</span>
      </md-input-container>
      <!-- 文章关键字 -->
      <md-chips v-model="formData.tags" :md-max="5" md-input-placeholder="关键字">
        <template scope="chip" slot="chip">
          <span>{{ chip.value }}</span>
        </template>
      </md-chips>
      <!-- 文章描述 -->
      <md-input-container>
        <label>简要的描述</label>
        <md-textarea type="text" v-model="formData.description" :maxlength="300"></md-textarea>
      </md-input-container>
    </form>
    <article-editor :id="id" :plainText="plainText"></article-editor>
  </div>
</template>

<script>
  import Article from '@/api/article'
  import ArticleEditor from '@/components/private/article/editor'
  import { required } from 'vuelidate/lib/validators'
  const escapeGoat = require('escape-goat')

  export default {
    name: 'ArticleEdit',
    components: {
      ArticleEditor
    },
    computed: {
      plainText () {
        if (!this.formData || !this.formData.plainText) return ''

        return escapeGoat.unescape(this.formData.plainText)
      }
    },
    data () {
      return {
        formData: {},
        id: ''
      }
    },
    validations: {
      formData: {
        title: {
          required
        }
      }
    },
    methods: {
      getArticleId () {
        let path = this.$route.path
        let pathArr = path.split('/')

        let id = pathArr[pathArr.length - 1]

        return id
      },
      async submit (value) {
        value.$touch() // 手动验证表单
        if (!value.$error) {
          const _result = await Article.edit(this.id, this.formData)
          // const _data = _result.data

          this.$toast.success({
            title: '操作成功',
            message: _result.message || ''
          })

          setTimeout(() => {
            this.$router.push('/article/' + this.id)
          }, 1200)
        }
      },
      async getArticle (id) {
        if (typeof id === 'undefined' || id === false || id === '' || id === null) return

        const result = await Article.getArticle(id, {
          html: false,
          plainText: true
        })
        const data = result.data
        this.formData = data
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

.form-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.form-buttons {
  text-align: right;
}
</style>
