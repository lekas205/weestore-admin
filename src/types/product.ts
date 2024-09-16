import { z } from 'zod'
import {
  CreateCategorySchema,
  CreateProductSchema,
  CreateWarehouseSchema,
  UpdateCategorySchema,
  UpdateProductSchema,
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

export type FetchAllCategoryRes = ApiPagination<Category[]>;

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
  manager_name: string;
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

export type FetchAllWarehouseRes = ApiPagination<Warehouse[]>;

export type UpdateWarehouseDto = z.infer<typeof UpdateWarehouseSchema>;

export type WarehouseByState = {
  name: string;
  id: string;
}[];

export type FetchSatesRes = ApiResponseDto<IState[]>;

//============ PRODUCT =============//
export type CreateProductDto = z.infer<typeof CreateProductSchema>;

export type CreateProductRes = ApiResponseDto;

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;

export type Product = {
  product_id: string;
  warehouse_id: string;
  state_id: string;
  product_name: string;
  description: string;
  manufacturer: string;
  published: boolean;
  price: number;
  stock_quantity: number;
  quantity_bought: number;
  stamp_user: string | null;
  status: string;
  warehouse_name: string;
  category: string;
  category_id: string;
  images: {
    imageUrl: string;
    isPrimary: boolean
  }[];
  sizes: string[];
}

export type ProductMetrics = {
  product_id: string;
  warehouse_id: string;
  state_id: string;
  product_name: string;
  description: string;
  manufacturer: string;
  published: boolean;
  price: number;
  stock_quantity: number;
  quantity_bought: number;
  stamp_user: string | null;
  state: {
    code: string;
    name: string
  };
  warehouse_name: string;
  in_stock_value: number;
  out_stock_value: number;
  category: string;
}

export type FetchProductsRes = ApiResponseDto<ApiPagination<Product[]>>;
export type FetchProductMetricsRes = ApiResponseDto<ApiPagination<ProductMetrics[]>>;
