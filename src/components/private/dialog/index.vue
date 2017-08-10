<template>
  <!-- 全局弹窗 -->
  <md-dialog-alert
    :md-title="title"
    :md-content-html="content"
    @close="onClose"
    ref="dialogAlert">
  </md-dialog-alert>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'myDialogAlert',
  data () {
    return {
      list: [
        {
          title: '提示',
          content: '登录超时，请重新登录'
        },
        {
          title: '提示',
          content: '异地登录'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      opened: 'getDialogStatus',
      code: 'getDialogCode'
    }),
    title () {
      return this.list[this.code].title
    },
    content () {
      return this.list[this.code].content
    }
  },
  watch: {
    opened (newValue) {
      if (newValue) {
        this.openDialog('dialogAlert')
      }
    }
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    onClose () {
      switch (this.code) {
        case 0:
          this.redirectLogin()
          break
        default:
          break
      }
    },
    redirectLogin () {
      this.$router.replace({
        path: 'login',
        query: {redirect: this.$router.currentRoute.fullPath}
      })
    }
  }
}
</script>

<style>

</style>
