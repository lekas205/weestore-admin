import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS } from "@/constants";
import { handleStoreRequestError } from "@/utils";
export const useWithdrawalStore = defineStore("withdrawal", () => {
  const pending_requests = ref<any>({});
  const dashboardStats = ref<any>({});

  const fetchPendingRequest = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.WITHDRAWAL_REQUEST, {
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
        ENDPOINTS.WITHDRAWAL_REQUEST +
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
    dashboardStats,
    fetchPendingRequest,
    approveDeclineRequest
  };
});
