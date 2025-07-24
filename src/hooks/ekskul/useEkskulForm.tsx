import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateEkskulMutation, useDeleteEkskulMutation, useGetListEkskulQuery, useUpdateEkskulMutation } from "_services/modules/ekskul";
import { EkskulFormsI, EkskulI } from "_interfaces/ekskul.interfaces";
import { toast } from "react-toastify";

const useEkskulForm = (searchParams : Params, handler?: () => void, id?: string) => {
  const [create, { isLoading }] = useCreateEkskulMutation();
  const [update, { isLoading: isLoadingUpdate }] = useUpdateEkskulMutation();
  const [deleteEkskul, { isLoading: isLoadingDeleteEkskul }] = useDeleteEkskulMutation();

  const {data, refetch } = useGetListEkskulQuery(searchParams, {skip: !searchParams.page && !searchParams.limit});

  const navigate = useNavigate();

  const schema = yup
    .object({
      name: yup.string().required(), 
      description: yup.string().required(),
      day: yup.string().required(),
      start_time: yup.string().required("Waktu mulai harus diisi"),
      end_time: yup.string().required("Waktu selesai harus diisi"),
      location: yup.string().required("Lokasi harus diisi"),
      capacity: yup.string().required("Kapasitas harus diisi"),
      status: yup.string().oneOf(["active", "inactive"]).required("Status harus diisi"),
    }).required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    control,
  } = useForm<EkskulFormsI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      
    }
  });

  const _CreateEkskul = async (data: EkskulFormsI) => {
    try {
      const res = await create({...data, status: data.status == "active" ? true : false}).unwrap();
      if (res) {
        handler && handler();
        refetch();
        toast.success("Ekskul berhasil dibuat");
        reset({ });
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const _UpdateEkskul = async (data: EkskulFormsI) => {
    try {
      const res = await update({...data, id: id!, status: data.status == "active" ? true : false}).unwrap();
      if (res) {
        handler && handler();
        refetch();
        toast.success("Ekskul berhasil diperbarui");
        reset({});
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const _DeleteEkskul = async (id: string) => {
    try {
      const res = await deleteEkskul(id).unwrap();
      if (res) {
        refetch();
        toast.success("Ekskul berhasil dihapus");
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  const handleCreate = handleSubmit(_CreateEkskul);
  const handleUpdate = handleSubmit(_UpdateEkskul);
  const handleDelete = (id: string) => {
    _DeleteEkskul(id);
  };

  return { handleCreate, handleUpdate, handleDelete, register, errors, watch, isLoading, isLoadingUpdate, ekskul: data, reset, control };
};

export default useEkskulForm;


