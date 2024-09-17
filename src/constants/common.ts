import { Pagination } from "@/types";

// KEYS
export const SAVED_AUTH_TOKEN_KEY = "AUTH_TOKEN";

// LAYOUTS
export const PUBLIC = "public";
export const PRIVATE = "private";

export const PHONE_NUMBER_REGEX = /^(?:\+?234|0)(?:\d{10})$/;

export const ORDER_STATUS_OPTION = [
  { label: "Pending", value: "PENDING" },
  { label: "In Transit", value: "IN_TRANSIT" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Return Order", value: "RETURN_ORDER" },
];

export const ORDER_STATUS = {
  PENDING: "Pending",
  IN_TRANSIT: "In Transit",
  PROCESSING: "Processing",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  DELIVERED: "Delivered",
  RETURN_ORDER: "Return Order",
};

export const PAYMENT_METHOD = {
  WALLET: "Wallet",
  PAY_ON_DELIVERY: "Pay on Delivery",
  TRANSFER: "Transfer",
  wallet_to_system: "Wallet",
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
