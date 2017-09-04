<template>
  <div class="container">
    <form novalidate @submit.stop.prevent="submit($v.formData)">
      <div class="form-header">
        <h1>新增文章</h1>
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
      <div>
        <md-button class="md-raised md-primary" type="submit">Create It</md-button>
      </div>
    </form>
  </div>
</template>

<script>
import Article from '@/api/article'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ArticleAdd',
  data () {
    return {
      formData: {
        title: '',
        tag: [],
        category: ''
      },
      categories: []
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
    async submit (value) {
      value.$touch() // 手动验证表单
      if (!value.$error) {
        const _result = await Article.add(this.formData)
        const _data = _result.data

        this.$toast.success({
          title: '操作成功',
          message: _result.message || ''
        })

        setTimeout(() => {
          this.$router.push('/dashboard/edit/' + _data.id)
        }, 600)
      }
    },

    async getCategory () {
      const result = await Article.getCategory()
      if (result.success) {
        this.categories = result.data || []
      }
    }
  },

  created () {
    this.getCategory()
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
