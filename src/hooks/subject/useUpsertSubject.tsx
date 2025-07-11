import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateSubjectMutation, useGetListSubjectQuery, useUpdateSubjectMutation } from "_services/modules/subject";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { SubjectReqI, SubjectsFormsI, SubjectsI } from "_interfaces/subject.interfaces";
import { Params } from "_interfaces/class.interface";
import { toast } from "react-toastify";

const useSubjectForm = (searchParams : Params, handler?: () => void, id?: string) => {
  const [create, { isLoading }] = useCreateSubjectMutation();
  const [update, { isLoading: isLoadingUpdate }] = useUpdateSubjectMutation();

  const {data, refetch } = useGetListSubjectQuery(searchParams, {skip: !searchParams.page && !searchParams.limit});

  const navigate = useNavigate();

  const schema = yup
    .object({
      title: yup.string().required(), 
      group: yup.string().required(),
      status: yup.string().required(),
    }).required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    control,
  } = useForm<SubjectsFormsI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      status: "active"
    }
  });

  const _CreateSubject = async (data: SubjectsFormsI) => {
    try {
      const res = await create({...data, status: data.status === "active" ? true : false}).unwrap();
      if (res) {
        handler && handler();
        refetch();
        toast.success("Subject berhasil dibuat");
        reset({title: "", group: "", status: "active"});
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const _UpdateSubject = async (data: SubjectsFormsI) => {
    try {
      const res = await update({...data, id: id!, status: data.status === "active" ? true : false}).unwrap();
      if (res) {
        handler && handler();
        refetch();
        toast.success("Subject berhasil diperbarui");
        reset({ title: "", group: "", status: "active"});
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleCreate = handleSubmit(_CreateSubject);
  const handleUpdate = handleSubmit(_UpdateSubject);

  return { handleCreate, handleUpdate, register, errors, watch, isLoading, isLoadingUpdate, subjects: data, reset, control };
};

export default useSubjectForm;


