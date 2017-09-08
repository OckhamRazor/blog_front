<template>
  <div class="container">
    <md-card class="login-box">
      <h3 class="box-title">用户登录</h3>
      <ra-progress-loader v-show="loading"></ra-progress-loader>
      <form novalidate @submit.prevent="login($v.user)" autocomplete="false">
        <md-card-content>
          <md-input-container :class="{'md-input-invalid':  $v.user.username.$error }">
            <label>用户名</label>
            <md-input v-model="user.username" name="username" @input="$v.user.username.$touch()"></md-input>
            <span class="md-error" v-show="!$v.user.username.required">请输入用户名</span>
          </md-input-container>
          <md-input-container :class="{'md-input-invalid':  $v.user.password.$error }">
            <label>密码</label>
            <md-input v-model="user.password" type="password" name="password" @input="$v.user.password.$touch()"></md-input>
            <span class="md-error" v-show="!$v.user.password.required">请输入密码</span>
          </md-input-container>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary login-button">登录</md-button>
        </md-card-actions>
      </form>
    </md-card>
  </div>
</template>

<script>
  import Auth from '@/api/auth'
  import { setToken } from '@/utils/auth'
  import { required } from 'vuelidate/lib/validators'
  import Config from '@/config/index'

  export default {
    name: 'login',
    data () {
      return {
        user: {
          username: '',
          password: ''
        },
        message: '',
        githubOAuth: Config.github.oauth,
        loading: false
      }
    },
    validations: {
      user: {
        username: {
          required
        },
        password: {
          required
        }
      }
    },
    directives: {
      focus: {
        inserted: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
      }
    },
    methods: {
      async login (value) {
        value.$touch() // 手动验证表单
        if (!value.$error) {
          this.message = ''
          this.loading = true

          const result = await Auth.signIn(this.user)

          this.loading = false
          this.handleResult(result) // 处理提示信息
        }
      },

      handleResult (result) {
        const success = result.success
        const data = result.data
        if (success) {
          let exp = new Date()
          exp.setHours(exp.getHours() + (data.exp || 10))

          setToken(data.token, exp) // 存储token至localStorage
          this.$store.commit('SET_TOKEN', data.token)
          this.$router.push({path: this.$route.query.redirect || '/'})
        } else {
          this.message = result.message
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  min-height: 100vh;
  padding: 20px;
  background: url('~@/assets/images/background-2.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
.login-box {
  width: 350px;
  margin: auto;
  padding: 20px;
  position: relative;
}
.box-title {
  font-size: 22px;
  font-weight: normal;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 16px;
}
.login-button {
  width: 100%;
}
.message {
  margin: 6px 16px 0 16px;
  animation-duration: .8s;
}
.message-content {
  padding-left: 5px;
  display: inline-block;
  vertical-align: middle;
}
</style>
