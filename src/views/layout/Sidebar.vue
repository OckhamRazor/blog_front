<template>
  <div>
    <md-sidenav class="md-left md-fixed" ref="leftSidenav">
      <md-toolbar class="md-large sidebar-header" md-theme="custom">
        <div>
          <router-link to="/" class="link">
            <h3 class="md-title" @click="close">GC'S World</h3>
          </router-link>
        </div>
      </md-toolbar>
      <div class="sidebar-menu">
        <md-list md-theme="custom">
          <template v-for="(item, index) in routes">
            <md-list-item v-if="!item.hidden" :key="index" :md-expand-multiple="true">
              <router-link class="link" :to="item.path" @click.native="close">
                <md-icon v-if="item.icon">{{item.icon}}</md-icon>
                <span class="menu-span">{{item.name}}</span>
              </router-link>
              <md-list-expand v-if="item.children&&item.children.length>0">
                <md-list>
                  <template v-for="child in item.children">
                    <md-list-item class="md-inset" v-if="!child.hidden" :key="child.name">
                      <router-link class="link" @click.native="close" :to="item.path + '/' + child.path">
                        <md-icon v-if="child.icon">{{child.icon}}</md-icon>
                        <span class="menu-span">{{child.name}}</span>
                      </router-link>
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
    })
  },
  watch: {
    open: function () {
      this.$refs.leftSidenav.toggle()
    }
  },
  data () {
    return {}
  },
  methods: {
    close () {
      this.$refs.leftSidenav.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-header > div{
  margin: 0 auto;
}
.link {
  &:hover {
    text-decoration: none !important;
  }
}
.sidebar-menu .link {
  color: #333 !important;
}
.menu-span {
  vertical-align: middle;
  margin-left: 5px;
}
</style>

<style>
.md-theme-custom.md-list .md-list-item .router-link-active.md-list-item-container {
  color: #e91e63 !important;
}
</style>
