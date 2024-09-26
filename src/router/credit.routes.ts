import { PRIVATE, ROUTES } from "@/constants";
import credits from "../views/credits/index.vue";
import creditRepayment from "../views/credits/repayment.vue";

export const creditRoutes = [
  {
    path: ROUTES.credit.path,
    name: ROUTES.credit.name,
    component: credits,
    meta: {
      layout: PRIVATE,
      title: ROUTES.credit.title,
      requiresAuth: ROUTES.credit.requiresAuth,
    },
  },

  {
    path: ROUTES.credit_repayment.path,
    name: ROUTES.credit_repayment.name,
    component: creditRepayment,
    meta: {
      layout: PRIVATE,
      title: ROUTES.credit_repayment.title,
      requiresAuth: ROUTES.credit_repayment.requiresAuth,
    },
  },
];

export default creditRoutes;
