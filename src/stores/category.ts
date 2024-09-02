import { defineStore } from 'pinia'
import http from '@/lib/http'
import { ENDPOINTS } from '@/constants'
import {
  ApiResponseDto,
  CreateCategoryDto,
  CreateCategoryRes,
  FetchAllCategoryRes,
  FetchCategoryByIdRes,
  QueryFilter,
  UpdateCategoryDto,
} from '@/types'
import { handleStoreRequestError, openToastNotification } from '@/utils'

export const useCategoryStore = defineStore('category', {
  state: () => ({}),

  getters: {},

  actions: {
    async createCategory(payload: CreateCategoryDto) {
      try {
        const { data } = await http.post<CreateCategoryRes>(
          ENDPOINTS.CATEGORY,
          payload
        );
        return data;
      } catch (error) {
        handleStoreRequestError(error);
      }
    },
    async fetchAllCategories(params?: QueryFilter) {
      try {
        const { data } = await http.get<FetchAllCategoryRes>(
          ENDPOINTS.CATEGORY,
          { params }
        );
        return data.payload;
      } catch (error) {
        handleStoreRequestError(error);
      }
    },
    async fetchCategoryById(id: string) {
      try {
        const { data } = await http.get<FetchCategoryByIdRes>(
          ENDPOINTS.CATEGORIES_BY_ID(id)
        );
        if (!data.payload.category_id) {
          openToastNotification({
            message: 'Category Not Found',
            variant: 'error',
          });

          return;
        }

        return data.payload;
      } catch (error) {
        handleStoreRequestError(error);
      }
    },
    async updateCategory(payload: UpdateCategoryDto) {
      try {
        const { data } = await http.patch<ApiResponseDto>(
          ENDPOINTS.CATEGORY,
          payload
        );
        return data;
      } catch (error) {
        handleStoreRequestError(error);
      }
    },
    async deleteCategory(id: string) {
      try {
        const { data } = await http.delete<ApiResponseDto>(
          ENDPOINTS.CATEGORIES_BY_ID(id)
        );
        return data;
      } catch (error) {
        handleStoreRequestError(error);
      }
    }
  }
})
