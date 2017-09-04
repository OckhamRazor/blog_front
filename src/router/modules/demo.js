// demo页面
import Layout from '@/views/layout/Layout'
import DemoPage from '@/views/demo/Page'

const router = [
  {
    path: '/demo',
    name: '组件测试',
    component: Layout,
    hidden: false,
    noDropdown: true,
    redirect: '/demo/',
    meta: {
      requireAuth: true,
      roles: ['admin']
    },
    children: [
      {
        path: '',
        requireAuth: true,
        role: ['admin'],
        component: DemoPage,
        name: '组件使用Demo'
      }
    ]
  }
]

export default router
