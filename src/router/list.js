import Vue from 'vue'
import VueRouter from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

// layout
import Layout from '@/views/layout/layout'
// home
import Home from '@/views/home'
// article
import Article from '@/views/article/read/index.vue'
import ArticleList from '@/views/article/list/index.vue'
import ArticleEdit from '@/views/article/edit/index.vue'
import ArticleAdd from '@/views/article/add/index.vue'

// route
import demoRouter from './modules/demo'

Vue.use(VueRouter)

export const routerMap = [
  ...demoRouter,
  {
    path: '/401',
    component: _import('error/401'),
    hidden: true,
    meta: {
      requireAuth: false,
      title: '禁止进入'
    }
  },
  {
    path: '/404',
    component: _import('error/404'),
    hidden: true,
    meta: {
      requireAuth: false,
      title: '无人深空'
    }
  },
  {
    path: '/500',
    component: _import('error/500'),
    hidden: true,
    meta: {
      requireAuth: false,
      title: '服务器错误'
    }
  },
  {
    path: '/login/callback',
    component: _import('oauth'),
    hidden: true,
    meta: {
      requireAuth: false,
      title: 'OAuth 授权'
    }
  },
  {
    path: '/',
    redirct: '/',
    alias: '/home',
    component: Home,
    hidden: true,
    meta: {
      requireAuth: false,
      title: '首页'
    }
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: '文章',
    icon: 'chrome_reader_mode',
    hidden: false,
    dropDown: true,
    meta: {
      requireAuth: false
    },
    children: [
      {
        path: 'list',
        component: ArticleList,
        name: '文章列表',
        meta: {
          requireAuth: false,
          title: '文章列表'
        }
      },
      {
        path: 'edit/:id',
        component: ArticleEdit,
        name: '编辑文章',
        hidden: true,
        meta: {
          requireAuth: true,
          roles: ['user', 'admin'],
          title: '编辑文章'
        }
      },
      {
        path: 'add',
        component: ArticleAdd,
        name: '写文章',
        hidden: false,
        meta: {
          requireAuth: true,
          roles: ['user', 'admin'],
          title: '新增文章'
        }
      },
      {
        path: ':id',
        component: Article,
        name: '文章正文',
        hidden: true,
        meta: {
          requireAuth: false,
          title: '文章'
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: '个人中心',
    icon: 'person',
    hidden: false,
    dropdown: false,
    meta: {
      requireAuth: true,
      roles: ['user', 'admin']
    },
    children: [
      {
        path: '',
        component: _import('user/userCenter'),
        hidden: true,
        meta: {
          requireAuth: true,
          roles: ['user', 'admin'],
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '*',
    component: _import('error/404'),
    hidden: true,
    meta: {
      requireAuth: false
    }
  }
]

export default new VueRouter({
  mode: 'history',
  routes: routerMap
})
