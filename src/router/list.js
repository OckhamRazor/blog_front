import Vue from 'vue'
import VueRouter from 'vue-router'

// login
import Login from '@/views/Login'
import OAuth from '@/views/OAuth'

// layout
import Layout from '@/views/layout/Layout'
// Error Page
import Err401 from '@/views/error/401'
import Err404 from '@/views/error/404'
import Err500 from '@/views/error/500'

// home
import Home from '@/views/Home.vue'
// article
import Article from '@/views/article/index.vue'
import ArticleList from '@/views/article/list.vue'
import ArticleEdit from '@/views/article/edit.vue'
import ArticleAdd from '@/views/article/add.vue'
// user
import Profile from '@/views/user/profile.vue'
// more
// import More from '@/views/More.vue'
// route
import demoRouter from './modules/demo'

Vue.use(VueRouter)

export const routerMap = [
  ...demoRouter,
  {
    path: '/401',
    component: Err401,
    hidden: true,
    meta: {
      requireAuth: false,
      title: '禁止进入'
    }
  },
  {
    path: '/404',
    component: Err404,
    hidden: true,
    meta: {
      requireAuth: false,
      title: '无人深空'
    }
  },
  {
    path: '/500',
    component: Err500,
    hidden: true,
    meta: {
      requireAuth: false,
      title: '服务器错误'
    }
  },
  {
    path: '/login/callback',
    component: OAuth,
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
    path: '/login',
    component: Login,
    name: '登录',
    hidden: false,
    noDropdown: true,
    meta: {
      requireAuth: true,
      roles: ['visitor'],
      title: '登录'
    }
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: '文章',
    icon: 'chrome_reader_mode',
    hidden: false,
    noDropdown: true,
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
        name: '新增文章',
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
    name: '用户中心',
    redirect: '/user/profile',
    icon: 'person',
    hidden: false,
    noDropdown: false,
    meta: {
      requireAuth: true,
      roles: ['user', 'admin']
    },
    children: [
      {
        path: 'profile',
        component: Profile,
        name: '个人信息',
        hidden: false,
        meta: {
          title: '个人信息',
          requireAuth: true,
          roles: ['user', 'admin']
        }
      },
      {
        path: 'account',
        component: Profile,
        name: '账号设置',
        hidden: false,
        meta: {
          title: '账号设置',
          requireAuth: true,
          roles: ['user', 'admin']
        }
      }
    ]
  },
  {
    path: '*',
    component: Err404,
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
