import { PRIVATE, ROUTES } from "@/constants";
import shipment from "../views/shipment/index.vue";
import driver from "../views/shipment/drivers.vue";
import trackDelivery from "../views/shipment/track-delivery.vue";

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
  {
    path: ROUTES.track_delivery.path,
    name: ROUTES.track_delivery.name,
    component: trackDelivery,
    meta: {
      layout: PRIVATE,
      title: ROUTES.track_delivery.title,
      requiresAuth: ROUTES.track_delivery.requiresAuth,
    },
  },
];

export default shipmentRoutes;
