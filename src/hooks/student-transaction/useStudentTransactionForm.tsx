import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateStudentTransactionMutation, useDeleteStudentTransactionMutation, useGetListStudentTransactionQuery, useUpdateStudentTransactionMutation, usePayStudentTransactionMutation, useVerifyStudentTransactionMutation } from "_services/modules/student-transaction";
import { StudentTransactionFormsI, StudentTransactionI, StudentTransactionParams } from "_interfaces/student-transaction.interfaces";
import { uploadFileST } from "_services/modules/file";
import { toast } from "react-toastify";
import { on } from "events";

const useStudentTransactionForm = (searchParams: StudentTransactionParams, onSuccess?: () => void, handler?: () => void, id?: string) => {
    const [create, { isLoading }] = useCreateStudentTransactionMutation();
    const [update, { isLoading: isLoadingUpdate }] = useUpdateStudentTransactionMutation();
    const [deleteTransaction, { isLoading: isLoadingDeleteTransaction }] = useDeleteStudentTransactionMutation();
    const [payStudentTransaction, { isLoading: isLoadingPay }] = usePayStudentTransactionMutation();
    const [verifyStudentTransaction, { isLoading: isLoadingVerif }] = useVerifyStudentTransactionMutation();

    const { data, refetch } = useGetListStudentTransactionQuery(searchParams, { skip: !searchParams.page && !searchParams.limit });

    const validFileExtensions = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    const maxFileSize = 2 * 1024 * 1024;

    const schema = yup
        .object({
            file: yup
                .mixed<File>()
                .nullable()
                .test(
                    "fileType",
                    "Format file tidak valid, hanya mendukung jpeg, jpg, png dan pdf",
                    (value) => !value || (value && validFileExtensions.includes(value.type))
                ).test(
                    "fileSize",
                    "Ukuran file terlalu besar, maksimal 2MB",
                    (value) => !value || (value && value.size <= maxFileSize)
                ).when("type", { is: "file", then: yup.mixed<File>().required("File is required") }),
        }).required();

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
        reset,
        control,
        setValue,
        setError,
        clearErrors,
    } = useForm<StudentTransactionFormsI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: {
            file: null,
        }
    });

    const handleFileChange = (key: string, file: File | null) => {
        const name = key as 'file';
        if (!file) {
            setError(name, { type: "manual", message: "File wajib diunggah" });
        } else if (file.size > maxFileSize) {
            setError(name, { type: "manual", message: "Ukuran file terlalu besar, maksimal 2MB" });
        } else if (!validFileExtensions.includes(file.type)) {
            setError(name, { type: "manual", message: "Format file tidak valid" });
        } else {
            clearErrors(name); // Clear any existing errors once the file is valid
        }
        setValue(name, file);
    };

    const _CreateStudentTransaction = async (data: StudentTransactionFormsI) => {
        try {
            const res = await create({ ...data }).unwrap();
            if (res) {
                handler && handler();
                refetch();
                reset({});
            }
        } catch (error) {
            errorHandler(error);
        }
    };

    const _UpdateStudentTransaction = async (data: StudentTransactionFormsI) => {
        try {
            // Upload file dulu
            const file = data.file;
            let uploadedUrl = "";

            if (file) {
                uploadedUrl = await uploadFileST(file); // ← upload ke server lokal
                console.log("Uploaded URL:", uploadedUrl);
            } else {
                throw new Error("File tidak ditemukan");
            }

            const payload = {
                id: id,
                bukti_pembayaran: uploadedUrl,
                payment_date: data.payment_date || new Date().toISOString(),
            };

            const res = await payStudentTransaction({ ...payload, id }).unwrap();

            if (res) {
                handler && handler();
                onSuccess && onSuccess();
                toast.success("Pembayaran tagihan siswa berhasil");
                reset({});
            }
        } catch (error: any) {
            console.log("PAY ERROR:", error);
            errorHandler(error);
        }
    };

    const handleVerify = async (id: string) => {
        try {
            await verifyStudentTransaction(id).unwrap();
            onSuccess && onSuccess();
            toast.success("Pembayaran berhasil diverifikasi");
        } catch (error) {
            toast.error("Gagal verifikasi pembayaran");
            console.error(error);
        }
    };

    const _DeleteStudentTransaction = async (id: string) => {
        try {
            const res = await deleteTransaction(id).unwrap();
            if (res) {
                refetch();
            }
        } catch (error) {
            errorHandler(error);
        }
    };

    const handleCreate = handleSubmit(_CreateStudentTransaction);
    const handleUpdate = handleSubmit(_UpdateStudentTransaction);
    const handleDelete = (id: string) => {
        _DeleteStudentTransaction(id);
    };

    return {
        handleSubmit,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleFileChange,
        handleVerify,
        errors,
        register,
        watch,
        reset,
        control,
        studentTransactions: data,
        isLoading,
        isLoadingUpdate,
        isLoadingPay,
        isLoadingVerif,
        refetch,
        setValue,
    };
};

export default useStudentTransactionForm;