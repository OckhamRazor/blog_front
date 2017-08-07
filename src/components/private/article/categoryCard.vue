<template>
  <ul class="category" v-if="list">
    <li class="categpry-item" :class="{active: item.code === cateGoryCode}" v-for="(item, index) in list" :key="item.code" @click="queryByCode(item)">
      <span>{{item.name}}</span>
      <span>({{item.total}})</span>
    </li>
  </ul>
</template>

<script>
  import Article from '@/api/article'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ArticleCategoryCard',
    computed: {
      ...mapGetters({
        cateGoryCode: 'getCateGoryCode'
      })
    },
    data () {
      return {
        list: null
        // queryParams: this.$store.article.queryParams
      }
    },
    methods: {
      async getCategoryList () {
        const result = await Article.getCategoryList()

        const data = result.data
        this.list = data.list

        if (this.list.length > 0) {
          this.queryByCode(this.list[0])
        }
      },
      // 通过分类码获取列表
      queryByCode (item) {
        this.$store.commit('SET_QUERY_CODE', item.code)
      }
    },
    created () {
      this.getCategoryList()
    }
  }
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/vars.scss';

.category {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
}
.categpry-item {
  cursor: pointer;

  &:hover {
    color: deeppink;
  }

  &.active {
    color: deeppink;
  }
}
</style>
