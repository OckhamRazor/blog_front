import Vue from 'vue'
import VueRouter from 'vue-router'

// login
import Login from '@/views/Login'

// layout
import Layout from '@/views/layout/Layout'
// Error Page
import Err401 from '@/views/error/401'
import Err404 from '@/views/error/404'

// home
import Home from '@/views/Home.vue'
// article
import Article from '@/views/article/index.vue'
import ArticleList from '@/views/article/list.vue'
import ArticleEdit from '@/views/article/edit.vue'
import ArticleAdd from '@/views/article/add.vue'
// more
import More from '@/views/More.vue'
// route
import demoRouter from './modules/demo'

Vue.use(VueRouter)

export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true, noDropdown: true },
  { path: '/404', component: Err404, hidden: true, noDropdown: true },
  { path: '/401', component: Err401, hidden: true, noDropdown: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: '首页',
    hidden: true,
    noDropdown: false,
    children: [{ path: 'home', component: Home }]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: '文章',
    hidden: false,
    noDropdown: true,
    children: [
      { path: 'list', component: ArticleList, name: '文章列表', role: [] },
      { path: ':id', component: Article, name: '文章正文', role: [] }
    ]
  },
  {
    path: '/more',
    redirect: '/more/wave',
    name: '敬请期待',
    component: Layout,
    hidden: false,
    noDropdown: true,
    children: [
      { path: 'wave', component: More, name: '波浪', role: [] }
    ]
  },
  ...demoRouter
]

export default new VueRouter({
  mode: 'history',
  routes: constantRouterMap
})

// 动态加载路由
export const asyncRouterMap = [
  {
    path: '/manage',
    component: Layout,
    name: '管理',
    meta: { role: ['admin'], requireAuth: true },
    noDropdown: false,
    hidden: false,
    children: [
      { path: 'edit', component: ArticleEdit, name: '编辑文章', meta: { role: ['admin'], requireAuth: true } },
      { path: 'add', component: ArticleAdd, name: '新增文章', meta: { role: ['admin'], requireAuth: true } }
    ]
  },
  { path: '*', component: Err404, hidden: true }
]
