import { useToast } from 'vue-toast-notification';
import { ToastPayload } from "@/types";

const toast = useToast();

export function openToastNotification({ message, duration, variant, position }: ToastPayload) {
  return toast.open({
    message,
    duration: duration ?? 3500,
    type: variant ?? 'success',
    position: position ?? 'top-right'
  });
}