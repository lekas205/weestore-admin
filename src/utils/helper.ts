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

export function formatAsMoney(amount: number, currency = true): string {
  try {
    const formattedAmount = new Intl.NumberFormat().format(amount);
    return currency ? `₦${formattedAmount}` : formattedAmount;
  } catch (error) {
    return currency ? `0.00` : `0`;
  }
}
