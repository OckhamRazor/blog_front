<template>
	<section>
    <!-- <transition name="page-change" enter-active-class="animated fadeIn"> -->
      <keep-alive :exclude="['ArticleEditor', 'Article', 'Profile', 'ArticleEdit']">
        <!-- <router-view :key="key"></router-view> -->
        <router-view></router-view>
      </keep-alive>
    <!-- </transition> -->
	</section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>
