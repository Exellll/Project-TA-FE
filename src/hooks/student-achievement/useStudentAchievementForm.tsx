import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import {
  useCreateStudentAchievementMutation,
  useUpdateStudentAchievementMutation,
} from "_services/modules/student-achievement";
import { StudentAchievementFormI } from "_interfaces/student-achievement.interface";
import { useAppSelector } from "store";

const useStudentAchievementForm = (
  setStep: Dispatch<SetStateAction<number>>,
  setStepStatic: Dispatch<SetStateAction<number>>,
  id?: string
) => {
  const [create, { isLoading }] = useCreateStudentAchievementMutation();
  const [update] = useUpdateStudentAchievementMutation();
  const { student_id } = useAppSelector((state) => state.student);
  console.log("student_id", student_id);

  const schema = yup
    .object({
      achievements: yup.array().of(
        yup.object({
          achievement_type: yup.string().required("Nama Prestasi harus diisi"),
          achievement_level: yup
            .string()
            .required("Tingkat Prestasi harus diisi"),
          name: yup.string().required("Nama Prestasi harus diisi"),
          organizer: yup
            .string()
            .required("Penyelenggara Prestasi harus diisi"),
          year: yup.string().required("Tahun Prestasi harus diisi"),
          rank: yup.string().required("Peringkat Prestasi harus diisi"),
        })
      ),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    control,
  } = useForm<StudentAchievementFormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      achievements: [
        {
          achievement_type: "Akademik",
          achievement_level: "Nasional",
          name: "Olimpiade Matematika",
          organizer: "Kementerian Pendidikan",
          year: "2023",
          rank: "1",
        },
        {
          achievement_type: "Non-Akademik",
          achievement_level: "Provinsi",
          name: "Lomba Futsal",
          organizer: "Dinas Pemuda dan Olahraga",
          year: "2022",
          rank: "2",
        },
      ],
    },
  });

  const _CreateStudentAchievement = async (data: StudentAchievementFormI) => {
    try {
      const promises = data.achievements.map((item, index) => {
        return create({ ...item, student_id: student_id }).unwrap();
      });
      await Promise.all(promises);
      setStep((prev) => prev + 1);
      setStepStatic((prev) => prev + 1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const _UpdateStudentAchievement = async (data: StudentAchievementFormI) => {
    try {
      const promises = data.achievements.map((item, index) => {
        return update({ id, ...item, student_id: student_id }).unwrap();
      });
      await Promise.all(promises);
      setStep((prev) => prev + 1);
      setStepStatic((prev) => prev + 1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleCreate = handleSubmit(_CreateStudentAchievement);
  const handleUpdate = handleSubmit(_UpdateStudentAchievement);
  return { handleCreate, handleUpdate, register, errors, isLoading, control, reset, watch };
};

export default useStudentAchievementForm;
