import React, { useEffect, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FaPaperclip, FaCheckCircle } from "react-icons/fa";

interface Props {
    label: string;
    id?: string; // Prop opsional untuk mengatur id
    onChange: (key: string, file: File | null) => void;
    register: UseFormRegisterReturn;
    errors?: FieldError | string;
    icon?: React.ReactElement;
    defaultFileName?: string; // Menambahkan prop untuk default file name
}

const CUploadFile: React.FC<Props> = ({ label, id, onChange, register, errors, icon, defaultFileName }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(defaultFileName || null);

    // Update uploadedFileName ketika defaultFileName berubah
    useEffect(() => {
        if (defaultFileName) {
            setUploadedFileName(defaultFileName);
        }
    }, [defaultFileName]);

    // Handle drag events
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0] || null;
        if (file) {
            setUploadedFileName(file.name);
            onChange(id ?? "1", file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setUploadedFileName(file.name);
            onChange(id ?? "1", file);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={id || "file-upload"}>
                {label}
            </label>
            <div
                className={`relative border-2 border-dashed p-4 rounded-lg ${isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    } ${errors ? "border-red-500" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id={id || "file-upload"}
                    className="hidden"
                    {...register}
                    onChange={handleFileChange}
                />
                <label
                    htmlFor={id || "file-upload"}
                    className={`flex items-center justify-start bg-blue-700 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-500 transition-all duration-300 text-sm font-medium ${errors ? "border-red-500" : ""
                        }`}
                    style={{ height: "40px" }}
                >
                    <div className="ml-2">{icon || <FaPaperclip className="mr-2" />}</div>
                    <div className="ml-2">{uploadedFileName ?? "Choose File!"}</div>
                </label>
                {errors?.toString() && (
                    <p className="text-red-500 text-xs mt-1">{errors.toString()}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">Drag and drop file here, or click to select file</p>

                {uploadedFileName && (
                    <div className="mt-2 flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">{uploadedFileName}</span>
                    </div>
                )}
            </div>
        </div>
    );
}; 

export default CUploadFile;
