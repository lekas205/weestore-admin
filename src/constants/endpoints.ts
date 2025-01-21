const ADMIN_BASE = "/admin";

export const ENDPOINTS = {
  ADMIN: `${ADMIN_BASE}`,
  ADMIN_ROLES: `role`,
  LOGIN: `${ADMIN_BASE}/login`,
  LOGOUT: `${ADMIN_BASE}/logout`,
  CATEGORY: `${ADMIN_BASE}/category`,
  CATEGORY_BY_ID: (id: any) => `${ADMIN_BASE}/category/${id}`,
  WAREHOUSE: `${ADMIN_BASE}/warehouse`,
  WAREHOUSE_BY_ID: (id: any) => `${ADMIN_BASE}/warehouse/${id}`,
  PRODUCT: `${ADMIN_BASE}/product`,
  GET_STATES: "/utility/states",
  GET_WAREHOUSE_BY_STATE: (stateID: string) =>
    `/utility/state/warehouse/${stateID}`,
  GET_ORDERS: `${ADMIN_BASE}/order`,

  UPDATE_ORDER_STATUS: ({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) => `${ADMIN_BASE}/order/${orderId}/status/${status}`,
  UPDATE_DRIVER_ORDER_STATUS: ({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) => `${ADMIN_BASE}/driver/order/${orderId}/status/${status}`,

  WALLET: `${ADMIN_BASE}/wallet`,
  DASHBOARD: `${ADMIN_BASE}/dashboard`,
  GET_DRIVERS: `${ADMIN_BASE}/driver`,
  GET_CUSTOMERS: `${ADMIN_BASE}/customer`,
  PENDING_TOPUP_REQUEST: `${ADMIN_BASE}/topup/request`,
  PENDDNG_CREDIT_REQUEST: `${ADMIN_BASE}/credit/request`,
  CREDIT_REQUEST: `${ADMIN_BASE}/credit`,
  APPROVED_LOAN_REQUEST: `${ADMIN_BASE}/loan/active`,
  PAID_LOAN_REQUEST: `${ADMIN_BASE}/loan/paid`,
  LOAN_REPAYMENT_REQUEST: `${ADMIN_BASE}/credit/repayment/request`,
  PRODUCTS: `${ADMIN_BASE}/product`,
  PRODUCT_METRICS: `${ADMIN_BASE}/product/metrics`,
  PRODUCT_BY_ID: (id: any) => `${ADMIN_BASE}/product/${id}`,
  PUBLISH_PRODUCT: (id: any) => `${ADMIN_BASE}/product/${id}/publish`,
  UNPUBLISH_PRODUCT: (id: any) => `${ADMIN_BASE}/product/${id}/unpublish`,
};
