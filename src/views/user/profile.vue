<template>
  <div class="profile-container">
    <h3>个人信息</h3>
    <form class="profile-form" novalidate @submit.prevent="edit($v.user)" autocomplete="false">
      <md-card-content>
        <div class="avatar-wrapper">
          <div class="avatar">
            <img :src="user.avatar" alt="avatar">
          </div>
          <vue-core-image-upload
            class="image-upload"
            crop-ratio="1:1"
            crop="local"
            url="http://up-z2.qiniu.com"
            extensions="png,gif,jpeg,jpg"
            :data="uploadData"
            inputOfFile="file"
            :credentials="false"
            @imageuploaded="imageUploaded">
            <div class="edit-button">
              <i class="material-icons">mode_edit</i>
            </div>
          </vue-core-image-upload>
        </div>
        <md-input-container :class="{'md-input-invalid': $v.user.email.$error }">
          <label>邮箱</label>
          <md-input v-model="user.email" type="email" name="email"  @input="$v.user.email.$touch()"></md-input>
          <span class="md-error" v-show="!$v.user.email.email">请输入正确的邮箱格式</span>
        </md-input-container>
        <md-input-container>
          <label>GitHub地址</label>
          <md-input v-model="user.github" name="github"></md-input>
        </md-input-container>
        <md-input-container>
          <label>介绍</label>
          <md-textarea v-model="user.introduction" name="introduction"></md-textarea>
        </md-input-container>
      </md-card-content>
      <md-card-actions>
        <md-button type="submit" class="edit md-raised md-primary">更新</md-button>
      </md-card-actions>
    </form>
  </div>
</template>

<script>
import User from '@/api/user'
import Upload from '@/api/upload'
import Config from '@/config/index'
import { email } from 'vuelidate/lib/validators'
import VueCoreImageUpload from 'vue-core-image-upload'

export default {
  name: 'Profile',
  components: {
    'vue-core-image-upload': VueCoreImageUpload
  },
  data () {
    return {
      uploadData: {
        token: ''
      },
      user: {
        id: '',
        github: '',
        username: '',
        avatar: '',
        email: '',
        introduction: ''
      }
    }
  },
  validations: {
    user: {
      email: {
        email
      }
    }
  },
  methods: {
    async edit (value) {
      value.$touch() // 手动验证表单
      if (!value.$error) {
        const _result = await User.editUserInfo(this.user)
        if (_result.success) {
          this.getUserInfo()
          alert(_result.message)
        } else {
          alert(_result.message)
        }
      }
    },
    imageUploaded (res) {
      if (res) {
        this.user.avatar = Config.cdn + res.key
      }
    },
    async getUserInfo () {
      const result = await User.getUserInfo()
      if (result.success) {
        const data = result.data
        data.avatar = data.avatar || '/static/images/avatar-placeholder.jpg'
        Object.assign(this.user, result.data)
        this.$store.commit('SET_ROLE', data.role)
        this.$store.commit('SET_NAME', data.username)
        this.$store.commit('SET_AVATAR', data.avatar)
        this.$store.commit('SET_INTRODUCTION', data.introduction)
      }
    },
    async getUploadToken () {
      const result = await Upload.getUploadToken()
      this.uploadData.token = result.token
    }
  },
  created () {
    this.getUserInfo()
    this.getUploadToken()
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  max-width: 400px;
}
.profile-form {
  margin-left: 30px;
}
.avatar-wrapper {
  display: flex;

  .image-upload {
    align-self: flex-end;
  }

   img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0 5px 10px -2px #ccc;
  }
}
.edit {
  margin-left: 0 !important;
}
</style>
