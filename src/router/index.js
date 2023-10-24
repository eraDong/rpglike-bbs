import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/LayoutContainer.vue'),
      redirect: '/post/popular',
      children: [
        {
          path: '/post/popular',
          component: () => import('@/views/Post/PopularPage.vue')
        },
        {
          path: '/post/plate',
          component: () => import('@/views/Post/PlatePage.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/views/User/UserPage.vue')
    },
    {
      path: '/contact',
      component: () => import('@/views/Contact/ContactPage.vue')
    },
    {
      path: '/topic',
      component: () => import('@/views/Topic/TopicPage.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/Login/LoginPage.vue')
    }
  ]
})

export default router
