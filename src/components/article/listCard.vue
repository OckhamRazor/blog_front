<template>
  <ul class="article-list">
    <li v-for="(item, index) in list" :key="item.id">
      <router-link :to="'/article/' + item.id">{{item.title}}({{item.createTime}})</router-link>
    </li>
    <li>查看更多 »</li>
  </ul>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'ArticleListCard',
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    computed: {
      ...mapGetters({
        gateGoryCode: 'getCateGoryCode'
      })
    },
    watch: {
      gateGoryCode () {
        console.log('gateGory Code change')
      }
    },
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
.article-list {
  list-style: none;
  padding-left: 0;
}
</style>
