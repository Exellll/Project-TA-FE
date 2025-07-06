import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define types for the toast parameters
type ToastType = 'success' | 'failed' | 'warning';

interface ToastProps {
  title: string;
  description: string;
  type: ToastType;
}

export const CustomShowToast = ({ title, description, type }: ToastProps) => {
  // Default Toast options
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  // Define custom content
  const CustomToastContent = (
    <div>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );

  // Display toast based on type
  switch (type) {
    case 'success':
      toast.success(CustomToastContent, options);
      break;
    case 'failed':
      toast.error(CustomToastContent, options);
      break;
    case 'warning':
      toast.warning(CustomToastContent, options);
      break;
    default:
      toast(CustomToastContent, options);
      break;
  }
};
