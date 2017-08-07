<template>
  <div class="container">
    <form novalidate @submit.stop.prevent="submit($v.formData)">
      <div class="form-header">
        <h1>新增文章</h1>
        <div class="form-buttons">
          <md-button class="md-raised md-primary" type="submit">Create It</md-button>
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
        tags: [],
        description: ''
      }
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
        }, 1200)
      }
    }
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
