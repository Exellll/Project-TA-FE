import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateBillsByClassIdMutation, useCreateStudentBillMutation, useDeleteStudentBillMutation, useGetListStudentBillQuery, useUpdateStudentBillMutation } from "_services/modules/student-bill";
import { CreateStudentBillByClassI, StudentBillFormI, StudentBillI } from "_interfaces/student-bill.interfaces";
import _ from "lodash";
import { toast } from "react-toastify";

const useStudentBillForm = (searchParams: Params, handler?: () => void, id?: string) => {
    const [create, { isLoading }] = useCreateStudentBillMutation();
    const [update, { isLoading: isLoadingUpdate }] = useUpdateStudentBillMutation();
    const [deleteBill, { isLoading: isLoadingDeleteBill }] = useDeleteStudentBillMutation();
    const [createByClass, { isLoading: isLoadingCreateByClass }] = useCreateBillsByClassIdMutation();

    const { data, refetch } = useGetListStudentBillQuery(searchParams, { skip: !searchParams.page && !searchParams.limit });

    const navigate = useNavigate();

    const schema = yup
        .object({
            student_id: yup.string().optional(),
            class_id: yup.string().optional(),
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
    } = useForm<StudentBillFormI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: {
            student_id: "",
            type: "",
            due_date: "",
            bill_amount: "",
        }
    });

    const _CreateStudentBill = async (data: StudentBillFormI) => {
        try {
            const res = await create({ ...data }).unwrap();
            if (res) {
                handler && handler();
                refetch();
                toast.success("Tagihan siswa berhasil dibuat");
                reset({ student_id: "", type: "", due_date: "", bill_amount: "" });
            }
        } catch (error) {
            errorHandler(error);
        }
    };

    const _CreateStudentBillByClass = async (data: StudentBillFormI) => {
        try {
            const payload: CreateStudentBillByClassI = {
                class_id: data.class_id, // karena name di form tetap student_id
                type: data.type,
                due_date: data.due_date,
                bill_amount: data.bill_amount,
            };
            await createByClass(payload).unwrap();
            handler && handler();
            refetch();
            toast.success("Tagihan berhasil dibuat untuk semua siswa di kelas");
            reset({ student_id: "", type: "", due_date: "", bill_amount: "" });
        } catch (error) {
            errorHandler(error);
        }
    };

    const _UpdateStudentBill = async (data: StudentBillFormI) => {
        try {
            const res = await update({ ...data, id: id! }).unwrap();
            if (res) {
                handler && handler();
                refetch();
                toast.update("Tagihan siswa berhasil diperbarui");
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
                toast.success("Tagihan siswa berhasil dihapus");
            }
        } catch (error) {
            errorHandler(error);
        }
    };

    const handleCreate = handleSubmit(_CreateStudentBill);
    const handleUpdate = handleSubmit(_UpdateStudentBill);
    const handleCreateByClass = handleSubmit(_CreateStudentBillByClass);
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
        handleCreateByClass,
        studentBills: data,
        isLoading,
        isLoadingUpdate,
        isLoadingDeleteBill,
        isLoadingCreateByClass,
    };
};

export default useStudentBillForm;