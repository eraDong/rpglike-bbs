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
        },
        {
          path: '/post/platecontent',
          component: () => import('@/views/Post/PlateContent.vue')
        },
        {
          path: '/post/topic',
          component: () => import('@/views/Post/TopicPage.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/views/User/UserPage.vue'),
      redirect: '/user/profile',
      children: [
        {
          path: '/user/profile',
          component: () => import('@/views/User/ProfilePage.vue')
        },
        {
          path: '/user/account',
          component: () => import('@/views/User/AccountPage.vue')
        }
      ]
    },
    {
      path: '/contact',
      component: () => import('@/views/Contact/ContactPage.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/Register/RegisterPage.vue')
    }
  ]
})

export default router
