<template>
  <md-sidenav class="md-left md-fixed" ref="leftSidenav">
    <md-toolbar class="md-large" md-theme="custom">
      <div class="sidebar-header">
        <router-link to="/">
          <h3 class="md-title" @click="close">GC'S World</h3>
        </router-link>
      </div>
    </md-toolbar>
    <div class="phone-viewport">
      <md-list>
         <template v-for="(item, index) in routes">
          <md-list-item v-if="!item.hidden" :key="index">
            <router-link :to="item.path" @click.native="close">
              <md-icon v-if="item.icon">{{item.icon}}</md-icon>
              <span>{{item.name}}</span>
            </router-link>
            <md-list-expand v-if="!item.noDropdown&&!item.hidden&&item.children.length>0">
              <md-list>
                <router-link v-if="!child.hidden" @click.native="close" v-for="child in item.children" :key="child.name" :to="item.path + '/' + child.path">
                  <md-list-item class="md-inset">{{child.name}}</md-list-item>
                </router-link>
              </md-list>
            </md-list-expand>
          </md-list-item>
        </template>
      </md-list>
    </div>
  </md-sidenav>
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
.sidebar-header {
  margin: 0 auto;
}
</style>
