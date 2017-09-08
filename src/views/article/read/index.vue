<template>
  <div class="container">
    <div class="admin-extra-wrapper">
      <md-button class="md-raised" @click="publishArticle">发布文章</md-button>
      <md-button class="md-raised" @click="deleteArticle">删除文章</md-button>
      <router-link :to="'/dashboard/edit/' + this.id">
        <md-button class="md-raised">编辑文章</md-button>
      </router-link>
    </div>
    <ra-scroll-to-top></ra-scroll-to-top>
    <div class="markdown-body code-hybrid" v-html="content"></div>
    <div>
      <h3>评论列表</h3>
      <div>
        <article-comment
          v-for="(item, index) in commentList"
          :key="'article-comment-' + index"
          :comment="item"
          ></article-comment>
      </div>
    </div>
 </div>
</template>

<script>
  import Article from '@/api/article'
  import { unescape } from '@/utils/index'

  import ArticleComment from './comment'

  export default {
    name: 'Article',
    components: {
      ArticleComment
    },
    data () {
      return {
        content: '',
        id: '',
        commentList: []
      }
    },
    methods: {
      async getArticle (id) {
        if (typeof id === 'undefined') return
        const result = await Article.getTempArticleById(id, {
          html: true,
          plainText: false
        })
        const data = result.data
        const html = data.html

        this.content = unescape(html)
      },
      getArticleId () {
        let path = this.$route.path
        let pathArr = path.split('/')

        return pathArr[pathArr.length - 1]
      },

      async publishArticle () {
        const _result = await Article.publish(this.id)
        if (_result.success) {
          alert(_result.message)
        } else {
          alert(_result.message)
        }
      },

      async deleteArticle () {
        const _result = await Article.delete(this.id)
        if (_result.success) {
          alert(_result.message)
        } else {
          alert(_result.message)
        }
      },
      // 获取评论列表
      async getCommentList (id) {
        let result = await Article.getCommentList(id)

        if (result.success) {
          this.commentList = result.data
        }
      },
      // 删除评论
      async deleteComment () {

      },
      // 编辑评论
      async updateComment () {

      }
    },
    created: function () {
      this.id = this.getArticleId()
      this.getArticle(this.id)
      this.getCommentList(this.id)
    }
  }
</script>

<style lang="scss" scoped>
.admin-extra-wrapper {
  text-align: right;
}
</style>
