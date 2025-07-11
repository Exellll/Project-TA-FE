import { useState } from "react";
import { BulkGradePayload } from "_interfaces/grade.interfaces";
import { useBulkCreateGradeMutation } from "_services/modules/grade";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useGradeForm() {
  const [submitGrades, { isLoading }] = useBulkCreateGradeMutation();
  const [grades, setGrades] = useState<Record<string, Record<string, number>>>({});
  const navigate = useNavigate();

  const updateScore = (studentId: string, subjectId: string, score: number) => {
    console.log("Update score for", { studentId, subjectId, score });
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subjectId]: score,
      },
    }));
  };

  const handleSubmit = async (classId: string) => {
    const payload: BulkGradePayload = {
      data: [],
    };

    for (const studentId in grades) {
      for (const subjectId in grades[studentId]) {
        const score = grades[studentId][subjectId];
        payload.data.push({
          student_id: studentId,
          subject_id: subjectId,
          class_id: classId,
          score,
        });
      }
    }

    try {
      await submitGrades(payload).unwrap(); 
      navigate("/grade");
      toast.success("Nilai berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan nilai:", error);
    }

  };

  return {
    grades,
    updateScore,
    handleSubmit,
    isLoading,
    setGrades
  };
}
