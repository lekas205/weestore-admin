import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS, STATE_PAYLOAD } from "@/constants";
import { handleStoreRequestError } from "@/utils";
export const useCreditStore = defineStore("credit", () => {
  const credit_request = ref({ ...STATE_PAYLOAD });

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

  //   const approveDeclineRequest = async (params?: any): Promise<boolean> => {
  //     try {
  //       const { data } = await http.put(
  //         ENDPOINTS.PENDING_TOPUP_REQUEST +
  //           `/${params.id}?action=${params.action}`
  //       );
  //       const { paging, rows } = data.payload;
  //       pending_requests.value = {
  //         data: rows,
  //         pagination: paging,
  //       };
  //       return true;
  //     } catch (error) {
  //       handleStoreRequestError(error);
  //       return false;
  //     }
  //   };

  return {
    credit_request,
    fetchCreditRequest,
    // approveDeclineRequest,
  };
});
