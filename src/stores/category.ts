import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS } from "@/constants";
import { useExportStore } from "./export";

import {
  ApiResponseDto,
  Category,
  CreateCategoryDto,
  CreateCategoryRes,
  FetchAllCategoryRes,
  FetchCategoryByIdRes,
  QueryFilter,
  UpdateCategoryDto,
} from "@/types";
import { handleStoreRequestError, openToastNotification } from "@/utils";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categoriesData: {} as FetchAllCategoryRes,
    selectedCategory: {} as Category,
    exportStore: useExportStore(),
  }),

  getters: {
    categories: (state) => state.categoriesData.rows || [],
    categoriesPagination: (state) => state.categoriesData.paging,
  },

  actions: {
    async createCategory(payload: CreateCategoryDto): Promise<boolean> {
      try {
        await http.post<CreateCategoryRes>(ENDPOINTS.CATEGORY, payload);
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
    async fetchAllCategories(params?: QueryFilter): Promise<Category[]> {
      try {
        const { data } = await http.get<ApiResponseDto<FetchAllCategoryRes>>(
          ENDPOINTS.CATEGORY,
          { params }
        );

        if (params?.limit) {
          this.exportStore.storeData(data.payload.rows);
          return data.payload.rows;
        }
        this.categoriesData = data.payload;
        return data.payload.rows;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return [];
    },
    async fetchCategoryById(id: string) {
      try {
        const { data } = await http.get<FetchCategoryByIdRes>(
          ENDPOINTS.CATEGORY_BY_ID(id)
        );
        if (!data.payload.category_id) {
          openToastNotification({
            message: "Category Not Found",
            variant: "error",
          });

          return;
        }

        return data.payload;
      } catch (error) {
        handleStoreRequestError(error);
      }
    },
    async updateCategory(
      payload: Omit<UpdateCategoryDto, "id">,
      id: string
    ): Promise<boolean> {
      try {
        await http.patch<ApiResponseDto>(ENDPOINTS.CATEGORY_BY_ID(id), payload);
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
    async deleteCategory(id: string): Promise<boolean> {
      try {
        await http.delete<ApiResponseDto>(ENDPOINTS.CATEGORY_BY_ID(id));
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
  },
});
