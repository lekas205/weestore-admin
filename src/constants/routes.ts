export const ROUTES = {
  index: {
    path: "/",
    name: "Index",
    requiresAuth: false,
  },
  login: {
    path: "/login",
    name: "Login",
    requiresAuth: false,
  },
  dashboard: {
    path: "/dashboard",
    name: "Dashboard",
    requiresAuth: true,
    title: "Dashboard Overview",
  },
  category: {
    path: "/category",
    name: "Category",
    requiresAuth: true,
    title: "Category",
  },
  warehouse: {
    path: "/warehouse",
    name: "Warehouse",
    requiresAuth: true,
    title: "Warehouse",
  },
  product: {
    path: "/product",
    name: "Product",
    requiresAuth: true,
    title: "Product",
  },
  orders: {
    path: "/orders",
    name: "Orders",
    requiresAuth: true,
    title: "Orders Management",
  },

  view_orders: {
    path: "/order/:id",
    name: "ViewOrders",
    requiresAuth: true,
    title: "View Order",
  },
  order_return: {
    path: "/orders/returned-order",
    name: "ReeturnedOrders",
    requiresAuth: true,
    title: "Return Processing",
  },
  customer: {
    path: "/customers",
    name: "Customers",
    requiresAuth: true,
    title: "Customer Management",
  },
  unverified_customer: {
    path: "/customers/unverified",
    name: "UnverifiedCustomers",
    requiresAuth: true,
    title: "Customer Verification",
  },
  customer_details: {
    path: "/customers/:id",
    name: "CustomerDetails",
    requiresAuth: true,
    title: "Customer Details",
  },
  shipment: {
    path: "/shipment",
    name: "Shipment",
    requiresAuth: true,
    title: "Shipment",
  },
  wallet: {
    path: "/wallets",
    name: "Wallets",
    requiresAuth: true,
    title: "Wallets",
  },
  topup_approval: {
    path: "/wallets/topup-approval",
    name: "WalletsTopupApproval",
    requiresAuth: true,
    title: "Pending TopUp Approval",
  },
  credit: {
    path: "/credits",
    name: "Credits",
    requiresAuth: true,
    title: "Credits Management",
  },
  credit_repayment: {
    path: "/credits/pending-repayment",
    name: "Credits Repayment",
    requiresAuth: true,
    title: "Credits Repayment Requests",
  },
  payment: {
    path: "/payments",
    name: "Payments",
    requiresAuth: true,
    title: "Payments",
  },
};
