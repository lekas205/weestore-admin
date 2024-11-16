import { PRIVATE, ROUTES } from "@/constants";
import users from "../views/users/index.vue";

export const useersRoutes = [
  {
    path: ROUTES.users.path,
    name: ROUTES.users.name,
    component: users,
    meta: {
      layout: PRIVATE,
      title: ROUTES.users.title,
      requiresAuth: ROUTES.users.requiresAuth,
    },
  },
];

export default useersRoutes;
