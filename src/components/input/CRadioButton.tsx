import React from "react";
import { FieldError } from "react-hook-form";

interface Props {
  label: string;
  options: string[];
  register: any;
  errors?: FieldError | undefined;
  className?: string; // Menambahkan custom className
}

const CRadioButton: React.FC<Props> = ({ label, options, register, errors, className }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {options.map((option, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="radio"
            value={option}
            className="mr-2"
            {...register}
          />
          <span className="text-sm">{option}</span>
        </div>
      ))}
      {errors?.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
    </div>
  );
};

export default CRadioButton;
