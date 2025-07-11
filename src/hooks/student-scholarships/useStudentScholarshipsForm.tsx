import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateStudentScholarshipsMutation, useUpdateStudentScholarshipsMutation } from "_services/modules/student-scholarships";
import { StudentScholarshipsFormI } from "_interfaces/student-scholarships.interface";
import { useAppSelector } from "store";

const useStudentScholarshipsForm = (setStep: Dispatch<SetStateAction<number>>, setStepStatic: Dispatch<SetStateAction<number>>, id?: string) => {
  const [create, { isLoading }] = useCreateStudentScholarshipsMutation();
  const [update] = useUpdateStudentScholarshipsMutation();
  const { student_id } = useAppSelector((state) => state.student);

  const schema = yup
    .object({
      scholarship_type: yup.string().required(),
      start_year: yup.string().required(),
      end_year: yup.string().required(),
      description: yup.string().required(),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    control,
  } = useForm<StudentScholarshipsFormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      scholarship_type: "Beasiswa Prestasi",
      start_year: new Date().getFullYear().toString(),
      end_year: (new Date().getFullYear() + 1).toString(),
      description: "Beasiswa untuk siswa berprestasi di bidang akademik.",
    },
  });

  const _CreateStudentScholarships = async (data: StudentScholarshipsFormI) => {
    try {
      const res = await create({...data, student_id: student_id}).unwrap();
      setStep(prev => prev + 1);
      setStepStatic(prev => prev + 1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const _UpdateStudentScholarships = async (data: StudentScholarshipsFormI) => {
    try {
      const res = await update({id, ...data, student_id: student_id }).unwrap();
      setStep(prev => prev + 1);
      setStepStatic(prev => prev + 1);
    } catch (error) {
      errorHandler(error);
    }
  }

  const handleCreate = handleSubmit(_CreateStudentScholarships);
  const handleUpdate = handleSubmit(_UpdateStudentScholarships);

  return { handleCreate, handleUpdate, register, errors, isLoading, control, reset };
};

export default useStudentScholarshipsForm;
