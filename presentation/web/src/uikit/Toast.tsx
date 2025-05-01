import { addToast } from '@heroui/toast';
export { ToastProvider } from '@heroui/toast';

export const toast = {
  error: (message: string) =>
    addToast({ title: 'Error', description: message, color: 'danger' }),
  success: (message: string) =>
    addToast({ title: 'Success', description: message, color: 'success' }),
};
