import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/lib/http";
import { ENDPOINTS } from "@/constants";
import { handleStoreRequestError } from "@/utils";
export const useUserStore = defineStore("users", () => {
  const admins = ref<any>({});
  const admin_roles = ref<any>([]);

  const fetchAdmins= async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.ADMIN, {
        params: { ...query },
      });
      const { paging, rows } = data.payload;
      admins.value = {
        data: rows,
        pagination: paging,
      };
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const createAdmins = async (payload?: any): Promise<boolean> => {
    try {
      const { data } = await http.post(ENDPOINTS.ADMIN + '/register', {
        ...payload
      });
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const changeAdminsRole = async (params?: any): Promise<boolean> => {
    try {
      const { data } = await http.put(ENDPOINTS.ADMIN_ROLES + `/${params.roleId}/admin/${params.adminId}`);
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };

  const fetchAdminRoles = async (query?: any): Promise<boolean> => {
    try {
      const { data } = await http.get(ENDPOINTS.ADMIN_ROLES, {
        params: { ...query },
      });
      const { rows } = data.payload;
      admin_roles.value = rows
      console.log( admin_roles.value);
      return true;
    } catch (error) {
      handleStoreRequestError(error);
      return false;
    }
  };


  return {
    admins,
    admin_roles,
    fetchAdmins,
    createAdmins,
    fetchAdminRoles,
    changeAdminsRole,
  };
});
