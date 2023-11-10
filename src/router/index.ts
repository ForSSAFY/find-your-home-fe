import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
