<template>
  <md-toolbar class="md-dense container" md-theme="custom">
    <md-button class="md-icon-button" @click="toggleSideBar" v-if="showToggle">
      <md-icon>menu</md-icon>
    </md-button>
    <div class="content-wrapper">
      <router-link to="/home" v-if="!showToggle">
        <h3 class="navbar-title">GC's World</h3>
      </router-link>
      <div class="navbar-menu" v-if="!showToggle">
        <template v-for="(item, index) in routes">
          <router-link v-if="item.noDropdown&&!item.hidden" :to="item.path" :key="index">
            <md-button md-menu-trigger>{{item.name}}</md-button>
          </router-link>
          <md-menu md-align-trigger v-if="!item.noDropdown&&!item.hidden&&item.children.length>0" :key="index">
            <md-button md-menu-trigger>{{item.name}}</md-button>
            <md-menu-content>
              <router-link v-for="child in item.children" :key="child.name" :to="item.path + '/' + child.path">
                <md-menu-item>{{child.name}}</md-menu-item>
              </router-link>
            </md-menu-content>
          </md-menu>
        </template>
      </div>
      <div class="avatar-wrapper" v-if="avatar">
        <md-menu md-align-trigger ref="avatar" md-direction="bottom left">
          <img md-menu-trigger :src="avatar" alt="Avatar" class="md-ripper">
          <md-menu-content>
            <md-menu-item @click="signOut">登出</md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
  </md-toolbar>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      showToggle: false
    }
  },
  computed: {
    ...mapGetters({
      routes: 'permissionRouters'
    }),
    ...mapState({
      username: state => state.user.username,
      avatar: state => state.user.avatar,
      introduction: state => state.user.introduction
    })
  },
  methods: {
    toggleSideBar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
    handleResize () {
      this.showToggle = document.body.clientWidth <= 1200
    },
    expandAvatar () {
      this.$refs.avatar.open()
    },
    signOut () {
      this.$store.commit('SIGN_OUT')
    }
  },
  created: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';
@import '../../assets/styles/mixins.scss';

.container {
  display: flex;
}
.navbar-menu {
  flex: 1;
  text-align: right;
  position: relative;
}
.content-wrapper {
  max-width: 24rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
.navbar-title {
  height: $_48px;
  line-height: $_48px;
  margin: 0;
}
.avatar-wrapper {
  height: $_48px;
  line-height: $_48px;
  padding: 0 $_8px;
  cursor: pointer;
  img {
    @include circle($_36px);
    display: inline-block;
  }
}
</style>
