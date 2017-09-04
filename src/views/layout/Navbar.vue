<template>
  <md-toolbar class="md-dense container" md-theme="custom">
    <div class="content-wrapper">
      <md-button class="md-icon-button" @click="toggleSideBar">
        <md-icon>menu</md-icon>
      </md-button>
      <div v-if="role !== 'visitor'">
        <md-menu md-align-trigger ref="profile" md-direction="bottom left">
          <md-button md-menu-trigger class="md-icon-button">
            <md-icon>person</md-icon>
          </md-button>
          <md-menu-content class="profile-card">
            <profile-card :close="closeAvatar"></profile-card>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
  </md-toolbar>
</template>
<script>
import { mapState } from 'vuex'
import profileCard from '@/components/private/user/profileCard'

export default {
  name: 'Navbar',
  components: {
    profileCard
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      role: state => state.user.role
    })
  },
  methods: {
    toggleSideBar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
    closeAvatar () {
      this.$refs.profile.close()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';
@import '../../assets/styles/mixins.scss';

.container {
  display: flex;
}
.content-wrapper {
  max-width: 24rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}
.navbar-title {
  height: $_48px;
  line-height: $_48px;
  margin: 0;
}
.profile-card {
  width: $_250px;
}
</style>
