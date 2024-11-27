import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS, STATE_PAYLOAD } from "@/constants";
import { handleStoreRequestError } from "@/utils";
export const useCreditStore = defineStore("credit", () => {
  const dashboardStats = ref<any>({});
  const paid_request = ref({ ...STATE_PAYLOAD });
  const credit_request = ref({ ...STATE_PAYLOAD });
  const repayment_request = ref({ ...STATE_PAYLOAD });
  const approved_request = ref({ ...STATE_PAYLOAD });

  const fetchCreditRequest = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.PENDDNG_CREDIT_REQUEST, {
        params: { ...query },
      });
      const { paging, rows } = data.payload;
      credit_request.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchApprovedRequest = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.APPROVED_LOAN_REQUEST, {
        params: { ...query },
      });
      const { paging, rows } = data.payload;
      approved_request.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchPaidRequest = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.PAID_LOAN_REQUEST, {
        params: { ...query },
      });

      const { paging, rows } = data.payload;
      paid_request.value = {
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
        ENDPOINTS.PENDDNG_CREDIT_REQUEST +
          `/${params.id}?action=${params.action}`
      );
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchRepaymentRequests = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.LOAN_REPAYMENT_REQUEST, {
        params: { ...query },
      });

      const { paging, rows } = data.payload;
      repayment_request.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const approveDeclineRepaymentRequest = async (
    params?: any
  ): Promise<boolean> => {
    try {
      const { data } = await http.put(
        ENDPOINTS.LOAN_REPAYMENT_REQUEST +
          `/${params.id}?action=${params.action}`
      );
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const getDashboardStats = async (): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.CREDIT_REQUEST + `/summary`);

      dashboardStats.value = data.payload;
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  return {
    paid_request,
    credit_request,
    approved_request,
    repayment_request,
    dashboardStats,
    fetchCreditRequest,
    fetchPaidRequest,
    getDashboardStats,
    fetchApprovedRequest,
    approveDeclineRequest,
    fetchRepaymentRequests,
    approveDeclineRepaymentRequest,
  };
});
