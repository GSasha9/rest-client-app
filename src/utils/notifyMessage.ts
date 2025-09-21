import { toast } from 'react-toastify';

const successNotifyMessage = (message: string) => {
  toast.success(message, {
    position: 'bottom-center',
  });
};

const warningNotifyMessage = (message: string) => {
  toast.warn(message, {
    position: 'bottom-center',
  });
};

const errorNotifyMessage = (message: string) => {
  toast.error(message, {
    position: 'bottom-left',
  });
};

export { successNotifyMessage, errorNotifyMessage, warningNotifyMessage };
