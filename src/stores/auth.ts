import { defineStore } from 'pinia'
import router from '@/router'
import http from '@/lib/http'
import { ENDPOINTS, SAVED_AUTH_TOKEN_KEY, ROUTES } from '@/constants'
import { LoginDto, LoginResDto } from '@/types'
import { handleStoreRequestError } from '@/utils'

export const useAuthStore = defineStore('auth', {
  state: () => ({ loader: false }),

  getters: {},

  actions: {
    toggleLoader(): void {
      this.loader = !this.loader;
    },

    async login(payload: LoginDto): Promise<boolean> {
      try {
        const { data } = await http.post<LoginResDto>(
          ENDPOINTS.LOGIN,
          payload
        );
        this.saveAuthToken(data.payload.access_token);
        return true;
      } catch (error) {
        handleStoreRequestError(error);
      }

      return false;
    },

    saveAuthToken(token: string): void {
      localStorage.setItem(SAVED_AUTH_TOKEN_KEY, token);
    },

    removeSavedAuthToken(): void {
      localStorage.removeItem(SAVED_AUTH_TOKEN_KEY);
    },

    logout(): void {
      const token = localStorage.getItem(SAVED_AUTH_TOKEN_KEY);
      http.request({
        url: ENDPOINTS.LOGOUT,
        method: 'get',
        headers: {'Authorization': `Bearer ${token}`},
      })
      .catch(e => console.log(e))
      this.removeSavedAuthToken();
      router.push({ name: ROUTES.login.name });
    },
  }
})
