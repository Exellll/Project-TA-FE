import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateStudentPeriodicMutation, useUpdateStudentPeriodicMutation } from "_services/modules/student-periodic";
import { StudentPeriodicFormI } from "_interfaces/student-periodic.interface";
import { useAppSelector } from "store";

const useStudentPeriodicForm = (setStep: Dispatch<SetStateAction<number>>, setStepStatic: Dispatch<SetStateAction<number>>, id?: string) => {
  const [create, { isLoading }] = useCreateStudentPeriodicMutation();
  const [update] = useUpdateStudentPeriodicMutation();
  const {student_id} = useAppSelector(state => state.student);

  const schema = yup
    .object({
      body_height: yup.number().typeError("Tinggi badan harus diisi").required(),
      body_weight: yup.number().typeError("Berat badan harus diisi").required(),
      kps_recipients_distance: yup.string().required("Jarak penerima KPS harus diisi"),
      travel_time_in_hour: yup.number().typeError("Jam perjalanan harus diisi").required(),
      travel_time_in_minutes: yup.number().typeError("Menit perjalanan harus diisi").required(),
      number_of_sibling: yup.number().typeError("Jumlah saudara harus diisi").required(),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    control,
  } = useForm<StudentPeriodicFormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      body_height: 150,
      body_weight: 50,
      kps_recipients_distance: "Dekat",
      travel_time_in_hour: 1,
      travel_time_in_minutes: 30,
      number_of_sibling: 2,
    },
  });

  const _CreateStudentPeriodic = async (data: StudentPeriodicFormI) => {
    try {
      const res = await create({...data, student_id: student_id}).unwrap();
      setStep(prev => prev + 1);
      setStepStatic(prev => prev + 1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const _UpdateStudentPeriodic = async (data: StudentPeriodicFormI) => {
    try {
      const res = await update({id, ...data, student_id: student_id}).unwrap();
      setStep(prev => prev + 1);
      setStepStatic(prev => prev + 1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleCreate = handleSubmit(_CreateStudentPeriodic);
  const handleUpdate = handleSubmit(_UpdateStudentPeriodic);

  return { handleCreate, handleUpdate, register, errors, isLoading, control, reset };
};

export default useStudentPeriodicForm;
