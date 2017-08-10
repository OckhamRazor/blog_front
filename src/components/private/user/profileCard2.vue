<template>
  <div class="container">
    <md-card class="profile-card">
      <md-card-media>
        <div class="avatar" :style="{backgroundImage: avatar}"></div>
      </md-card-media>

      <md-card-header class="profile-header">
        <div class="md-title">{{user.name}}</div>
        <div class="md-subhead">{{user.introduction}}</div>
      </md-card-header>

      <md-card-actions class="profile-footer">
        <md-button @click="editProfile">个人信息</md-button>
        <md-button @click="signOut">退出</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'profileCard2',
  computed: {
    ...mapState({
      user: state => state.user
    }),
    avatar () {
      return 'url("' + this.user.avatar + '")'
    }
  },
  methods: {
    editProfile () {
      this.$router.push('/user/profile')
    },
    signOut () {
      this.$store.commit('SIGN_OUT')
    }
  }
}
</script>
<style lang="scss" scoped>
.profile-card {
  width: 100%;
}
.avatar {
  width: 100%;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  background-origin: 50%;
}
.profile-header {
  padding-top: 12px !important;
  padding-bottom: 12px;
}
.profile-footer {
  display: flex;
  justify-content: space-between;
}
</style>

