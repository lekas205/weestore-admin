import { Pagination } from "@/types";

// KEYS
export const SAVED_AUTH_TOKEN_KEY = 'AUTH_TOKEN';

// LAYOUTS
export const PUBLIC = 'public';
export const PRIVATE = 'private';

export const PHONE_NUMBER_REGEX = /^(?:\+?234|0)(?:\d{10})$/;

export const DEFAULT_PAGINATION: Pagination = {
  total: 0,
  currentPageTotal: 0,
  currentPageNo: 1,
  totalNoPages: 1,
}
