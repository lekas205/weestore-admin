import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS } from "@/constants";
import { handleStoreRequestError } from "@/utils";
export const useWalletStore = defineStore("wallet", () => {
  const pending_requests: any = ref({});

  const fetchPendingRequest = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.PENDING_TOPUP_REQUEST, {
        params: { ...query },
      });
      const { paging, rows } = data.payload;
      pending_requests.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const approveDeclineRequest = async (params?: any): Promise<boolean> => {
    try {
      const { data } = await http.put(
        ENDPOINTS.PENDING_TOPUP_REQUEST +
          `/${params.id}?action=${params.action}`
      );
      const { paging, rows } = data.payload;
      pending_requests.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  return {
    pending_requests,
    fetchPendingRequest,
    approveDeclineRequest,
  };
});
