import { PRIVATE, ROUTES } from '@/constants'
import Dashboard from '@/views/dashboard/index.vue'

export const dashboardRoutes = [
  {
    path: ROUTES.dashboard.path,
    name: ROUTES.dashboard.name,
    component: Dashboard,
    meta: {
      layout: PRIVATE,
      title: ROUTES.dashboard.title,
      requiresAuth: ROUTES.dashboard.requiresAuth,
      canAccess: ROUTES.dashboard.canAccess,
    },
  },
]

export default dashboardRoutes;
