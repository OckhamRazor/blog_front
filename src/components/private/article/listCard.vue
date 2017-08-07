<template>
  <div>
    <div class="article-sub" v-for="(child, index) in list" :key="'list-date-' + child.date">
      <h3 class="article-sub-title">{{child.date}}</h3>
      <ul class="article-sub-list">
        <li v-for="(item, index) in child.list" :key="item.id">
          <router-link :to="'/article/' + item.id">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Article from '@/api/article'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ArticleListCard',
    computed: {
      ...mapGetters({
        queryCode: 'getCateGoryCode',
        queryKeywords: 'getQueryParamsKeywords'
      })
    },
    watch: {
      queryCode (params) {
        this.getArticleList({
          code: params
        })
      },
      queryKeywords (params) {
        this.getArticleList({
          keywords: params
        })
      }
    },
    data () {
      return {
        list: null
      }
    },
    methods: {
      async getArticleList (query) {
        const result = await Article.getArticleList(query)
        const data = result.data
        const list = data.list

        this.list = list || []
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
