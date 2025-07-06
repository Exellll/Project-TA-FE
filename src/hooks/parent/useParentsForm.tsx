import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { useCreateParentMutation, useUpdateParentMutation } from "_services/modules/parents";
import { ParentsFormI } from "_interfaces/parent.interface";
import { useAppSelector } from "store";

const useParentsForm = (formType: "ayah" | "ibu" | "wali", setStep: Dispatch<SetStateAction<number>>, setStepStatic: Dispatch<SetStateAction<number>>, id?: string) => {
  const [create, { isLoading }] = useCreateParentMutation();
  const [update, { isLoading: updateLoading }] = useUpdateParentMutation();
  const {student_id} = useAppSelector(state => state.student);

  const [searchParams] = useSearchParams();
  const studentId_params = searchParams.get("userId");

  const schema = yup
    .object({
      name: yup.string(),
      gender: yup.string(),
      nik: yup.string(),
      birth_date: yup.date(),
      education: yup.string(),
      job: yup.string(),
      income: yup.string(),
      special_needs: yup.string(),
    })
    .required();

  const gender = formType === "ibu" ? "female" : "male";

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    control,
  } = useForm<ParentsFormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      gender: gender,
      birth_date: new Date(),
      education: "-",
      job: "-",
      income: "-",
      special_needs: "tidak",
    },
  });

  const _CreateParent = async (data: ParentsFormI) => {
    try {
      const type = formType === "wali" ? "wali" : "parent";
      const res = await create({ ...data, type: type, student_id: student_id }).unwrap();
      setStep(prev => prev + 1);
      setStepStatic(prev => prev + 1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const _UpdateParent = async (data: ParentsFormI) => {
    try {
      const type = formType === "wali" ? "wali" : "parent";
      const res = await update({ id, ...data, type: type, student_id: studentId_params!, gender: gender }).unwrap();
    } catch (error) {
      errorHandler(error);
    }
  }

  const handleCreate = handleSubmit(_CreateParent);
  const handleUpdate = handleSubmit(_UpdateParent);
  return { handleCreate, handleUpdate, register, errors, isLoading, control, reset };
};

export default useParentsForm;
