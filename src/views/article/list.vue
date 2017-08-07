<template>
   <div class="container">
    <div class="panel-title" v-if="viewMode === 'mobile'">
      <search-bar></search-bar>
    </div>
    <div class="panel-body">
      <div>
        <list-card></list-card>
      </div>
      <transition name="slide" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
        <div v-if="viewMode === 'pc'">
          <category-card></category-card>
          <profile-card class="profile"></profile-card>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import ArticleCard from '@/components/private/article/articleCard'
  import CategoryCard from '@/components/private/article/categoryCard'
  import ProfileCard from '@/components/private/user/profileCard'
  import ListCard from '@/components/private/article/listCard'
  import searchBar from '@/components/private/article/searchBar'

  export default {
    name: 'ArticleList',
    components: {
      ArticleCard,
      CategoryCard,
      ProfileCard,
      ListCard,
      searchBar
    },
    data () {
      return {
        viewMode: 'pc'
      }
    },
    methods: {
      handleResize () {
        this.viewMode = document.body.clientWidth <= 1200 ? 'mobile' : 'pc'
      }
    },
    created: function () {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
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
