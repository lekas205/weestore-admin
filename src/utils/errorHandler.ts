import { useAuthStore } from '@/stores'
import router from '@/router'
import { openToastNotification } from '@/utils'

export function handleStoreRequestError(error: any): any {
  let message = 'There was a problem processing your request';
  let errorObj: any = {};

  if (error.response) {
    const { status, data = {} } = error.response;
    errorObj = data.error?.length > 0 ? data.error[0] : {};

    if (status === 400) {
      message = errorObj.message || message;
    }
    else if (status === 401) {
      const isLoginPage = document.location.pathname.includes('/login');
      const authStore = useAuthStore();
      message = errorObj.message || message;
      authStore.removeSavedAuthToken();
      if (!isLoginPage) {
        openToastNotification({
          message: 'You are not logged in',
          variant: 'error'
        });
        router.push({ name: 'login' });
        return;
      }
    }

  } else if (error.request) {
    message = 'Network Error';
  }
  
  openToastNotification({
    message,
    variant: 'error'
  });

  return errorObj;
}
