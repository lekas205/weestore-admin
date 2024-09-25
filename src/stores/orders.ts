import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS, STATE_PAYLOAD } from "@/constants";
import { handleStoreRequestError } from "@/utils";
import { useStorage } from "@vueuse/core";
export const useOrderStore = defineStore("orders", () => {
  const new_orders = ref({
    ...STATE_PAYLOAD,
  });
  const dashboardStats = ref<any>({});
  const return_requests = ref({ ...STATE_PAYLOAD });
  const declined_orders = ref({ ...STATE_PAYLOAD });
  const returned_orders = ref({ ...STATE_PAYLOAD });

  const delivered_orders = ref({ ...STATE_PAYLOAD });
  const completed_orders = ref({ ...STATE_PAYLOAD });
  const declined_return_requests = ref({ ...STATE_PAYLOAD });
  const approved_return_requests = ref({ ...STATE_PAYLOAD });

  const orderDetails = ref<any>({});
  useStorage("order-details", orderDetails);

  const updateOrderDetails = (details: any) => {
    orderDetails.value = details;
  };
  const fetchNewOrders = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ORDERS + "/new", {
        params: {
          ...query,
        },
      });
      const { paging, rows } = data.payload;

      new_orders.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchDeliveredOrders = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ORDERS + "/delivered", {
        params: {
          ...query,
        },
      });
      const { paging, rows } = data.payload;

      delivered_orders.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchCompletedOrders = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ORDERS + "/completed", {
        params: {
          ...query,
        },
      });
      const { paging, rows } = data.payload;

      completed_orders.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchReturnedOrders = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ORDERS + "/returned", {
        params: {
          ...query,
        },
      });
      const { paging, rows } = data.payload;

      returned_orders.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchDeclinedOrders = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ORDERS + "/declined", {
        params: {
          ...query,
        },
      });
      const { paging, rows } = data.payload;

      declined_orders.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const updateOrderStatus = async (payload?: any): Promise<boolean> => {
    try {
      const { data } = await http.patch(
        ENDPOINTS.UPDATE_ORDER_STATUS(payload),
        {
          driverId: payload?.driverId,
        }
      );
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchReturnRequest = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(
        ENDPOINTS.GET_ORDERS + `/return/request`,
        {
          params: { ...query },
        }
      );
      const { paging, rows } = data.payload;

      return_requests.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchApprovedReturnRequest = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(
        ENDPOINTS.GET_ORDERS + `/return/request/approved`,
        {
          params: { ...query },
        }
      );
      const { paging, rows } = data.payload;

      approved_return_requests.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchDeclinedReturnRequest = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(
        ENDPOINTS.GET_ORDERS + `/return/request/declined`,
        {
          params: { ...query },
        }
      );
      const { paging, rows } = data.payload;

      declined_return_requests.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const getSingleOrder = async (id: string): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ORDERS + `/${id}`);
      orderDetails.value = data.payload;
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const initiateOrderReturn = async ({
    payload,
    ordeerId,
  }): Promise<boolean> => {
    try {
      const { data } = await http.post(
        ENDPOINTS.GET_ORDERS + `/${ordeerId}/return`,
        payload
      );
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const ApproveDeclineReturn = async ({
    action,
    requestId,
  }): Promise<boolean> => {
    try {
      const { data } = await http.put(
        ENDPOINTS.GET_ORDERS + `/return/request/${requestId}?action=${action}`
      );
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const getDashboardStats = async (): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ORDERS + `/summary`);

      dashboardStats.value = data.payload;
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  return {
    new_orders,
    orderDetails,
    fetchNewOrders,
    return_requests,
    completed_orders,
    delivered_orders,
    returned_orders,
    declined_orders,
    dashboardStats,
    declined_return_requests,
    approved_return_requests,
    getSingleOrder,
    getDashboardStats,
    fetchReturnRequest,
    updateOrderDetails,
    fetchReturnedOrders,
    fetchDeliveredOrders,
    fetchCompletedOrders,
    fetchDeclinedOrders,
    updateOrderStatus,
    initiateOrderReturn,
    ApproveDeclineReturn,
    fetchApprovedReturnRequest,
    fetchDeclinedReturnRequest,
  };
});
