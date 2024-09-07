import { createRouter, createWebHistory } from "vue-router";
import { SAVED_AUTH_TOKEN_KEY, ROUTES } from "@/constants";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";
import productRoutes from "./product.routes";
import ordersRoutes from "./orders.routes";
import customerRoutes from "./customer.routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...ordersRoutes,
    ...dashboardRoutes,
    ...productRoutes,
    ...customerRoutes,
  ],
});

// router.beforeEach((to, _from, next) => {
//   let validRoute = false;
//   let isUserLoggedIn = !!localStorage.getItem(SAVED_AUTH_TOKEN_KEY);

//   for (const key in ROUTES) {
//     if (ROUTES[key as keyof typeof ROUTES].path === to.path) validRoute = true;
//   }

//   const { requiresAuth } = to.meta;
//   if (!validRoute) {
//     next({ name: ROUTES.login.name });
//   } else if (requiresAuth && !isUserLoggedIn) {
//     next(`${ROUTES.login.path}?next=${to.path}`);
//   } else if (!requiresAuth && isUserLoggedIn) {
//     if (to.name == ROUTES.dashboard.name) {
//       next();
//     } else {
//       next({ name: ROUTES.dashboard.name });
//     }
//   } else {
//     next();
//   }
// });

export default router;
