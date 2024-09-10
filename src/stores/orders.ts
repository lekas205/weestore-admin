import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS } from "@/constants";
import { handleStoreRequestError } from "@/utils";
import { useStorage } from "@vueuse/core";
export const useOrderStore = defineStore("orders", () => {
  const new_orders = ref({});
  const declined_orders = ref({});
  const returned_orders = ref({});
  const delivered_orders = ref({});
  const completed_orders = ref({});

  const orderDetails = ref({});
  useStorage("order-details", orderDetails);

  const updateOrderDetails = (details: any) => {
    orderDetails.value = details;
  };
  const fetchNewOrders = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_NEW_ORDERS(query));
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
      const { data } = await http.get(ENDPOINTS.GET_DELIVERED_ORDERS(query));
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
      const { data } = await http.get(ENDPOINTS.GET_COMPLETED_RDERS(query));
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
      const { data } = await http.get(ENDPOINTS.GET_RETURNED_RDERS(query));
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
      const { data } = await http.get(ENDPOINTS.GET_RETURNED_RDERS(query));
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
      const { data } = await http.patch(ENDPOINTS.UPDATE_ORDER_STATUS(payload));
      return true;
    } catch (error) {
      console.log(error);

      handleStoreRequestError(error);
      return false;
    }
  };

  return {
    new_orders,
    orderDetails,
    fetchNewOrders,
    completed_orders,
    delivered_orders,
    returned_orders,
    declined_orders,
    updateOrderDetails,
    fetchReturnedOrders,
    fetchDeliveredOrders,
    fetchCompletedOrders,
    fetchDeclinedOrders,
    updateOrderStatus,
  };
});
