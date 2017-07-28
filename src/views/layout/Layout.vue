<template>
	<div class="app-wrapper">
    <sidebar class="sidebar"></sidebar>
		<div class="main-container">
			<navbar class="navbar"></navbar>
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
@import '../../assets/styles/vars.scss';

.app-wrapper {
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  min-height: 100vh;
}
.main-sidebar {
  z-index: 1000;
}
.main-sidebar.md-sidenav .md-sidenav-content {
  width: 5.6rem;
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
  z-index: 999;
  width: 100%
}
.sidebar {
  z-index: 1000;
}
.app-main {
  margin: $_48px auto 0 auto;
  max-width: 24rem;
  width: 100%;
  padding: 0 $_16px;
}
</style>
