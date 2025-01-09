import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { useExportStore } from "./export";
import { ENDPOINTS, STATE_PAYLOAD } from "@/constants";
import { handleStoreRequestError } from "@/utils";

export const useDriverStore = defineStore("drivers", () => {
  const exportStore = useExportStore();

  const drivers = ref({ ...STATE_PAYLOAD });
  const declined_orders = ref({ ...STATE_PAYLOAD });
  const completed_orders = ref({ ...STATE_PAYLOAD });
  const in_transit_orders = ref({ ...STATE_PAYLOAD });
  const singleOrder = ref({});

  const fetchAllDrivers = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_DRIVERS, {
        params: {
          ...query,
        },
      });
      const { paging, rows } = data.payload;
      if (query?.limit) {
        exportStore.storeData(rows);
        return true;
      }
      drivers.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      console.log(error);

      handleStoreRequestError(error);
      return false;
    }
  };

  const createDriver = async (payload: any): Promise<boolean | any> => {
    try {
      const { data } = await http.post(ENDPOINTS.GET_DRIVERS, payload);
      return data;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const updateDriver = async ({ payload, driverId }: any): Promise<boolean> => {
    try {
      const { data } = await http.put(
        ENDPOINTS.GET_DRIVERS + `/${driverId}`,
        payload
      );
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const deleteDriver = async (driverIds: any[]): Promise<boolean> => {
    try {
      const { data } = await http.delete(ENDPOINTS.GET_DRIVERS, {
        data: { drivers: driverIds },
      });
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchOrderById = async (id: any): Promise<any> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_DRIVERS + `/order/${id}`);

      singleOrder.value = data.payload;
      return data.payload;
    } catch (error) {
      handleStoreRequestError(error);
      return null;
    }
  };

  const fetchInTransitOrders = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_DRIVERS + "/order/new", {
        params: {
          ...query,
        },
      });

      const { paging, rows } = data.payload;

      if (query?.limit) {
        exportStore.storeData(rows);
        return true;
      }
      in_transit_orders.value = {
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
      const { data } = await http.get(
        ENDPOINTS.GET_DRIVERS + "/order/completed",
        {
          params: {
            ...query,
          },
        }
      );
      const { paging, rows } = data.payload;

      if (query?.limit) {
        exportStore.storeData(rows);
        return true;
      }
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

  const fetchDeclinedOrders = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(
        ENDPOINTS.GET_DRIVERS + "/order/declined",
        {
          params: {
            ...query,
          },
        }
      );
      const { paging, rows } = data.payload;

      if (query?.limit) {
        exportStore.storeData(rows);
        return true;
      }
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
        ENDPOINTS.UPDATE_DRIVER_ORDER_STATUS(payload)
      );
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  return {
    drivers,
    declined_orders,
    completed_orders,
    in_transit_orders,
    fetchAllDrivers,
    createDriver,
    updateDriver,
    deleteDriver,
    updateOrderStatus,
    fetchCompletedOrders,
    fetchInTransitOrders,
    fetchDeclinedOrders,
    fetchOrderById,
  };
});
