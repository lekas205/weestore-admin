import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS, STATE_PAYLOAD } from "@/constants";
import { handleStoreRequestError } from "@/utils";
export const useCustomersStore = defineStore("customers", () => {
  const dashboardStats = ref<any>({});
  const customers: any = ref({ ...STATE_PAYLOAD });
  const custommerDetails = ref({ ...STATE_PAYLOAD });
  const unverifiedCustomers = ref({ ...STATE_PAYLOAD });

  const customerOrders = ref({ ...STATE_PAYLOAD });
  const customerTransactions = ref({ ...STATE_PAYLOAD });

  const fetchCustomers = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_CUSTOMERS, {
        params: { ...query },
      });

      const { paging, rows } = data.payload;
      customers.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const getSingleCustomer = async (id?: string): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_CUSTOMERS + `/${id}`);
      custommerDetails.value = data.payload;
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const updateCustomer = async ({
    customerId,
    payload,
  }: {
    customerId: string;
    payload: any;
  }): Promise<boolean> => {
    try {
      await http.patch(ENDPOINTS.GET_CUSTOMERS + `/${customerId}`, payload);
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const getCustomerTransactions = async ({
    customerId,
    query,
  }: {
    customerId: string;
    query?: any;
  }): Promise<boolean> => {
    try {
      const { data } = await http.get(
        ENDPOINTS.GET_CUSTOMERS + `/${customerId}/transactions`,
        {
          params: { ...query },
        }
      );

      const { paging, rows } = data.payload;
      customerTransactions.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const getCustomerOrders = async ({
    customerId,
    query,
  }: {
    customerId: string;
    query?: any;
  }): Promise<boolean> => {
    try {
      const { data } = await http.get(
        ENDPOINTS.GET_CUSTOMERS + `/${customerId}/orders`,
        {
          params: { ...query },
        }
      );

      const { paging, rows } = data.payload;
      customerOrders.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const verifyCustomer = async (id?: string): Promise<boolean> => {
    try {
      await http.patch(ENDPOINTS.GET_CUSTOMERS + `/${id}/verify`);
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const getUnverifiedCustomer = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_CUSTOMERS + `/unverified`, {
        params: {
          ...query,
        },
      });

      const { paging, rows } = data.payload;
      unverifiedCustomers.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const deleteCustomer = async (id: string): Promise<boolean> => {
    try {
      const { data } = await http.delete(ENDPOINTS.GET_CUSTOMERS + `/${id}`);
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const getDashboardStats = async (): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_CUSTOMERS + `/summary`);

      dashboardStats.value = data.payload;
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  return {
    customers,
    fetchCustomers,
    verifyCustomer,
    updateCustomer,
    dashboardStats,
    deleteCustomer,
    custommerDetails,
    customerOrders,
    customerTransactions,
    getCustomerOrders,
    getSingleCustomer,
    getDashboardStats,
    unverifiedCustomers,
    getUnverifiedCustomer,
    getCustomerTransactions,
  };
});
