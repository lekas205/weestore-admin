import { Pagination } from "@/types";

// KEYS
export const SAVED_AUTH_TOKEN_KEY = "AUTH_TOKEN";
export const SAVED_ADMIN_ROLE = "ADMIN_ROLE";
// LAYOUTS
export const PUBLIC = "public";
export const PRIVATE = "private";

export const PHONE_NUMBER_REGEX = /^(?:\+?234|0)(?:\d{10})$/;

export const ORDER_STATUS_OPTION = [
  { label: "Pending", value: "PENDING" },
  { label: "Processing", value: "PROCESSING" },
  // { label: "In Transit", value: "IN_TRANSIT" },
  { label: "Decline", value: "DECLINED" },
  // { label: "Delivered", value: "DELIVERED" },
  { label: "Completed", value: "COMPLETED" },
  // { label: "Return Order", value: "RETURN_ORDER" },
];

export const DRIVER_STATUS_OPTIONS = [
  { label: "Return Order", value: "PACKAGE_REJECTED" },
  { label: "Delivered", value: "PACKAGE_DELIVERED" },
];

export const ORDER_STATUS = {
  NEW: "In Transit",
  PENDING: "Pending",
  DECLINED: "Declined",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
  DELIVERED: "Delivered",
  PROCESSING: "Processing",
  IN_TRANSIT: "In Transit",
  PACKAGE_REJECTED: "Declined",
  RETURN_ORDER: "Return Order",
  PACKAGE_DELIVERED: "Completed",
  RETURN_APPROVED: "Approved",
  AWAITING_APPROVAL: "Awaiting Approval",
  AWAITING_PROCESSING: "Awaiting processing",
};

export const PAYMENT_METHOD = {
  WALLET: "Wallet",
  wallet: "Wallet",
  BANK: 'Bank Transfer',
  PAYSTACK: "Paystack",
  manual_payment: "Bank Transfer",
  PAY_ON_DELIVERY: "Pay on Delivery",
  TRANSFER: "Transfer",
  paystack: "Paystack",
  PAY_NOW: "Pay Now",
  transfer: "Transfer",
  pocket_wallet: "Wallet",
  paystack_transfer: "Paystack",
  wallet_payment: "Wallet Payment",
  reward_wallet: "Rewards",

};

export const DEFAULT_PAGINATION: Pagination = {
  total: 0,
  currentPageTotal: 0,
  currentPageNo: 1,
  totalNoPages: 1,
};

export const STATE_PAYLOAD = {
  data: [],
  pagination: {} as any,
};

export const LOAN_STATUSES = {
  AWAITING_APPROVAL: "Pending",
  disbursed: "Disbursed",
};

export const ADMIN_ROLES = {
  accountant: "Accountant",
  customer_service: "Customer Service",
  business_development_manager: "Business Development Manager",
  internal_control_manager: "Internal Control Manager",
}
