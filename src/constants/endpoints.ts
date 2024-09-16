const ADMIN_BASE = "/admin";

export const ENDPOINTS = {
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

  GET_ALL_DRIVERS: `${ADMIN_BASE}/driver?limit=200`,
  GET_CUSTOMERS: `${ADMIN_BASE}/customer`,
  PENDING_TOPUP_REQUEST: `${ADMIN_BASE}/topup/request`,
  PENDDNG_CREDIT_REQUEST: `${ADMIN_BASE}/credit/request`,

  PRODUCT_METRICS: `${ADMIN_BASE}/product/metrics`,
  PRODUCT_BY_ID: (id: any) => `${ADMIN_BASE}/product/${id}`,
  PUBLISH_PRODUCT: (id: any) => `${ADMIN_BASE}/product/${id}/publish`,
  UNPUBLISH_PRODUCT: (id: any) => `${ADMIN_BASE}/product/${id}/unpublish`,
};
