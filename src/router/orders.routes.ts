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
    path: ROUTES.viewOrders.path,
    name: ROUTES.viewOrders.name,
    component: ViewOrder,
    meta: {
      layout: PRIVATE,
      title: ROUTES.viewOrders.title,
      requiresAuth: true,
    },
  },
  {
    path: ROUTES.orderReturn.path,
    name: ROUTES.orderReturn.name,
    component: ReturnProcessing,
    meta: {
      layout: PRIVATE,
      title: ROUTES.orderReturn.title,
      requiresAuth: true,
    },
  },
];

export default ordersRoutes;
