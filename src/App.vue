<template>
  <div id="app">
    <transition name="page-change" enter-active-class="animated fadeIn">
      <router-view v-wechat-title="$route.meta.title"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
