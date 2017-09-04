<template>
  <ul class="category" v-if="list">
    <li class="categpry-item" :class="{active: category === 'all'}" key='category-all' @click="queryByCategory('all')">
      <span>全部</span>
      <span>({{amount}})</span>
    </li>
    <li class="categpry-item" :class="{active: item.id === category}" v-for="(item, index) in list" :key="'category-' + item.id" @click="queryByCategory(item.id)">
      <span>{{item.name}}</span>
      <span>({{item.count}})</span>
    </li>
  </ul>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ArticleCategoryCard',
    computed: {
      ...mapGetters({
        category: 'getCategory'
      }),
      amount () {
        let _amount = 0
        this.list.map((item, index) => {
          _amount += item.count
        })
        return _amount
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      // 更新分类ID
      queryByCategory (category) {
        this.$store.commit('SET_QUERY_CATEGORY', category)
      }
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
