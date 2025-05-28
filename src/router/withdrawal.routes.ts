import { PRIVATE, ROUTES } from "@/constants";
import Withdrawal from "../views/withdrawal.vue";

export const withdrawalRoutes = [
  {
    path: ROUTES.withdrawal.path,
    name: ROUTES.withdrawal.name,
    component: Withdrawal,
    meta: {
      layout: PRIVATE,
      title: ROUTES.withdrawal.title,
      requiresAuth: ROUTES.withdrawal.requiresAuth,
      canAccess: ROUTES.withdrawal.canAccess,
    },
  },
];

export default withdrawalRoutes;
