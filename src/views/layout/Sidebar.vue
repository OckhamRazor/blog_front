<template>
  <div>
    <md-sidenav class="md-left md-fixed" ref="leftSidenav">
      <md-toolbar class="md-large sidebar-header">
        <div>
          <router-link to="/" class="link">
            <h3 class="md-title" @click="close">GC'S World</h3>
          </router-link>
        </div>
      </md-toolbar>
      <div class="sidebar-menu">
        <md-list>
          <template v-for="(item, index) in routes">
            <md-list-item class="link" :class="{'md-primary': currentPath === item.path}" v-if="!item.hidden" :key="'side-bar-' + index" :md-expand-multiple="true" @click.native="close(item.path, item.dropDown)">
              <md-icon v-if="item.icon">{{item.icon}}</md-icon>
              <span class="menu-span">{{item.name}}</span>
              <md-list-expand v-if="item.dropDown&&item.children&&item.children.length>0">
                <md-list>
                  <template v-for="child in item.children">
                    <md-list-item class="md-inset link" :class="{'md-primary': currentPath === (item.path + '/' + child.path)}" v-if="!child.hidden" :key="child.name" @click.native="close(item.path + '/' + child.path, child.dropDown)">
                      <md-icon v-if="child.icon">{{child.icon}}</md-icon>
                      <span class="menu-span">{{child.name}}</span>
                    </md-list-item>
                  </template>
                </md-list>
              </md-list-expand>
            </md-list-item>
          </template>
        </md-list>
      </div>
    </md-sidenav>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters({
      open: 'getSideBarStatus',
      routes: 'permissionRouters'
    }),
    currentPath () {
      return this.$route.fullPath
    }
  },
  watch: {
    open: function () {
      this.$refs.leftSidenav.toggle()
    }
  },
  methods: {
    close (path, dropDown) {
      if (typeof dropDown === 'undefined' || dropDown === false) {
        this.$router.push(path)
        this.$refs.leftSidenav.close()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-header>div {
  margin: 0 auto;
}
.menu-span {
  vertical-align: middle;
}
.link {
  cursor: pointer;
}
</style>
