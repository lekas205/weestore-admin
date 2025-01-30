import { createRouter, createWebHistory } from "vue-router";
import { SAVED_AUTH_TOKEN_KEY, SAVED_ADMIN_ROLE, ROUTES } from "@/constants";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";
import productRoutes from "./product.routes";
import ordersRoutes from "./orders.routes";
import customerRoutes from "./customer.routes";
import creditRoutes from "./credit.routes";
import walletRoutes from "./wallet.route";
import shipmentRoutes from "./shipment.route";
import usersRoutes from "./user..route";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...ordersRoutes,
    ...creditRoutes,
    ...dashboardRoutes,
    ...productRoutes,
    ...customerRoutes,
    ...walletRoutes,
    ...usersRoutes,
    ...shipmentRoutes,
  ],
});

router.beforeEach((to, _from, next) => {
  let validRoute = false;
  let isUserLoggedIn = !!localStorage.getItem(SAVED_AUTH_TOKEN_KEY);
  const adminRole = localStorage.getItem(SAVED_ADMIN_ROLE);

  for (const key in ROUTES) {
    if (ROUTES[key as keyof typeof ROUTES].name === to.name) validRoute = true;
  }

  const { requiresAuth, canAccess } = to.meta as any;
  if (!validRoute) {
    next({ name: ROUTES.login.name });
  } else if (requiresAuth && !isUserLoggedIn) {
    next(`${ROUTES.login.path}?next=${to.path}`);
  } else if (!requiresAuth && isUserLoggedIn) {    
    if (to.name == ROUTES.dashboard.name ) {
      next();
    } else {
      next({ name: ROUTES.dashboard.name });
    }
  } else if(canAccess && !canAccess.includes(adminRole) ) {
    next({ name: ROUTES.dashboard.name });
  }else {
    next();
  }
});

export default router;
