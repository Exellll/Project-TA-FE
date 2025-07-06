import React from "react";
import { FieldError, Controller } from "react-hook-form";
import ReactSelect from "react-select";

// Definisi Props untuk Dropdown Component
interface Props {
  label: string;
  name: string;
  options: { label: string; value: string }[]; // Tipe options dari OptionConverter
  placeholder: string;
  control: any; // Menggunakan control dari React Hook Form untuk mengelola nilai
  errors?: FieldError | string;
  className?: string; // Custom className untuk fleksibilitas
  defaultValue?: string; // Nilai default dari dropdown
  saveValueAsLabel?: boolean; // Menyimpan sebagai label atau value
}

const CDropdown: React.FC<Props> = ({
  label,
  name,
  options,
  placeholder,
  control,
  errors,
  className,
  defaultValue,
  saveValueAsLabel = false, // Default: menyimpan sebagai value
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue} // Mengatur nilai default dari Controller
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={options}
            defaultValue={options.find((option) =>
              saveValueAsLabel
                ? option.label === defaultValue
                : option.value === defaultValue
            )} // Mengatur default value untuk ReactSelect
            value={options.find((option) =>
              saveValueAsLabel
                ? option.label === field.value
                : option.value === field.value
            )} // Menemukan nilai yang sesuai agar tetap terlihat di UI
            placeholder={placeholder}
            classNamePrefix="react-select"
            getOptionValue={(option) => option.value} // Tetap gunakan value untuk opsi ReactSelect
            getOptionLabel={(option) => option.label}
            onChange={(selectedOption) =>
              field.onChange(
                selectedOption
                  ? saveValueAsLabel
                    ? selectedOption.label
                    : selectedOption.value
                  : null
              )
            } // Menyimpan label atau value sesuai prop
            styles={{
              control: (base) => ({
                ...base,
                borderColor: errors ? "red" : base.borderColor,
                "&:hover": {
                  borderColor: errors ? "red" : base.borderColor,
                },
                boxShadow: errors ? "0 0 0 1px red" : base.boxShadow,
                padding: "6px 6px",
                minHeight: "40px",
                borderRadius: "0.5rem",
              }),
              option: (provided) => ({
                ...provided,
                padding: 10,
              }),
            }}
          />
        )}
      />
      {errors && (
        <p className="text-red-500 text-xs mt-1">
          {typeof errors === "string" ? errors : errors.message}
        </p>
      )}
    </div>
  );
};

export default CDropdown;
