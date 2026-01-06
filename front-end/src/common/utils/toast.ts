import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

interface ToastOptions {
  title: string;
  description?: string;
  status?: 'info' | 'warning' | 'success' | 'error';
  duration?: number;
  isClosable?: boolean;
  position?: string;
}

const showToast = (options: ToastOptions) => {
  toast({
    id: 'custom-toast',
    title: options.title,
    description: options.description,
    status: options.status || 'info',
    duration: options.duration || 4000,
    isClosable: options.isClosable !== false,
    position: (options.position as any) || 'top-right',
  });
};

export default showToast;

