import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS } from "@/constants";
import { handleStoreRequestError } from "@/utils";
export const useDriverStore = defineStore("drivers", () => {
  const drivers = ref({});

  const fetchAllDrivers = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ALL_DRIVERS);
      const { paging, rows } = data.payload;
      drivers.value = {
        data: rows,
        pagination: paging,
      };
      console.log(data);

      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  return {
    drivers,
    fetchAllDrivers,
  };
});
