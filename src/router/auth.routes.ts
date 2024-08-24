import { PUBLIC, ROUTES } from '@/constants'
import Login from '@/views/Login.vue'

export const authRoutes = [
  {
    path: ROUTES.index.path,
    name: ROUTES.index.name,
    redirect: ROUTES.login.path,
    meta: {
      layout: PUBLIC,
      requiresAuth: ROUTES.index.requiresAuth,
    },
  },
  {
    path: ROUTES.login.path,
    name: ROUTES.login.name,
    component: Login,
    meta: {
      layout: PUBLIC,
      requiresAuth: ROUTES.login.requiresAuth,
    },
  },
]

export default authRoutes;
