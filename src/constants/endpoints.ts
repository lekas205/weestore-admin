const ADMIN_BASE = '/admin';

export const ENDPOINTS = {
  LOGIN: `${ADMIN_BASE}/login`,
  LOGOUT: `${ADMIN_BASE}/logout`,
  CATEGORY: `${ADMIN_BASE}/category`,
  CATEGORIES_BY_ID: (id: any) => `${ADMIN_BASE}/category/${id}`,
  WAREHOUSE: `${ADMIN_BASE}/warehouse`,
  PRODUCT: `${ADMIN_BASE}/product`,
  GET_STATES: '/utility/states',
  GET_WAREHOUSE_BY_STATE: (stateID: string) => `/utility/state/warehouse/${stateID}`
}
