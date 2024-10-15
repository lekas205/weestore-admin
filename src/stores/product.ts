import { defineStore } from "pinia";
import http from "@/lib/http";
import { useExportStore } from "./export";

import { DEFAULT_PAGINATION, ENDPOINTS } from "@/constants";
import {
  ApiPagination,
  ApiResponseDto,
  CreateProductDto,
  CreateProductRes,
  FetchProductMetricsRes,
  FetchProductsRes,
  Pagination,
  Product,
  ProductMetrics,
  QueryFilter,
  UpdateProductDto,
} from "@/types";
import { handleStoreRequestError } from "@/utils";

interface State {
  productData: ApiPagination<Product[]> | null;
  productMetricsData: ApiPagination<ProductMetrics[]> | null;
  product: Product | null;
  selectedProduct: Product | null;
  exportStore: any;
}

export const useProductStore = defineStore("product", {
  state: (): State => ({
    productData: null,
    productMetricsData: null,
    product: null,
    selectedProduct: null,
    exportStore: useExportStore(),
  }),

  getters: {
    productList: (state): Product[] => state.productData?.rows || [],
    productMetricsList: (state): ProductMetrics[] =>
      state.productMetricsData?.rows || [],
    productPagination: (state): Pagination =>
      state.productData?.paging || DEFAULT_PAGINATION,
    productMetricsPagination: (state): Pagination =>
      state.productMetricsData?.paging || DEFAULT_PAGINATION,
  },

  actions: {
    async createProduct(payload: CreateProductDto): Promise<boolean> {
      try {
        await http.post<CreateProductRes>(ENDPOINTS.PRODUCT, payload);
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
    async fetchProducts(params?: QueryFilter): Promise<Product[]> {
      try {
        const { data }: any = await http.get<FetchProductsRes>(
          ENDPOINTS.PRODUCT,
          {
            params,
          }
        );

        if (params?.limit) {
          this.exportStore.storeData(data.payload.rows);
          return data.payload?.row;
        }
        this.productData = data.payload;
        return data.payload?.rows;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return [];
    },
    async fetchProductMetrics(params?: QueryFilter): Promise<ProductMetrics[]> {
      try {
        const { data }: any = await http.get<FetchProductMetricsRes>(
          ENDPOINTS.PRODUCT_METRICS,
          { params }
        );

        if (params?.limit) {
          this.exportStore.storeData(data.payload.rows);
          return data.payload?.row;
        }
        this.productMetricsData = data.payload;
        return data.payload?.rows;
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
        await http.get<ApiResponseDto>(ENDPOINTS.PUBLISH_PRODUCT(id));
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
    async unpublishProduct(id: string): Promise<boolean> {
      try {
        await http.get<ApiResponseDto>(ENDPOINTS.UNPUBLISH_PRODUCT(id));
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
  },
});
