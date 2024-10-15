import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { useExportStore } from "./export";

import { ENDPOINTS, STATE_PAYLOAD } from "@/constants";
import { handleStoreRequestError } from "@/utils";

export const useDashboardStore = defineStore("dashboard", () => {
  const exportStore = useExportStore();

  const sales_inflow = ref<any>({ ...STATE_PAYLOAD });
  const cash_inflow = ref<any>({ ...STATE_PAYLOAD });
  const cash_outflow = ref<any>({ ...STATE_PAYLOAD });
  const dashboardStats = ref<any>({});

  const fetchSalesInflow = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.DASHBOARD + `/salesinflow`, {
        params: { ...query },
      });
      const { paging, rows } = data.payload;

      if (query?.limit) {
        exportStore.storeData(rows);
        return true;
      }
      sales_inflow.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchCashInflow = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.DASHBOARD + `/cashinflow`, {
        params: { ...query },
      });
      const { paging, rows } = data.payload;

      if (query?.limit) {
        exportStore.storeData(rows);
        return true;
      }
      cash_inflow.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchCashOutflow = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.DASHBOARD + `/cashoutflow`, {
        params: { ...query },
      });
      const { paging, rows } = data.payload;

      if (query?.limit) {
        exportStore.storeData(rows);
        return true;
      }
      cash_outflow.value = {
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
      const { data } = await http.get(ENDPOINTS.DASHBOARD + `/summary`);

      dashboardStats.value = data.payload;
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  return {
    sales_inflow,
    cash_outflow,
    cash_inflow,
    dashboardStats,
    fetchCashInflow,
    getDashboardStats,
    fetchCashOutflow,
    fetchSalesInflow,
  };
});
