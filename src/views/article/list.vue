<template>
   <div class="container">
    <div class="panel-title">
      <search-bar></search-bar>
    </div>
    <div class="panel-body">
      <div>
        <list-card :list="articleList"></list-card>
      </div>
      <transition name="slide" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
        <div>
          <category-card :list="categoryStatisticsList"></category-card>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import Article from '@/api/article'

  import ArticleCard from '@/components/private/article/articleCard'
  import CategoryCard from '@/components/private/article/categoryCard'
  import ListCard from '@/components/private/article/listCard'
  import searchBar from '@/components/private/article/searchBar'

  import { mapGetters } from 'vuex'

  export default {
    name: 'ArticleList',
    components: {
      ArticleCard,
      CategoryCard,
      ListCard,
      searchBar
    },
    computed: {
      ...mapGetters({
        queryCategory: 'getCategory',
        queryKeywords: 'getQueryParamsKeywords'
      })
    },
    watch: {
      queryCategory (params) {
        this.getArticleList()
      },
      queryKeywords (params) {
        this.getArticleList()
      }
    },
    data () {
      return {
        categoryStatisticsList: [],
        articleList: []
      }
    },
    methods: {
      async getCategoryStatisticsList () {
        const result = await Article.getCategoryStatisticsList()
        if (result.success) {
          this.categoryStatisticsList = result.data || []
        }
      },

      async getArticleList () {
        let query = {
          keywords: this.queryKeywords,
          category: this.queryCategory
        }
        const result = await Article.getPublishedArticleList(query)
        this.articleList = result.data || []
      }
    },
    created: function () {
      this.getCategoryStatisticsList()
      this.getArticleList()
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars.scss';
.panel-body {
  display: flex;
  & > div:nth-child(1) {
    flex: 1;
    padding-right: $_30px;
  }

  & > div:nth-child(2) {
    width: $_200px;
  }
}
.profile {
  border-top: 1px solid #ccc;
}
.article-card {
  margin-bottom: $_16px;
}
</style>
