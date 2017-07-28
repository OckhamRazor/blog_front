<template>
  <div class="container">
    <md-card class="login-box">
      <form novalidate @submit.prevent="login($v.user)">
        <md-card-content>
          <md-input-container :class="{'md-input-invalid':  $v.user.userName.$error }">
            <label>用户名</label>
            <md-input v-model="user.userName" name="userName" @input="$v.user.userName.$touch()"></md-input>
            <span class="md-error" v-show="!$v.user.userName.required">请输入用户名</span>
          </md-input-container>
          <md-input-container :class="{'md-input-invalid':  $v.user.password.$error }">
            <label>密码</label>
            <md-input v-model="user.password" name="password" @input="$v.user.password.$touch()"></md-input>
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
        }
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
    methods: {
      async login (value) {
        value.$touch() // 手动验证表单
        if (!value.$error) {
          const result = await User.signIn(this.user)

          if (result.code > 0) {
            this.$toast.success({
              title: '登录成功',
              message: result.message
            })

            const data = result.data
            setToken(data.token)
            this.$store.commit('SET_TOKEN', data.token)
            this.$router.push({path: this.$route.query.redirect || '/'})
          }
        }
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
.login-button {
  width: 100%;
}
</style>
