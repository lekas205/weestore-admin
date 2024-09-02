import { defineStore } from 'pinia'
import http from '@/lib/http'
import { ENDPOINTS } from '@/constants'
import {
  ApiResponseDto,
  CreateWarehouseDto,
  CreateWarehouseRes,
  FetchAllWarehouseRes,
  FetchWarehouseByStateRes,
  QueryFilter,
  UpdateWarehouseDto,
} from '@/types'
import { handleStoreRequestError } from '@/utils'

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({}),

  getters: {},

  actions: {
    async createWarehouse(payload: CreateWarehouseDto) {
      try {
        const { data } = await http.post<CreateWarehouseRes>(
          ENDPOINTS.WAREHOUSE,
          payload
        );
        return data;
      } catch (error) {
        handleStoreRequestError(error);
      }
    },
    async fetchAllWarehouses(params?: QueryFilter) {
      try {
        const { data } = await http.get<FetchAllWarehouseRes>(
          ENDPOINTS.WAREHOUSE,
          { params }
        );
        return data.payload;
      } catch (error) {
        handleStoreRequestError(error);
      }
    },
    async fetchStates(): Promise<[]> {
      try {
        const { data } = await http.get(ENDPOINTS.GET_STATES);
        return data.payload;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return [];
    },
    async fetchWarehouseByState(stateId: string) {
      try {
        const { data } = await http.get<FetchWarehouseByStateRes>(ENDPOINTS.GET_WAREHOUSE_BY_STATE(stateId));
        return data.payload;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return [];
    },
    async updateWarehouse(payload: UpdateWarehouseDto) {
      try {
        const { data } = await http.patch<ApiResponseDto>(
          ENDPOINTS.WAREHOUSE,
          payload
        );
        return data;
      } catch (error) {
        handleStoreRequestError(error);
      }
    },
  }
})
