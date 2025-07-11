import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreatePembimbingEkskulMutation, useDeletePembimbingEkskulMutation, useGetListPembimbingEkskulQuery, useUpdatePembimbingEkskulMutation } from "_services/modules/pembimbing-ekskul";
import { PembimbingI } from "_interfaces/pembimbing-ekskul.interfaces";
import { toast } from "react-toastify";


const usePembimbingEkskulForm = (searchParams: Params, handler?: () => void, id?: string) => {
    const [create, { isLoading }] = useCreatePembimbingEkskulMutation();
    const [update, { isLoading: isLoadingUpdate }] = useUpdatePembimbingEkskulMutation();
    const [deleteEkskul, { isLoading: isLoadingDeleteEkskul }] = useDeletePembimbingEkskulMutation();

    const { data, refetch } = useGetListPembimbingEkskulQuery(searchParams, { skip: !searchParams.page && !searchParams.limit });

    const navigate = useNavigate();

    const schema = yup
        .object({
            name: yup.string().required("Nama harus diisi"),
            no_telepon: yup.string().required("No telepon harus diisi").max(12, "No telepon maksimal 12 karakter"),
            address: yup.string().required("Alamat harus diisi"),
            ekskul_id: yup.string().required("Ekskul harus dipilih"),
        }).required();

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
        reset,
        control,
    } = useForm<PembimbingI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: {

        }
    });

    const _CreatePembimbingEkskul = async (data: PembimbingI) => {
        try {
            const res = await create({ ...data }).unwrap();
            if (res) {
                handler && handler();
                refetch();
                toast.success("Pembimbing ekskul berhasil dibuat");
                reset({});
            }
        } catch (error) {
            errorHandler(error);
        }
    };

    const _UpdatePembimbingEkskul = async (data: PembimbingI) => {
        try {
            const res = await update({ ...data, id: id! }).unwrap();
            if (res) {
                handler && handler();
                refetch();
                toast.update("Pembimbing ekskul berhasil diperbarui");   
                reset({});
            }
        } catch (error) {
            errorHandler(error);
        }
    };

    const _DeletePembimbingEkskul = async (id: string) => {
        try {
            const res = await deleteEkskul(id).unwrap();
            if (res) {
                refetch();
                toast.success("Pembimbing ekskul berhasil dihapus");
            }
        } catch (error) {
            errorHandler(error);
        }
    }

    const handleCreate = handleSubmit(_CreatePembimbingEkskul);
    const handleUpdate = handleSubmit(_UpdatePembimbingEkskul);
    const handleDelete = (id: string) => {
        _DeletePembimbingEkskul(id);
    };

    return { handleCreate, handleUpdate, handleDelete, register, errors, watch, isLoading, isLoadingUpdate, pembimbing: data, reset, control };
};

export default usePembimbingEkskulForm;