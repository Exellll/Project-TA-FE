import React, { useState } from "react";
import { FieldError, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CInput from ".";

interface Props {
    label: string;
    register: UseFormRegisterReturn; // UseFormRegisterReturn dari React Hook Form
    setValue: UseFormSetValue<any>; // Untuk mengatur value dari React Hook Form
    name: string; // Nama field untuk setValue
    errors?: FieldError | string;
    className?: string; // Tambahkan className yang opsional
}

const CInputDatePicker: React.FC<Props> = ({ label, setValue, name, errors, className = '', register }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setValue(name, date, { shouldValidate: true }); // Set nilai tanggal di form
    };

    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <CInput
                type="date"
                {...register}
                className={`block w-full border ${errors ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors?.toString() && <p className="text-red-500 text-xs mt-1">{errors?.toString()}</p>} {/* Tampilkan pesan error */}
        </div>
    );
};

export default CInputDatePicker;
