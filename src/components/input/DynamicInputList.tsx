// DynamicInputList.tsx
import React, { useState } from "react";
import { Control, FieldError, useFormContext } from "react-hook-form";
import CDropdown from "./CDropDown";
import CInputText from "./CInputText";
import { FaPlus, FaTrash } from "react-icons/fa";

interface InputOption {
  label: string;
  value: string;
}

interface DynamicInputListProps {
  control: Control<any>;
  name: string;
  label: string;
  options: InputOption[];
  errors?: (FieldError | undefined)[];
  placeholder?: string;
  type: "dropdown" | "text";
  className?: string;
  saveValueAsLabel?: boolean;
  defaultIdList?: string[]; // List nilai default berdasarkan id
  defaultLabelList?: string[]; // List nilai default berdasarkan label
}

const DynamicInputList: React.FC<DynamicInputListProps> = ({
  control,
  name,
  label,
  options,
  errors = [],
  placeholder = "Pilih opsi",
  type,
  className = "",
  saveValueAsLabel = true,
  defaultIdList = [],
  defaultLabelList = [],
}) => {
  const { setValue, getValues } = useFormContext(); // Dapatkan setValue dan getValues dari context
  const [inputs, setInputs] = useState(
    defaultIdList.length || defaultLabelList.length
      ? Array.from({ length: Math.max(defaultIdList.length, defaultLabelList.length) }).map(
          (_, index) => ({
            id: Math.random().toString(36).substring(7),
            defaultValue: saveValueAsLabel
              ? defaultLabelList[index] || ""
              : defaultIdList[index] || "",
          })
        )
      : [{ id: Math.random().toString(36).substring(7), defaultValue: "" }]
  );

  const handleAddInput = () => {
    const nextDefaultValue = saveValueAsLabel
      ? defaultLabelList[inputs.length] || ""
      : defaultIdList[inputs.length] || "";
    setInputs([
      ...inputs,
      {
        id: Math.random().toString(36).substring(7),
        defaultValue: nextDefaultValue,
      },
    ]);
  };

  const handleRemoveInput = (id: string, index: number) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);

    // Perbarui nilai di form jika setValue tersedia
    const currentValues = getValues(name) || [];
    currentValues.splice(index, 1); // Hapus nilai pada posisi yang sesuai
    setValue(name, currentValues); // Update nilai di React Hook Form
  };

  return (
    <div className={`relative p-4 border rounded-lg ${className}`}>
      {/* Container grid untuk dua kolom */}
      <div className="grid grid-cols-2 gap-6">
        {inputs.map((input, index) => (
          <div key={input.id} className="relative flex items-center space-x-4">
            {type === "dropdown" && (
              <CDropdown
                label={`${label} ${index + 1}`}
                name={`${name}[${index}]`}
                options={options}
                placeholder={placeholder}
                control={control}
                errors={errors ? errors[index]?.message : undefined}
                className="flex-grow"
                saveValueAsLabel={saveValueAsLabel}
                defaultValue={input.defaultValue}
              />
            )}
            {/* Ikon Hapus di sebelah kanan input */}
            <button
              type="button"
              onClick={() => handleRemoveInput(input.id, index)}
              className="absolute right-0 top-0 mt-2 mr-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      {/* Tombol Tambah dengan ikon di bagian bawah */}
      <button
        type="button"
        onClick={handleAddInput}
        className="flex items-center justify-center mt-4 text-blue-500 hover:text-blue-700"
      >
        <FaPlus className="mr-2" />
        Tambah {label}
      </button>
    </div>
  );
};

export default DynamicInputList;
