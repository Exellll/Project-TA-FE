  import React from "react";
  import { UseFormRegisterReturn } from "react-hook-form";
import CInput from ".";

  interface Props {
    label: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    errors?: string;
    type?: "text" | "email" | "password"; // Tipe input yang relevan dengan string
    className?: string; // Tambahkan className opsional
  }

  const CInputText: React.FC<Props> = ({
    label,
    placeholder,
    register,
    errors,
    type = "text",
    className = "" // Default className kosong
  }) => {
    return (
      <div className={`mb-4 ${className}`}>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <CInput
          type={type ?? "text"}
          className={`w-full bg-gray-100 border ${
            errors ? 'border-red-500' : 'border-gray-300'
          } p-2 rounded-lg font-semibold text-sm focus:outline-none focus:border-blue-600 transition duration-300`}
          
          placeholder={placeholder}
          {...register}
        />
        {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
      </div>
    );
  };

  export default CInputText;
