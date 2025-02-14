import { PRIVATE, ROUTES } from "@/constants";
import customer from "../views/customers/index.vue";
import unverifiedCustomer from "../views/customers/unverified.vue";
import customerDetails from "../views/customers/details.vue";

export const customerRoutes = [
  {
    path: ROUTES.customer.path,
    name: ROUTES.customer.name,
    component: customer,
    meta: {
      layout: PRIVATE,
      title: ROUTES.customer.title,
      requiresAuth: ROUTES.customer.requiresAuth,
      canAccess: ROUTES.customer.canAccess,
    },
  },
  {
    path: ROUTES.unverified_customer.path,
    name: ROUTES.unverified_customer.name,
    component: unverifiedCustomer,
    meta: {
      layout: PRIVATE,
      title: ROUTES.unverified_customer.title,
      requiresAuth: ROUTES.unverified_customer.requiresAuth,
      canAccess: ROUTES.unverified_customer.canAccess,
    },
  },
  {
    path: ROUTES.customer_details.path,
    name: ROUTES.customer_details.name,
    component: customerDetails,
    meta: {
      layout: PRIVATE,
      title: ROUTES.customer_details.title,
      requiresAuth: ROUTES.customer_details.requiresAuth,
      canAccess: ROUTES.customer_details.canAccess,
    },
  },
];

export default customerRoutes;
