// components/shop/SnackBar.tsx

import React, { useEffect } from 'react';
import Image from 'next/image'; // Importa el componente Image de Next.js

interface SnackbarProps {
  open: boolean;
  message: string;
  product?: {
    name: string;
    image: string;
  };
  severity?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  product,
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

  return (
    <>
      <div
        className={`snackbar fixed top-25 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center justify-between space-x-4 animate-fade-in-out`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {product ? (
          <Image
            src={product.image}
            alt={product.name}
            width={52}
            height={52}
            className="object-cover rounded mr-4"
            draggable={false}
          />
        ) : null}
        <span className="message">{message}</span>
        <button onClick={onClose} className="close-button text-white font-bold text-2xl focus:outline-none">
          &times;
        </button>
      </div>
      <style jsx>{`
        @keyframes fade-in-out {
          0% {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          10% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          90% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
        }

        .animate-fade-in-out {
          animation: fade-in-out 4s forwards;
        }

        .snackbar {
          max-width: 300px;
          width: 90%;
          background-color: rgba(23, 24, 28, 0.95); 
        }

        .message {
          flex: 1;
          font-size: 40px;
          text-align: center; /* Center the text horizontally */
          align-self: center; /* Center the text vertically */
        }

        .close-button {
          margin-left: 1rem;
        }

        /* Responsividad */
        @media (max-width: 600px) {
          .snackbar {
            width: 95%;
            padding: 1rem;
          }

          .message {
            font-size: 1rem;
          }

          .close-button {
            font-size: 2rem;
          }

          .product-image {
            width: 2.5rem;
            height: 2.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Snackbar;




