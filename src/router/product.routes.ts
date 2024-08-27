import { PRIVATE, ROUTES } from '@/constants'
import Category from '@/views/product/Category.vue'

export const productRoutes = [
  {
    path: ROUTES.category.path,
    name: ROUTES.category.name,
    component: Category,
    meta: {
      layout: PRIVATE,
      title: ROUTES.category.title,
      requiresAuth: ROUTES.category.requiresAuth,
    },
  },
]

export default productRoutes;
