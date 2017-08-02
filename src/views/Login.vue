<template>
  <div class="container">
    <md-card class="login-box">
      <h3 class="box-title">用户登录</h3>
      <transition name="shake"
        enter-active-class="animated shake"
        leave-active-class="animated fadeOut">
        <div class="alert alert-danger message" v-if="showMessage">
          <icon-svg iconClass="tishi"></icon-svg><span class="message-content">{{message}}</span>
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
          <md-button type="submit" class="md-raised md-primary login-button" :disabled="disabled">登录</md-button>
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
        showMessage: false,
        disabled: false
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
          this.showMessage = false
          this.disabled = true

          const result = await User.signIn(this.user)

          this.handleResult(result) // 处理提示信息
        }
      },

      handleResult (result) {
        this.disabled = false
        if (result.code > 0) {
          const data = result.data
          setToken(data.token) // 存储token至localStorage
          this.$store.commit('SET_TOKEN', data.token)
          this.$router.push({path: this.$route.query.redirect || '/'})
          return true
        }

        this.message = result.message || ''
        this.showMessage = Boolean(this.message)
        return false
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.container {
  display: flex;
  min-height: 100vh;
  padding: $_20px;
}
.login-box {
  width: $_350px;
  margin: auto;
  padding: $_20px;
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
