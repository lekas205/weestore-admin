import { PRIVATE, ROUTES } from '@/constants'
import Category from '@/views/product/Category.vue'
import Warehouse from '@/views/product/Warehouse.vue'

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
  {
    path: ROUTES.warehouse.path,
    name: ROUTES.warehouse.name,
    component: Warehouse,
    meta: {
      layout: PRIVATE,
      title: ROUTES.warehouse.title,
      requiresAuth: ROUTES.warehouse.requiresAuth,
    },
  },
  {
    path: ROUTES.product.path,
    name: ROUTES.product.name,
    component: Category,
    meta: {
      layout: PRIVATE,
      title: ROUTES.product.title,
      requiresAuth: ROUTES.product.requiresAuth,
    },
  },
]

export default productRoutes;
