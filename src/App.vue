<template>
  <div id="app">
    <!-- 登录超时弹窗 -->
    <my-dialog-alert></my-dialog-alert>
    <transition name="page-change" enter-active-class="animated fadeIn">
      <router-view v-wechat-title="$route.meta.title"></router-view>
    </transition>
  </div>
</template>

<script>
import myDialogAlert from '@/components/private/dialog'
export default {
  name: 'app',
  components: {
    myDialogAlert
  }
}
</script>

<style>

</style>
