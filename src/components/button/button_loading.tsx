import React from 'react';

// Button component dengan loading dan customization
interface ButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string; // Tambahan custom className
}

const ButtonLoading: React.FC<ButtonProps> = ({
  isLoading = false,
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '' // Default ke string kosong jika tidak ada custom className
}) => {
  // Class yang fleksibel untuk style
  const baseClass = "flex items-center justify-center font-semibold rounded focus:outline-none rounded-lg transition-colors duration-200";
  const variantClass = {
    primary: "bg-blue-700 text-white hover:bg-blue-800",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };
  const sizeClass = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg"
  };

  // Handler untuk menghindari double click
  const handleClick = () => {
    if (!isLoading && !disabled) {
      onClick(); // Hanya panggil jika tombol tidak loading dan tidak disabled
      disabled = true;
    }
  };

  return (
    <button
      className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${className} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span> // DaisyUI class untuk spinner
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonLoading;
