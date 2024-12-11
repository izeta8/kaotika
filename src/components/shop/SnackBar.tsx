import React, { useEffect } from 'react';

interface SnackbarProps {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number; 
}

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity = 'info',
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  let bgColor;
//   switch (severity) {
//     case 'success':
//       bgColor = 'bg-darkSepia';
//       break;
//     case 'error':
//       bgColor = 'bg-red-500';
//       break;
//     case 'info':
//       bgColor = 'bg-blue-500';
//       break;
//     case 'warning':
//       bgColor = 'bg-yellow-500';
//       break;
//     default:
//       bgColor = 'bg-blue-500';
//   }

  return (
    <div
    className={`text-4xl fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center justify-between space-x-4`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span>{message}</span>
      <button onClick={onClose} className="text-white font-bold text-4xl">
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
