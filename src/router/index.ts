import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/IndexView.vue'),
      children: [
        // 페이지에 Header, Footer 표시할 경우 여기에 작성
        {
          path: '',
          name: 'main',
          component: () => import('@/views/MainView.vue')
        },
        {
          path: '/qna',
          name: 'qna',
          redirect: { name: 'list' },
          children: [
            {
              path: 'view/:no',
              name: 'view',
              component: () => import('@/views/QnaView.vue')
            },
            {
              path: 'list',
              name: 'list',
              component: () => import('@/views/QnaListView.vue')
            },
            {
              path: 'edit/:no',
              name: 'edit',
              component: () => import('@/views/QnaEditView.vue')
            },
            {
              path: 'write',
              name: 'write',
              component: () => import('@/views/QnaWriteView.vue')
            }
          ]
        },
        {
          path: '/notice',
          name: 'notice',
          redirect: { name: 'list' },
          children: [
            {
              path: 'view/:no',
              name: 'view',
              component: () => import('@/views/notice/NoticeView.vue')
            },
            {
              path: 'list',
              name: 'list',
              component: () => import('@/views/notice/NoticeListView.vue')
            },
            {
              path: 'edit/:no',
              name: 'edit',
              component: () => import('@/views/notice/NoticeEditView.vue')
            },
            {
              path: 'write',
              name: 'write',
              component: () => import('@/views/notice/NoticeWriteView.vue')
            }
          ]
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('@/views/news/NewsListView.vue')
        }
      ]
    },
    // 페이지에 Header, Footer 표시하지 않을 경우 여기에 작성
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/LoginView.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('@/views/user/JoinView.vue')
    },
    {
      path: '/find-id',
      name: 'find-id',
      component: () => import('@/views/user/FindIdView.vue'),
    },
    {
      path: '/find-id/complete',
      name: 'find-id-complete',
      component: () => import('@/views/user/FindIdCompleteView.vue'),
    },
    {
      path: '/find-pw',
      name: 'find-pw',
      component: () => import('@/views/user/FindPasswordView.vue'),
    },
    {
      path: '/find-pw/complete',
      name: 'find-pw-complete',
      component: () => import('@/views/user/FindPasswordCompleteView.vue'),
    },
  ]
})

export default router
