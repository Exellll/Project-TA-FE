import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateTeacherMutation, useDeleteTeacherMutation, useGetListTeacherQuery, useUpdateTeacherMutation } from "_services/modules/teacher";
import { TeacherFormI, TeacherI } from "_interfaces/teachers.interfaces";
import { toast } from "react-toastify";
import { uploadFileLocal } from "_services/modules/file";

const useTeacherForm = (searchParams: Params, handler?: () => void, id?: string) => {
    const [create, { isLoading }] = useCreateTeacherMutation();
    const [update, { isLoading: isLoadingUpdate }] = useUpdateTeacherMutation();
    const [deleteTeacher, { isLoading: isLoadingDeleteTeacher }] = useDeleteTeacherMutation();

    const { data, refetch } = useGetListTeacherQuery(searchParams, { skip: !searchParams.page && !searchParams.limit });

    const navigate = useNavigate();

    const schema = yup
        .object({
            name: yup.string().required(),
            nip: yup.string().required(),
            email: yup.string().email().required(),
            no_telepon: yup.string().required(),
            address: yup.string().required(),
            gender: yup.string().required(),
            birth_date: yup.string().required(),
            foto_url: yup.string().url().required().optional(),
            status: yup.string().oneOf(["active", "inactive"]).required(),
            subject_ids: yup.array().of(yup.string()).min(1, "Wajib pilih minimal 1 mata pelajaran")
        }).required();

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
        reset,
        control,
        setValue,
    } = useForm<TeacherFormI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            nip: "",
            email: "",
            no_telepon: "",
            address: "",
            gender: "",
            birth_date: "",
            foto_url: "",
            status: "active",
            file: undefined,
            subject_ids: [],
        }
    });

    const _CreateTeacher = async (data: TeacherFormI) => {
        try {
            let foto_url = '';
            if (data.file) {
                foto_url = await uploadFileLocal(data.file);
                console.log("Attachment URL:", foto_url);
            }

            await create({
                name: data.name,
                nip: data.nip,
                email: data.email,
                no_telepon: data.no_telepon,
                address: data.address,
                gender: data.gender,
                birth_date: data.birth_date,
                foto_url,
                status: data.status === "active" ? true : false,
                subject_ids: data.subject_ids
            }).unwrap();

            handler && handler();
            toast.success("Guru berhasil dibuat");
            refetch();
            reset({});
        } catch (error) {
            errorHandler(error);
        }
    }

    const _UpdateTeacher = async (data: TeacherFormI) => {
        try {
            let foto_url = '';
            if (data.file) {
                foto_url = await uploadFileLocal(data.file);
                console.log("Attachment URL:", foto_url);
            }

            await create({
                name: data.name,
                nip: data.nip,
                email: data.email,
                no_telepon: data.no_telepon,
                address: data.address,
                gender: data.gender,
                birth_date: data.birth_date,
                foto_url,
                status: data.status === "active" ? true : false,
                subject_ids: data.subject_ids
            }).unwrap();

            handler && handler();
            toast.success("Guru berhasil dibuat");
            refetch();
            reset({});
        } catch (error) {
            errorHandler(error);
        }
    };

    const _DeleteTeacher = async (id: string) => {
        try {
            await deleteTeacher(id).unwrap();
            toast.success("Berhasil menghapus guru");
            refetch();
            handler?.();
        } catch (error) {
            errorHandler(error);
        }
    };

    const handleCreate = handleSubmit(_CreateTeacher);
    const handleUpdate = handleSubmit(_UpdateTeacher);
    const handleDelete = (id: string) => {
        _DeleteTeacher(id);
    };

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        register,
        errors,
        watch,
        isLoading,
        isLoadingUpdate,
        isLoadingDeleteTeacher,
        teacher: data,
        reset,
        control,
        setValue,
    }
}

export default useTeacherForm;
