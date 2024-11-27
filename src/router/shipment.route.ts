import { PRIVATE, ROUTES } from "@/constants";
import shipment from "../views/shipment/index.vue";
import driver from "../views/shipment/drivers.vue";

export const shipmentRoutes = [
  {
    path: ROUTES.fleet.path,
    name: ROUTES.fleet.name,
    component: shipment,
    meta: {
      layout: PRIVATE,
      title: ROUTES.fleet.title,
      requiresAuth: ROUTES.fleet.requiresAuth,
    },
  },
  {
    path: ROUTES.driver.path,
    name: ROUTES.driver.name,
    component: driver,
    meta: {
      layout: PRIVATE,
      title: ROUTES.driver.title,
      requiresAuth: ROUTES.driver.requiresAuth,
    },
  },
];

export default shipmentRoutes;
