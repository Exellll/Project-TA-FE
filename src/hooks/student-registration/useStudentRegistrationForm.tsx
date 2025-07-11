import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateStudentRegistrationMutation, useUpdateStudentRegistrationMutation } from "_services/modules/student-registration";
import { StudentRegistrationFormI } from "_interfaces/student-registration.interface";
import { useAppSelector } from "store";

const useStudentRegistrationForm = (setStep: Dispatch<SetStateAction<number>>, setStepStatic: Dispatch<SetStateAction<number>>, id?: string) => {
  const [create, { isLoading }] = useCreateStudentRegistrationMutation();
  const [update, { isLoading: updateLoading }] = useUpdateStudentRegistrationMutation();
  const {student_id} = useAppSelector(state => state.student);

  const schema = yup
    .object({
      registration_type: yup.string().required("Jenis Pendaftaran harus diisi"),
      nis: yup.string().required("NIS harus diisi"),
      join_date: yup.date().required("Tanggal Masuk harus diisi"),
      previous_school: yup.string().required("Sekolah Asal harus diisi"),
      no_examinee: yup.string().required("No Peserta Ujian harus diisi"),
      no_ijazah: yup.string().required("No Ijazah harus diisi"),
      no_skhus: yup.string().required("No SKHUS harus diisi"),
      skill_competency: yup.string(),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    control,
  } = useForm<StudentRegistrationFormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      registration_type: "Baru",
      nis: "1234567890",
      join_date: new Date().toISOString().split("T")[0],
      previous_school: "SDN 01 Jakarta",
      no_examinee: "9876543210",
      no_ijazah: "IJZ1234567890",
      no_skhus: "SKHUS1234567890",
      skill_competency: "Matematika, Bahasa Indonesia, IPA",
    },
  });

  const _CreateStudentRegistration = async (data: StudentRegistrationFormI) => {
    try {
      const res = await create({...data, student_id: student_id}).unwrap();
      setStep(prev => prev + 1);
      setStepStatic(prev => prev + 1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const _UpdateStudentRegistration = async (data: StudentRegistrationFormI) => {
    try {
      const res = await update({id, ...data, student_id: student_id}).unwrap();
      setStep(prev => prev + 1);
      setStepStatic(prev => prev + 1);
    } catch (error) {
      errorHandler(error);
    }
  }

  const handleCreate = handleSubmit(_CreateStudentRegistration);
  const handleUpdate = handleSubmit(_UpdateStudentRegistration);

  return { handleCreate, handleUpdate, register, errors, isLoading, control, reset };
};

export default useStudentRegistrationForm;
