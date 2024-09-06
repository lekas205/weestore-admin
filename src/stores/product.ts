import { defineStore } from 'pinia'
import http from '@/lib/http'
import { DEFAULT_PAGINATION, ENDPOINTS } from '@/constants'
import {
  ApiPagination,
  ApiResponseDto,
  CreateProductDto,
  CreateProductRes,
  FetchProductsRes,
  Pagination,
  Product,
  QueryFilter,
  UpdateProductDto
} from '@/types'
import { handleStoreRequestError } from '@/utils'

interface State {
  productData: ApiPagination<Product[]> | null;
  product: Product | null;
  selectedProduct: Product | null;
}

export const useProductStore = defineStore('product', {
  state: (): State => ({
    productData: null,
    product: null,
    selectedProduct: null,
  }),

  getters: {
    productList: (state): Product[] => state.productData?.rows || [],
    productPagination: (state): Pagination => state.productData?.paging || DEFAULT_PAGINATION,
  },

  actions: {
    async createProduct(payload: CreateProductDto): Promise<boolean> {
      try {
        await http.post<CreateProductRes>(
          ENDPOINTS.PRODUCT,
          payload
        );
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
    async fetchProducts(params?: QueryFilter): Promise<Product[]> {
      try {
        const { data } = await http.get<FetchProductsRes>(
          ENDPOINTS.PRODUCT,
          { params }
        );
        this.productData = data.payload;
        return data.payload.rows;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return [];
    },
    async fetchProductById(id: string): Promise<Product | null> {
      try {
        const { data } = await http.get<ApiResponseDto<Product>>(
          ENDPOINTS.PRODUCT_BY_ID(id)
        );
        this.product = data.payload;
        return data.payload;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return null;
    },
    async updateProduct(payload: UpdateProductDto): Promise<boolean> {
      try {
        await http.patch<ApiResponseDto>(ENDPOINTS.PRODUCT, payload);
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
    async publishProduct(id: string): Promise<boolean> {
      try {
        await http.get<ApiResponseDto>(
          ENDPOINTS.PUBLISH_PRODUCT(id)
        );
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
    async unpublishProduct(id: string): Promise<boolean> {
      try {
        await http.get<ApiResponseDto>(
          ENDPOINTS.UNPUBLISH_PRODUCT(id)
        );
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
  }
})
