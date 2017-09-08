<template>
  <div>
    <md-toolbar class="md-dense container">
      <div class="content-wrapper">
        <md-button class="md-icon-button" @click="toggleSideBar">
          <md-icon>menu</md-icon>
        </md-button>
        <div>
          <md-button class="md-icon-button"  v-if="role === 'visitor'" id="login" @click="openLoginDialog()">
            <md-icon>person</md-icon>
          </md-button>
          <md-menu v-if="role !== 'visitor'" md-align-trigger ref="profile" md-direction="bottom left">
            <md-avatar md-menu-trigger >
              <img :src="avatar" alt="Avatar">
            </md-avatar>
            <md-menu-content class="profile-card">
              <profile-card :close="closeAvatar"></profile-card>
            </md-menu-content>
          </md-menu>
        </div>
      </div>
    </md-toolbar>
    <login-dialog @click="openLoginDialog"></login-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import profileCard from '@/views/user/profileCard'
import loginDialog from '@/views/login/loginDialog'

export default {
  name: 'Navbar',
  components: {
    profileCard,
    loginDialog
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      role: state => state.user.role,
      avatar: state => {
        return state.user.avatar
      }
    })
  },
  methods: {
    toggleSideBar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
    closeAvatar () {
      this.$refs.profile.close()
    },
    openLoginDialog () {
      this.$store.commit('OPEN_LOGIN_DIALOG')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixins.scss';

.container {
  display: flex;
}
.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}
.navbar-title {
  height: 48px;
  line-height: 48px;
  margin: 0;
}
.profile-card {
  width: 250px;
}
</style>
