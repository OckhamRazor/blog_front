<template>
  <md-toolbar class="md-dense container" md-theme="custom">
    <md-button class="md-icon-button" @click="toggleSideBar" v-if="viewMode === 'mobile'">
      <md-icon>menu</md-icon>
    </md-button>
    <div class="content-wrapper">
      <router-link to="/home" v-if="viewMode === 'pc'">
        <h3 class="navbar-title">GC's World</h3>
      </router-link>
      <div class="navbar-menu" v-if="viewMode === 'pc'">
        <template v-for="(item, index) in routes">
          <router-link v-if="item.noDropdown&&!item.hidden" :to="item.path" :key="index">
            <md-button md-menu-trigger>{{item.name}}</md-button>
          </router-link>
          <md-menu md-align-trigger v-if="!item.noDropdown&&!item.hidden&&item.children.length>0" :key="index">
            <md-button md-menu-trigger>{{item.name}}</md-button>
            <md-menu-content>
              <template v-for="child in item.children">
                <router-link v-if="!child.hidden"  :key="child.name" :to="item.path + '/' + child.path">
                  <md-menu-item>{{child.name}}</md-menu-item>
                </router-link>
              </template>
            </md-menu-content>
          </md-menu>
        </template>
      </div>
      <div class="avatar-wrapper" v-if="avatar">
        <md-menu md-align-trigger ref="avatar" md-direction="bottom left">
          <img md-menu-trigger :src="avatar" alt="Avatar" class="md-ripper">
          <md-menu-content class="profile-card">
            <profile-card2></profile-card2>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
  </md-toolbar>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import profileCard2 from '@/components/private/user/profileCard2'

export default {
  name: 'Navbar',
  components: {
    profileCard2
  },
  data () {
    return {
      viewMode: 'pc'
    }
  },
  computed: {
    ...mapGetters({
      routes: 'permissionRouters'
    }),
    ...mapState({
      avatar: state => state.user.avatar
    })
  },
  methods: {
    toggleSideBar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
    handleResize () {
      this.viewMode = document.body.clientWidth <= 1200 ? 'mobile' : 'pc'
    },
    expandAvatar () {
      this.$refs.avatar.open()
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
.profile-card {
  width: 250px;
}
</style>
