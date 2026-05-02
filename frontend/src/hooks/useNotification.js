import { useNotification as useNotificationContext } from '../contexts/NotificationContext';

const useNotification = () => {
  return useNotificationContext();
};

export default useNotification;
