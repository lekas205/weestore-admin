import { defineStore } from 'pinia'
import http from '@/lib/http'
import { ENDPOINTS } from '@/constants'
import { CreateProductDto, CreateProductRes } from '@/types'
import { handleStoreRequestError } from '@/utils'

export const useProductStore = defineStore('product', {
  state: () => ({ }),

  getters: {},

  actions: {
    async createProduct(payload: CreateProductDto): Promise<boolean> {
      try {
        const { data } = await http.post<CreateProductRes>(
          ENDPOINTS.PRODUCT,
          payload
        );
        console.log(data)
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },
  }
})
