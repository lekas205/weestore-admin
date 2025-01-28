import { z } from "zod"
import { QueryFilterSchema } from '@/schemas'

export type ApiResponseDto<T = { message: string }> = {
  statusCode: number;
  message: string;
  payload: T;
}

export type ApiPagination<T = any[]> = {
  paging: Pagination;
  rows: T;
}

export type QueryFilter = z.infer<typeof QueryFilterSchema>;

export interface Pagination {
  total: number;
  currentPageTotal: number;
  currentPageNo: number;
  totalNoPages: number;
}

export interface ToastPayload {
  message: string;
  duration?: number;
  variant?: 'success' | 'info' | 'error' | 'warning' | 'default';
  position?:  'top-right'
  | 'top'
  | 'top-left'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
}

export type SidebarLink = {
  id: number;
  title: string;
  link: string | null;
  isActive: boolean;
  icon: string;
  activeIcon: string;
  customClass: string;
  access:string[],
  subLinks?: {
    id: number;
    title: string;
    link: string;
    isActive: boolean;
  }[]
}

export type CustomFormData<T = Record<string, any>> = {
  [key in keyof T]: {
    value: T[key] | null,
    errorMessage: string | null,
    clear?: () => void
  }
};
