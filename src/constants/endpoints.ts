const ADMIN_BASE = '/admin';

export const ENDPOINTS = {
  LOGIN: `${ADMIN_BASE}/login`,
  LOGOUT: `${ADMIN_BASE}/logout`,
  CATEGORY: `${ADMIN_BASE}/category`,
  CATEGORY_BY_ID: (id: any) => `${ADMIN_BASE}/category/${id}`,
  WAREHOUSE: `${ADMIN_BASE}/warehouse`,
  WAREHOUSE_BY_ID: (id: any) => `${ADMIN_BASE}/warehouse/${id}`,
  PRODUCT: `${ADMIN_BASE}/product`,
  PRODUCT_METRICS: `${ADMIN_BASE}/product/metrics`,
  PRODUCT_BY_ID: (id: any) => `${ADMIN_BASE}/product/${id}`,
  PUBLISH_PRODUCT: (id: any) => `${ADMIN_BASE}/product/${id}/publish`,
  UNPUBLISH_PRODUCT: (id: any) => `${ADMIN_BASE}/product/${id}/unpublish`,
  GET_STATES: '/utility/states',
  GET_WAREHOUSE_BY_STATE: (stateID: string) => `/utility/state/warehouse/${stateID}`
}
