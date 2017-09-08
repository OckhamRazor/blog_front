<template>
	<div class="app-wrapper">
    <!-- 侧边栏 -->
    <sidebar class="sidebar"></sidebar>
		<div class="main-container">
      <!-- 顶部导航 -->
			<navbar class="navbar"></navbar>
      <!-- 页面内容 -->
      <app-main class="app-main"></app-main>
		</div>
	</div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from '@/views/layout'

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
      sidebar () {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  min-height: 100vh;
}
.main-sidebar {
  z-index: 99;
}
.main-sidebar.md-sidenav .md-sidenav-content {
  width: 280px;
  display: flex;
  flex-flow: column;
  overflow: hidden;
}
.main-container {
  min-height: 100%;
  max-height: 100%;
  flex: 1;
  display: -ms-flexbox;
  display: flex;
  flex-flow: column;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 98;
  width: 100%
}
.sidebar {
  z-index: 99;
}
.app-main {
  margin: 64px auto 50px auto;
  max-width: 1200px;
  width: 100%;
  padding: 0 16px;
}
</style>
