<template>
  <div class="card-container">
    <h3 class="card-title">博客的建设草案</h3>

    <div class="card-body">
      <div class="card-tag">
        <span>2017-07-30 8:25 | 留言</span>
        <span>分类：<span>{{category}}</span></span>
      </div>
      <div class="content-wrapper">
        <div class="content-poster">
          <img src="/static/images/music-2.jpg"/>
        </div>
        <div class="content-body">
          <div class="markdown-body code-hybrid" v-html="content"></div>
          <div class="read-more">阅读全文 »</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const escapeGoat = require('escape-goat')

  export default {
    name: 'ArticleIntroCard',
    data () {
      return {
        category: '日常博文',
        content: ''
      }
    },

    methods: {
      getArticleIntro () {
        const html = '&lt;h2&gt;注定平凡的生活，如何去吐露自己的心声？&lt;/h2&gt;\n&lt;p&gt;从博客开始，逃离工作的焦躁&lt;/p&gt;\n'
        this.content = escapeGoat.unescape(html)
      }
    },

    created () {
      this.getArticleIntro()
    }
  }
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/vars.scss';

.card-container {
  border-bottom: 1px solid #ccc;
}
.card-title {
  font-size: $_22px;
  font-weight: normal;
  margin-top: 0;
}
.card-tag {
  display: flex;
  justify-content: space-between;
  padding: $_6px 0;
}
.read-more {
  padding: $_10px 0 $_4px 0;
}
.content-wrapper {
  display: flex;
  flex-direction: row;
  padding: $_10px 0;

  .content-poster {
    width: 30%;
    padding-right: $_16px;
  }
  .content-body {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
@media screen and (max-width: 1200px) {
  .content-poster {
    display: none;
  }
}
</style>
