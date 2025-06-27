import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS } from "@/constants";
import { handleStoreRequestError } from "@/utils";
export const useWalletStore = defineStore("wallet", () => {
  const pending_requests = ref<any>({});
  const dashboardStats = ref<any>({});

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

  const getDashboardStats = async (): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.WALLET + `/summary`);

      dashboardStats.value = data.payload;
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const topupWallet = async (customerId: string, payload: any): Promise<boolean> => {
    try {
      const { data } = await http.post(ENDPOINTS.WALLET_TOPUP(customerId), payload);
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  return {
    pending_requests,
    dashboardStats,
    topupWallet,
    getDashboardStats,
    fetchPendingRequest,
    approveDeclineRequest,
  };
});
