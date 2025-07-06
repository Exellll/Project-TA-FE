import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateStudentContactMutation, useUpdateStudentContactMutation } from "_services/modules/student-contact";
import { StudentContactFormI } from "_interfaces/student-contact.interface";
import { useAppSelector } from "store";

const useStudentContactForm = (setStep: Dispatch<SetStateAction<number>>, setStepStatic: Dispatch<SetStateAction<number>>, id?: string) => {
  const [create, { isLoading }] = useCreateStudentContactMutation();
  const [update, { isLoading: updateLoading }] = useUpdateStudentContactMutation();
  const {student_id} = useAppSelector(state => state.student);

  const schema = yup
    .object({
      home_phone_number: yup.string().required("Telepon Rumah harus diisi"),
      student_phone_number: yup
        .string()
        .required("Nomor Telepon Siswa harus diisi"),
      email: yup.string().required("Email harus diisi"),
      parent_email: yup.string().required("Email Orang Tua harus diisi"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    control,
  } = useForm<StudentContactFormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const _CreateStudentContact = async (data: StudentContactFormI) => {
    try {
      setStep((prev) => prev + 1);
      setStepStatic((prev) => prev + 1);
      const res = await create({...data, student_id: student_id}).unwrap();
    } catch (error) {
      errorHandler(error);
    }
  };

  const _UpdateStudentContact = async (data: StudentContactFormI) => {
    try {
      setStep((prev) => prev + 1);
      setStepStatic((prev) => prev + 1);
      const res = await update({ id, ...data, student_id: student_id }).unwrap();
    } catch (error) {
      errorHandler(error);
    }
  }

  const handleCreate = handleSubmit(_CreateStudentContact);
  const handleUpdate = handleSubmit(_UpdateStudentContact);
  return { handleCreate, handleUpdate, register, errors, isLoading, control, reset, watch };
};

export default useStudentContactForm;
