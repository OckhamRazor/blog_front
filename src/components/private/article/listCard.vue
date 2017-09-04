<template>
  <ul class="article-sub-list">
    <li v-for="(item, index) in list" :key="'article-' + item.id">
      <router-link :to="'/article/' + item.id">
        {{item.title}}
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'ArticleListCard',
    props: {
      list: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="scss" scoped>
.article-sub {
  margin-bottom: 30px;
}
.article-sub-title {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
.article-sub-list {
  list-style: none;
  padding-left: 15px;

  li a {
    color: #555;

    &:hover {
      text-decoration: none;
      color: deeppink;
    }
  }
}
</style>
