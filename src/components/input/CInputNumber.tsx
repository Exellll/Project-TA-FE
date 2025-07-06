import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import CInput from ".";

interface Props {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  errors?: string;
}

const CInputNumber: React.FC<Props> = ({ label, placeholder, register, errors }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <CInput
        type="number" // Hanya menerima input number
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

export default CInputNumber;
