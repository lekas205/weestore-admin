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
  GET_NEW_ORDERS: (query?: string) => `${ADMIN_BASE}/order/new?${query ?? ""}`,
  GET_DELIVERED_ORDERS: (query?: string) =>
    `${ADMIN_BASE}/order/delivered?${query ?? ""}`,
  GET_DECLINED_RDERS: (query?: string) =>
    `${ADMIN_BASE}/order/declined?${query ?? ""}`,
  GET_RETURNED_RDERS: (query?: string) =>
    `${ADMIN_BASE}/order/returned?${query ?? ""}`,
  GET_COMPLETED_RDERS: (query?: string) =>
    `${ADMIN_BASE}/order/completed?${query ?? ""}`,

  UPDATE_ORDER_STATUS: ({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) => `${ADMIN_BASE}/order/${orderId}/completed/${status}`,

  GET_ALL_DRIVERS: `${ADMIN_BASE}/driver?limit=200`,
  GET_CUSTOMERS: `${ADMIN_BASE}/customer`,
  PENDING_TOPUP_REQUEST: `${ADMIN_BASE}/topup/request`,
};
