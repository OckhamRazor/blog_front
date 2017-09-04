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
      <!-- 文章分类 -->
      <div class="category-container">
        <div class="category-select">
          <md-input-container>
            <label for="category">文章分类</label>
            <md-select name="category" v-model="formData.category">
              <md-option v-for="(item, index) in categories" :value="item.value" :key="'category_' + index">{{item.name}}</md-option>
            </md-select>
          </md-input-container>
        </div>
        <div class="add-category">
          <md-button class="md-raised md-primary">新增分类</md-button>
        </div>
      </div>
      <!-- 文章关键字 -->
      <md-chips v-model="formData.tag" :md-max="5" md-input-placeholder="关键字">
        <template scope="chip" slot="chip">
          <span>{{ chip.value }}</span>
        </template>
      </md-chips>
    </form>
    <article-editor :id="id" :plainText="plainText" @change="contentChange"></article-editor>
  </div>
</template>

<script>
  import Article from '@/api/article'
  import ArticleEditor from '@/components/private/article/editor'
  import { required } from 'vuelidate/lib/validators'
  import { escape, unescape } from '@/utils/index'

  export default {
    name: 'ArticleEdit',
    components: {
      ArticleEditor
    },
    computed: {
      plainText () {
        return unescape(this.formData.plainText)
      }
    },
    data () {
      return {
        categories: [],
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
          // 处理文本信息
          this.formData.plainText = escape(this.formData.plainText)
          this.formData.html = escape(this.formData.html)

          const _result = await Article.save(this.id, this.formData)

          if (_result.success) {
            this.$toast.success({
              title: '操作成功',
              message: _result.message || ''
            })

            setTimeout(() => {
              this.$router.push('/article/' + this.id)
            }, 1200)
          } else {
            this.$toast.success({
              title: '操作失败',
              message: _result.message || ''
            })
          }
        }
      },
      async getArticle (id) {
        if (typeof id === 'undefined' || id === '') return

        const result = await Article.getTempArticleById(id, {
          html: false,
          plainText: true
        })
        const data = result.data
        this.formData = data
      },
      async getCategory () {
        const result = await Article.getCategory()
        if (result.success) {
          this.categories = result.data || []
        }
      },
      contentChange (value, render) {
        this.formData.plainText = value
        this.formData.html = render
      }
    },
    created: function () {
      this.id = this.getArticleId()
      this.getCategory()
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
.category-container {
  display: flex;
  flex-direction: row;

  .category-select {
    flex: 1;
  }
  .add-category {
    width: 200px;
    text-align: right;
  }
}
</style>
