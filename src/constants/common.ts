// KEYS
export const SAVED_AUTH_TOKEN_KEY = "AUTH_TOKEN";

// LAYOUTS
export const PUBLIC = "public";
export const PRIVATE = "private";

export const PHONE_NUMBER_REGEX = /^(?:\+?234|0)(?:\d{10})$/;

export const ORDER_STATUS = [
  { label: "Pending", value: "PENDING" },
  { label: "In Transit", value: "IN_TRANSIT" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Return Order", value: "RETURN_ORDER" },
];

export const PAYMENT_METHOD = {
  WALLET: "Wallet",
  PAY_ON_DELIVERY: "Pay on Delivery",
  TRANSFER: "Transfer",
  wallet_to_system: "Wallet",
};
