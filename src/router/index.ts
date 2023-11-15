import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import("@/views/MainView.vue") 
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/LoginView.vue") 
    },
    {
      path: '/join',
      name: 'join',
      component: () => import("@/views/JoinView.vue") 
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
})

export default router
