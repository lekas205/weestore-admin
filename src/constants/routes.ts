export const ROUTES = {
  index: {
    path: '/',
    name: 'Index',
    requiresAuth: false,
  },
  login: {
    path: '/login',
    name: 'Login',
    requiresAuth: false,
  },
  dashboard: {
    path: '/dashboard',
    name: 'Dashboard',
    requiresAuth: true,
    title: 'Dashboard Overview'
  },
  category: {
    path: '/category',
    name: 'Category',
    requiresAuth: true,
    title: 'Category'
  },
  warehouse: {
    path: '/warehouse',
    name: 'Warehouse',
    requiresAuth: true,
    title: 'Warehouse'
  },
  product: {
    path: '/product',
    name: 'Product',
    requiresAuth: true,
    title: 'Product'
  },
  orders: {
    path: '/orders',
    name: 'Orders',
    requiresAuth: true,
    title: 'Orders'
  },
  customer: {
    path: '/customers',
    name: 'Customers',
    requiresAuth: true,
    title: 'Customers'
  },
  shipment: {
    path: '/shipment',
    name: 'Shipment',
    requiresAuth: true,
    title: 'Shipment'
  },
  wallet: {
    path: '/wallets',
    name: 'Wallets',
    requiresAuth: true,
    title: 'Wallets'
  },
  credit: {
    path: '/credits',
    name: 'Credits',
    requiresAuth: true,
    title: 'Credits'
  },
  payment: {
    path: '/payments',
    name: 'Payments',
    requiresAuth: true,
    title: 'Payments'
  },
}
