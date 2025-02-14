import { PRIVATE, ROUTES } from "@/constants";
import wallet from "../views/wallet/index.vue";
import walletTopupApproval from "../views/wallet/approval.vue";

export const walletRoutes = [
  {
    path: ROUTES.wallet.path,
    name: ROUTES.wallet.name,
    component: wallet,
    meta: {
      layout: PRIVATE,
      title: ROUTES.wallet.title,
      requiresAuth: ROUTES.wallet.requiresAuth,
      canAccess: ROUTES.wallet.canAccess,
    },
  },
  {
    path: ROUTES.topup_approval.path,
    name: ROUTES.topup_approval.name,
    component: walletTopupApproval,
    meta: {
      layout: PRIVATE,
      title: ROUTES.topup_approval.title,
      requiresAuth: ROUTES.topup_approval.requiresAuth,
      canAccess: ROUTES.topup_approval.canAccess,
    },
  },
];

export default walletRoutes;
