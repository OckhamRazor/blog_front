<template>
  <div class="container">
    <md-card class="login-box">
      <h3 class="box-title">用户登录</h3>
      <ra-progress-loader v-show="loading"></ra-progress-loader>
      <transition name="shake"
        enter-active-class="animated shake"
        leave-active-class="animated fadeOut">
        <div class="alert alert-danger message" v-if="message !== ''">
          <ra-icon-svg icon="tishi"/><span class="message-content">{{message}}</span>
        </div>
      </transition>
      <form novalidate @submit.prevent="login($v.user)" autocomplete="false">
        <md-card-content>
          <md-input-container :class="{'md-input-invalid':  $v.user.userName.$error }">
            <label>用户名</label>
            <md-input v-model="user.userName" name="userName" @input="$v.user.userName.$touch()"></md-input>
            <span class="md-error" v-show="!$v.user.userName.required">请输入用户名</span>
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
  import User from '@/api/user'
  import { setToken } from '@/utils/auth'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'login',
    data () {
      return {
        user: {
          userName: '',
          password: ''
        },
        message: '',
        loading: false
      }
    },
    validations: {
      user: {
        userName: {
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

          const result = await User.signIn(this.user)

          this.loading = false
          this.handleResult(result) // 处理提示信息
        }
      },

      handleResult (result) {
        const data = result.data
        if (data !== false) {
          setToken(data.token) // 存储token至localStorage
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
@import '~@/assets/styles/vars.scss';

.container {
  display: flex;
  min-height: 100vh;
  padding: $_20px;
  background: url('~@/assets/images/background-2.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
.login-box {
  width: $_350px;
  margin: auto;
  padding: $_20px;
  position: relative;
}
.box-title {
  font-size: $_22px;
  font-weight: normal;
  text-align: center;
  margin-bottom: $_10px;
  margin-top: $_16px;
}
.login-button {
  width: 100%;
}
.message {
  margin: $_6px $_16px 0 $_16px;
  animation-duration: .8s;
}
.message-content {
  padding-left: 5px;
  display: inline-block;
  vertical-align: middle;
}
</style>
