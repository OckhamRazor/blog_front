<template>
  <div>
    <!-- 提示条 -->
    <md-snackbar :md-position="'top center'" ref="snackbar">
      <span>{{message}}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">GET</md-button>
    </md-snackbar>
    <!-- 弹窗 -->
    <md-dialog md-open-from="#login" md-close-to="#login" ref="loginDialog" @close="onClose">
      <div class="login-box">
        <transition name="fade" mode="out-in" :duration="{ enter: 300, leave: 200 }" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div v-if="!showAccountLoginPanel" key="choice-panel">
            <div class="app-banner">
              <img src="~@/assets/images/app.png" alt="app">
              <div class="app-banner-text">
                <vue-typer text='hi, we already meet' :repeat='0'></vue-typer>
              </div>
            </div>
            <div class="login-method-list">
              <div class="login-method-item" @click="loginByAccount">
                <svg-icon icon="icon-person" class="account-login"></svg-icon>
                <p>账号登录</p>
              </div>
              <div class="login-method-item" @click="loginByGithub">
                <svg-icon icon="icon-github1" class="github-auth"></svg-icon>
                <p>github登录</p>
              </div>
            </div>
          </div>
          <div v-else key="account-login-panel">
            <ra-progress-loader v-show="loading"></ra-progress-loader>
            <md-button class="md-icon-button" @click="backChoosePanel">
              <md-icon>arrow_back</md-icon>
            </md-button>
            <md-dialog-title class="login-dialog-title">用户登录</md-dialog-title>
            <md-dialog-content>
              <div>
                <form novalidate @submit.prevent="login($v.user)" autocomplete="false">
                  <md-input-container :class="{'md-input-invalid':  $v.user.username.$error }">
                    <label>用户名</label>
                    <md-input v-model="user.username" name="username" @input="$v.user.username.$touch()" v-focus></md-input>
                    <span class="md-error" v-show="!$v.user.username.required">请输入用户名</span>
                  </md-input-container>
                  <md-input-container :class="{'md-input-invalid':  $v.user.password.$error }">
                    <label>密码</label>
                    <md-input v-model="user.password" type="password" name="password" @input="$v.user.password.$touch()"></md-input>
                    <span class="md-error" v-show="!$v.user.password.required">请输入密码</span>
                  </md-input-container>
                  <md-button type="submit" class="md-raised md-primary login-button">登录</md-button>
                </form>
              </div>
            </md-dialog-content>
          </div>
        </transition>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { VueTyper } from 'vue-typer'
import { setToken } from '@/utils/auth'
import { required } from 'vuelidate/lib/validators'
import Auth from '@/api/auth'
import Config from '@/config/index'

export default {
  name: 'loginDialog',
  components: {
    VueTyper
  },
  computed: {
    ...mapState({
      appName: state => state.app.appName
    }),
    ...mapGetters({
      opened: 'getLoginDialogStatus'
    })
  },
  watch: {
    opened (value, oldValue) {
      if (value) {
        // 打开登录窗口
        this.openDialog()
      }
    }
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      message: '',
      showAccountLoginPanel: false,
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
        this.$router.push({ path: this.$route.query.redirect || '/' })
      } else {
        this.message = result.message
        this.$refs.snackbar.open()
      }
    },
    loginByAccount () {
      this.showAccountLoginPanel = true
    },
    loginByGithub () {
      window.location.href = this.githubOAuth
    },
    backChoosePanel () {
      this.showAccountLoginPanel = false
    },
    openDialog () {
      this.$refs['loginDialog'].open()
    },
    onClose () {
      this.$store.commit('CLOSE_LOGIN_DIALOG')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins';

.login-box {
  width: 320px;
  height: 350px;
}

.app-banner {
  width: 100%;
  height: 200px;
  background-color: black;
  position: relative;
  color: white;

  img {
    @include alb;
    left: 10px;
    max-height: 80%;
  }

  .app-banner-text {
    width: 170px;
    position: absolute;
    left: 120px;
    top: 80px;
  }
}

.login-method-list {
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  .login-method-item {
    text-align: center;
    cursor: pointer;
  }

  .account-login,
  .github-auth {
    width: 50px;
    height: 50px;
    transition: fill 0.5s ease;
    margin-bottom: 10px;

    fill: black;
    &:hover {
      fill: #4183C4;
    }
  }
}

.login-button {
  width: 100%;
  margin: 20px 0 0 0;
}

.login-dialog-title {
  padding-top: 10px;
  margin-bottom: 10px;
  margin-top: 30px;
}

.animated.fadeIn {
  animation-duration: .3s;
}

.animated.fadeOut {
  animation-duration: .2s;
}
</style>

<style>
.app-banner .vue-typer span {
  color: white;
}
</style>
