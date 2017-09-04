<template>
  <div></div>
</template>

<script>
import Auth from '@/api/auth'
import { setToken } from '@/utils/auth'

export default {
  name: 'OAuth',
  methods: {
    // Github账号登录
    async signInByGithub (code) {
      const result = await Auth.signInByGithub({code: code})
      console.log('result:', result)

      if (result.success) {
        const data = result.data
        let exp = new Date()
        exp.setHours(exp.getHours() + (data.exp || 10))

        setToken(data.token, exp) // 存储token至localStorage
        this.$store.commit('SET_TOKEN', data.token)
        this.$router.replace('/home')
      }
    },
    // 获取OAuth Code
    getOAuthCode () {
      const query = this.$route.query
      const code = query.code
      if (typeof code !== 'undefined' && code !== '') {
        this.signInByGithub(code)
      }
    }
  },
  created () {
    this.getOAuthCode()
  }
}
</script>
