import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateStudentTransactionMutation, useDeleteStudentTransactionMutation, useGetListStudentTransactionQuery, useUpdateStudentTransactionMutation } from "_services/modules/student-transaction";
import { StudentTransactionFormsI, StudentTransactionI, StudentTransactionParams } from "_interfaces/student-transaction.interfaces";

const useStudentTransactionForm = (searchParams: StudentTransactionParams, handler?: () => void, id?: string) => {
    const [create, { isLoading }] = useCreateStudentTransactionMutation();
    const [update, { isLoading: isLoadingUpdate }] = useUpdateStudentTransactionMutation();
    const [deleteTransaction, { isLoading: isLoadingDeleteTransaction }] = useDeleteStudentTransactionMutation();

    const { data, refetch } = useGetListStudentTransactionQuery(searchParams, { skip: !searchParams.page && !searchParams.limit });

    const navigate = useNavigate();

    const schema = yup
        .object({
            student_id: yup.string().required("ID Siswa harus diisi"),
            student_bill_id: yup.string().optional(),
            bukti_pembayaran: yup.string().required("Bukti pembayaran harus diisi"),
            payment_date: yup.string().required("Tanggal pembayaran harus diisi"),
            status: yup.string().required("Status harus diisi"),
        }).required();

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
        reset,
        control,
        setValue
    } = useForm<StudentTransactionFormsI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: {}
    });

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
            const res = await update({ ...data, id: id! }).unwrap();
            if (res) {
                handler && handler();
                refetch();
                reset({});
            }
        } catch (error) {
            errorHandler(error);
        }
    };

    const _DeleteStudentTransaction = async (id: string) => {
        try {
            const res = await deleteTransaction(id).unwrap();
            if (res) {
                handler && handler();
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
        errors,
        register,
        watch,
        reset,
        control,
        studentTransactions: data,
        isLoading,
        isLoadingUpdate,
        refetch,
        setValue,
    };
};

export default useStudentTransactionForm;