import { Pagination } from "@/types";

// KEYS
export const SAVED_AUTH_TOKEN_KEY = "AUTH_TOKEN";

// LAYOUTS
export const PUBLIC = "public";
export const PRIVATE = "private";

export const PHONE_NUMBER_REGEX = /^(?:\+?234|0)(?:\d{10})$/;

export const ORDER_STATUS_OPTION = [
  { label: "Pending", value: "PENDING" },
  { label: "Processing", value: "PROCESSING" },
  { label: "In Transit", value: "IN_TRANSIT" },
  { label: "Decline", value: "DECLINED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Return Order", value: "RETURN_ORDER" },
];

export const ORDER_STATUS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  IN_TRANSIT: "In Transit",
  DECLINED: "Declined",
  COMPLETED: "Completed",
  DELIVERED: "Delivered",
  RETURN_ORDER: "Return Order",
  NEW: "In Transit",
  PACKAGE_DELIVERED: "Completed",
  PACKAGE_REJECTED: "Declined",
};

export const PAYMENT_METHOD = {
  WALLET: "Wallet",
  wallet: "Wallet",
  PAY_ON_DELIVERY: "Pay on Delivery",
  TRANSFER: "Transfer",
  PAY_NOW: "Pay Now",
  wallet_payment: "Wallet Payment",
};

export const DEFAULT_PAGINATION: Pagination = {
  total: 0,
  currentPageTotal: 0,
  currentPageNo: 1,
  totalNoPages: 1,
};

export const STATE_PAYLOAD = {
  data: [],
  pagination: {},
};

export const LOAN_STATUSES = {
  AWAITING_APPROVAL: "Pending",
  disbursed: "Disbursed",
};
