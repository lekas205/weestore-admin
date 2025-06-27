const ADMIN_BASE = "/admin";

export const ENDPOINTS = {
  ADMIN: `/v1${ADMIN_BASE}`,
  ADMIN_ROLES: `role`,
  LOGIN: `/v1${ADMIN_BASE}/login`,
  LOGOUT: `/v1${ADMIN_BASE}/logout`,
  CATEGORY: `/v1${ADMIN_BASE}/category`,
  CATEGORY_BY_ID: (id: any) => `/v1${ADMIN_BASE}/category/${id}`,
  WAREHOUSE: `/v1${ADMIN_BASE}/store`,
  WAREHOUSE_BY_ID: (id: any) => `/v1${ADMIN_BASE}/store/${id}`,
  PRODUCT: `/v1${ADMIN_BASE}/product`,
  GET_STATES: "/utility/states",
  GET_WAREHOUSE_BY_STATE: (stateID: string) =>
    `/utility/state/store/${stateID}`,
  GET_ORDERS: `/v1${ADMIN_BASE}/order`,

  UPDATE_ORDER_STATUS: ({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) => `/v1${ADMIN_BASE}/order/${orderId}/status/${status}`,
  UPDATE_DRIVER_ORDER_STATUS: ({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) => `/v1${ADMIN_BASE}/driver/order/${orderId}/status/${status}`,

  WALLET: `/v1${ADMIN_BASE}/wallet`,
  DASHBOARD: `/v1${ADMIN_BASE}/dashboard`,
  GET_DRIVERS: `/v1${ADMIN_BASE}/driver`,
  GET_CUSTOMERS: `/v1${ADMIN_BASE}/customer`,
  PENDING_TOPUP_REQUEST: `/v1${ADMIN_BASE}/topup/request`,
  PENDDNG_CREDIT_REQUEST: `/v1${ADMIN_BASE}/credit/request`,
  CREDIT_REQUEST: `/v1${ADMIN_BASE}/credit`,
  APPROVED_LOAN_REQUEST: `/v1${ADMIN_BASE}/loan/active`,
  PAID_LOAN_REQUEST: `/v1${ADMIN_BASE}/loan/paid`,
  LOAN_REPAYMENT_REQUEST: `/v1${ADMIN_BASE}/credit/repayment/request`,
  PRODUCTS: `/v1${ADMIN_BASE}/product`,
  PRODUCT_METRICS: `/v1${ADMIN_BASE}/product/metrics`,
  PRODUCT_BY_ID: (id: any) => `/v1${ADMIN_BASE}/product/${id}`,
  PUBLISH_PRODUCT: (id: any) => `/v1${ADMIN_BASE}/product/${id}/publish`,
  UNPUBLISH_PRODUCT: (id: any) => `/v1${ADMIN_BASE}/product/${id}/unpublish`,
  WITHDRAWAL_REQUEST: `/v1${ADMIN_BASE}/withdrawal/request`,
  WALLET_TOPUP:  (customer_id: string) => `/v2${ADMIN_BASE}/customer/${customer_id}/topup`,
};
