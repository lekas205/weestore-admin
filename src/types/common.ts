export type ApiResponseDto<T = any> = {
  statusCode: number,
  message: string,
  payload: T
}

export interface ToastPayload {
  message: string;
  duration?: number;
  variant?: 'success' | 'info' | 'error' | 'warning' | 'default',
  position?:  'top-right'
  | 'top'
  | 'top-left'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
}
