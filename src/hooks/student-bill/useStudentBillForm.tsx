import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateStudentBillMutation, useDeleteStudentBillMutation, useGetListStudentBillQuery, useUpdateStudentBillMutation } from "_services/modules/student-bill";
import { StudentBillI } from "_interfaces/student-bill.interfaces";
import _ from "lodash";

const useStudentBillForm = (searchParams: Params, handler?: () => void, id?: string) => {
    const [create, { isLoading }] = useCreateStudentBillMutation();
    const [update, { isLoading: isLoadingUpdate }] = useUpdateStudentBillMutation();
    const [deleteBill, { isLoading: isLoadingDeleteBill }] = useDeleteStudentBillMutation();

    const { data, refetch } = useGetListStudentBillQuery(searchParams, { skip: !searchParams.page && !searchParams.limit });

    const navigate = useNavigate();

    const schema = yup
        .object({
            name: yup.string().required("Nama harus diisi"),
            type: yup.string().required("Tipe tagihan harus diisi"),
            due_date: yup.string().required("Tanggal jatuh tempo harus diisi"),
            bill_amount: yup.string().required("Jumlah tagihan harus diisi"),
        }).required();

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
        reset,
        control,
    } = useForm<StudentBillI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: {}
    });

    const _CreateStudentBill = async (data: StudentBillI) => {
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

    const _UpdateStudentBill = async (data: StudentBillI) => {
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

    const _DeleteStudentBill = async (id: string) => {
        try {
            const res = await deleteBill(id).unwrap();
            if (res) {
                handler && handler();
                refetch();
            }
        } catch (error) {
            errorHandler(error);
        }
    };

    const handleCreate = handleSubmit(_CreateStudentBill);
    const handleUpdate = handleSubmit(_UpdateStudentBill);
    const handleDelete = (id: string) => {
        _DeleteStudentBill(id);
    };

    return {
        handleSubmit,
        errors,
        register,
        watch,
        reset,
        control,
        handleCreate,
        handleUpdate,
        handleDelete,
        studentBills: data,
        isLoading,
        isLoadingUpdate,
        isLoadingDeleteBill
    };
};

export default useStudentBillForm;