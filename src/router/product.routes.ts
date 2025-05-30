import { PRIVATE, ROUTES } from '@/constants'
import Category from '@/views/product/Category.vue'
import Warehouse from '@/views/product/Warehouse.vue'
import Product from '@/views/product/Product.vue'

export const productRoutes = [
  {
    path: ROUTES.category.path,
    name: ROUTES.category.name,
    component: Category,
    meta: {
      layout: PRIVATE,
      title: ROUTES.category.title,
      requiresAuth: ROUTES.category.requiresAuth,
      canAccess: ROUTES.category.canAccess,
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
      canAccess: ROUTES.warehouse.canAccess,
    },
  },
  {
    path: ROUTES.product.path,
    name: ROUTES.product.name,
    component: Product,
    meta: {
      layout: PRIVATE,
      title: ROUTES.product.title,
      requiresAuth: ROUTES.product.requiresAuth,
      canAccess: ROUTES.product.canAccess,
    },
  },
]

export default productRoutes;
