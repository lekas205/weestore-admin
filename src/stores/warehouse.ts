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
  Warehouse,
  IState,
  FetchSatesRes
} from '@/types'
import { handleStoreRequestError } from '@/utils'

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    warehouseData: {} as FetchAllWarehouseRes,
    selectedWarehouse: {} as Warehouse,
    states: [] as IState[]
  }),

  getters: {
    warehouses: (state) => state.warehouseData.rows || [],
    warehousesPagination: (state) => state.warehouseData.paging,
  },

  actions: {
    async createWarehouse(payload: CreateWarehouseDto): Promise<boolean> {
      try {
        await http.post<CreateWarehouseRes>(
          ENDPOINTS.WAREHOUSE,
          payload
        );
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
    async fetchAllWarehouses(params?: QueryFilter): Promise<FetchAllWarehouseRes | null> {
      try {
        const { data } = await http.get<ApiResponseDto<FetchAllWarehouseRes>>(
          ENDPOINTS.WAREHOUSE,
          { params }
        );
        this.warehouseData = data.payload;
        return data.payload;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return  null;
    },
    async fetchStates(): Promise<IState[]> {
      try {
        const { data } = await http.get<FetchSatesRes>(
          ENDPOINTS.GET_STATES
        );
        this.states = data.payload;
        return data.payload;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return [];
    },
    async fetchWarehouseByState(stateId: string) {
      try {
        const { data } = await http.get<FetchWarehouseByStateRes>(
          ENDPOINTS.GET_WAREHOUSE_BY_STATE(stateId)
        );
        return data.payload;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return [];
    },
    async updateWarehouse(
      payload: Omit<UpdateWarehouseDto, 'id'>,
      id: string
    ): Promise<boolean> {
      try {
        await http.patch<ApiResponseDto>(
          ENDPOINTS.WAREHOUSE_BY_ID(id),
          payload
        );
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
  }
})
