import { z } from 'zod'
import {
  CreateCategorySchema,
  CreateProductSchema,
  CreateWarehouseSchema,
  UpdateCategorySchema,
  UpdateWarehouseSchema
} from '@/schemas'
import { ApiPagination, ApiResponseDto } from './common';

//============ CATEGORY =============//
export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;

export type CreateCategoryRes = ApiResponseDto;

export type Category = {
  category_id: string;
  category_name: string;
  description: string;
  icon: string;
  parent_category_id: string | null;
  created_at: string;
  updated_at: string;
  active: boolean;
  created_by_id: string;
  updated_by_id: string | null;
  stamp_user: string | null;
  meta?: any;
  productcategory: any[];
}

export type FetchAllCategoryRes = ApiResponseDto<ApiPagination<Category[]>>;

export type FetchCategoryByIdRes = ApiResponseDto<Category>;

export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;

//============ WAREHOUSE =============//
export type CreateWarehouseDto = z.infer<typeof CreateWarehouseSchema>;

export type CreateWarehouseRes = ApiResponseDto;

export type Warehouse = {
  warehouse_id: string;
  warehouse_name: string;
  address: string;
  city: string;
  postal_code: string | null;
  country: string | null;
  phone: string;
  email: string | null;
  created_by_id: string;
  updated_by_id: string | null;
  stamp_user: string | null;
  created_at: string;
  updated_at: string;
  active: boolean;
  meta: any;
  state_id: string;
  state: {
    state_id: string;
    name: string;
    code: string;
    active: boolean;
    stamp_user: string;
    created_at: string;
    updated_at: string;
    meta: any
  }
}

export interface IState {
  name: string;
  code: string;
}

export type FetchAllWarehouseRes = ApiResponseDto<ApiPagination<Warehouse[]>>;

export type UpdateWarehouseDto = z.infer<typeof UpdateWarehouseSchema>;

export type FetchWarehouseByStateRes = ApiResponseDto<{
  name: string;
  id: string;
}[]>

//============ PRODUCT =============//
export type CreateProductDto = z.infer<typeof CreateProductSchema>;

export type CreateProductRes = ApiResponseDto;
