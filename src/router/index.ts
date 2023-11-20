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
        }
      ]
    },
    // 페이지에 Header, Footer 표시하지 않을 경우 여기에 작성
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('@/views/JoinView.vue')
    },
    {
      path: '/find-id',
      name: 'find-id',
      component: () => import('@/views/FindIdView.vue'),
    },
    {
      path: '/find-id/complete',
      name: 'find-id-complete',
      component: () => import('@/views/FindIdCompleteView.vue'),
    },
    {
      path: '/find-pw',
      name: 'find-pw',
      component: () => import('@/views/FindPasswordView.vue'),
    },
    {
      path: '/find-pw/complete',
      name: 'find-pw-complete',
      component: () => import('@/views/FindPasswordCompleteView.vue'),
    },
  ]
})

export default router
