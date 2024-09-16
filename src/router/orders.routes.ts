import { PRIVATE, ROUTES } from "@/constants";
import orders from "../views/orders/index.vue";
import ViewOrder from "../views/orders/view-order.vue";
import ReturnProcessing from "../views/orders/return-processing.vue";
export const ordersRoutes = [
  {
    path: ROUTES.orders.path,
    name: ROUTES.orders.name,
    component: orders,
    meta: {
      layout: PRIVATE,
      title: ROUTES.orders.title,
      requiresAuth: ROUTES.orders.requiresAuth,
    },
  },
  {
    path: ROUTES.view_orders.path,
    name: ROUTES.view_orders.name,
    component: ViewOrder,
    meta: {
      layout: PRIVATE,
      title: ROUTES.view_orders.title,
      requiresAuth: true,
    },
  },
  {
    path: ROUTES.order_return.path,
    name: ROUTES.order_return.name,
    component: ReturnProcessing,
    meta: {
      layout: PRIVATE,
      title: ROUTES.order_return.title,
      requiresAuth: true,
    },
  },
];

export default ordersRoutes;
