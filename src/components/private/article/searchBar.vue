<template>
  <md-input-container>
    <md-icon>search</md-icon>
    <label>请输入你感兴趣的话题</label>
    <md-input type="text" v-model="keywords" @keyup.enter.native="queryByKeywords"></md-input>
  </md-input-container>
</template>

<script>
export default {
  name: 'ArticleListSearchBar',
  data () {
    return {
      keywords: ''
      // queryParams: this.$store.article.queryParams
    }
  },
  methods: {
    queryByKeywords () {
      this.$store.commit('SET_QUERY_KEYWORDS', this.keywords)
    }
  },
  mounted () {
    this.queryByKeywords()
  }
}
</script>

<style lang="sass" scoped>

</style>
