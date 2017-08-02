<template>
   <div class="container">
    <div class="left-panel">
      <article-card class="article-card"></article-card>
      <list-card :list="list" v-if="list"></list-card>
    </div>
    <div class="right-panel">
      <category-card></category-card>
      <profile-card class="profile"></profile-card>
    </div>
  </div>
</template>

<script>
  import Article from '@/api/article'
  import ArticleCard from '@/components/article/articleCard'
  import CategoryCard from '@/components/article/categoryCard'
  import ProfileCard from '@/components/user/profileCard'
  import ListCard from '@/components/article/listCard'

  export default {
    name: 'ArticleList',
    components: {
      ArticleCard,
      CategoryCard,
      ProfileCard,
      ListCard
    },
    data () {
      return {
        list: []
      }
    },
    methods: {
      async getArticleList () {
        const result = await Article.getArticleList()
        if (result.code > 0) {
          const data = result.data
          const list = data.list

          this.list = list || []
        }
      }
    },
    created () {
      this.getArticleList()
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';

.container {
  margin: $_50px 0;
  display: flex;
}
.left-panel {
  flex: 1;
  padding-right: $_30px;
}
.right-panel {
  width: $_200px;
}
@media screen and (max-width: 1200px) {
  .right-panel {
    display: none;
  }
}
.profile {
  border-top: 1px solid #ccc;
}
.article-card {
  margin-bottom: $_16px;
}
</style>
