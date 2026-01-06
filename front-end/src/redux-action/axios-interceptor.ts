import { AxiosInstance, AxiosError } from 'axios';
import showToast from '../common/utils/toast';

let hasShownUnauthorizedToast = false;

/**
 * Setup axios interceptor to handle 401 Unauthorized errors
 * This should be called once after the store is initialized
 */
export const setupAuthInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error: AxiosError<any>) => {
      // Check if error is 401 Unauthorized
      if (error.response && error.response.status === 401) {
        // Prevent multiple toasts from showing
        if (!hasShownUnauthorizedToast) {
          hasShownUnauthorizedToast = true;
          // Only redirect if user is not already on login or register page
          const currentPath = window.location.pathname;
          const isOnAuthPage = currentPath === '/auth/login' || currentPath === 
                               '/auth/register';

          if (!isOnAuthPage) {
            // Show toast notification
            showToast({
              title: 'Session Expired',
              description: 'Your session has expired. Please log in again.',
              status: 'warning',
              duration: 4000,
            });

            // Lazy import to avoid circular dependency
            const { default: store } = await import('./store');
            const { clearAuth } = await import('./slices/auth-slice');

            // Clear auth state
            store.dispatch(clearAuth());

            // Delay redirect slightly to allow toast to show
            setTimeout(() => {
              window.location.href = '/';
              // Reset flag after redirect
              hasShownUnauthorizedToast = false;
            }, 500);
          } else {
            // Reset flag immediately if we're staying on the auth page
            hasShownUnauthorizedToast = false;
          }
        }
      }

      return Promise.reject(error);
    }
  );
};

