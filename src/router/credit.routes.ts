import { PRIVATE, ROUTES } from "@/constants";
import credits from "../views/credits/index.vue";

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
];

export default creditRoutes;
