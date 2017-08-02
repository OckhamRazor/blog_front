<template>
  <ul class="category">
    <li class="categpry-item" v-for="(item, index) in list" :key="item.code" @click="getListByCode(item)">
      <span>{{item.name}}</span>
      <span>({{item.total}})</span>
    </li>
  </ul>
</template>

<script>
  import Article from '@/api/article'

  export default {
    name: 'ArticleCategoryCard',
    data () {
      return {
        list: []
      }
    },
    methods: {
      async getCategoryList () {
        const result = await Article.getCategoryList()

        if (result.code > 0) {
          const data = result.data
          this.list = data.list
        }
      },

      getListByCode (item) {
        this.$store.commit('SET_CATEGORY', item)
      }
    },
    created () {
      this.getCategoryList()
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';

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
}
</style>
