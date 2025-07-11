import { useEffect, useState } from "react";
import { useGetClassByIdQuery } from "_services/modules/class";
import useGradeForm from "hooks/grade/useGradeForm";
import GradeInputTable from "components/table/grade-table";
import Select from "react-select";
import useClassManagement from "hooks/class/useClassManagement";
import { useParams } from "react-router-dom";
import { useGetGradesByClassQuery } from "_services/modules/grade";

export const gradeInputRouteName = "/grade/input-grade/:id";
export default function GradeInputPage(): React.ReactElement {
    const { id: selectedClassId } = useParams<{ id: string }>();

    const { listData } = useClassManagement(); // or all
    const { data: selectedClass, isLoading: isLoadingSelected } =
        useGetClassByIdQuery({ id: selectedClassId! }, { skip: !selectedClassId });

    const { data, refetch } = useGetGradesByClassQuery({ class_id: selectedClassId! }, { refetchOnMountOrArgChange: true });

    const { grades, updateScore, handleSubmit, isLoading, setGrades } = useGradeForm();

    useEffect(() => {
        if (data) {
            const initialGrades: Record<string, Record<string, number>> = {};
            for (const grade of data) {
                const studentId = grade.student.student_id;
                const subjectId = grade.subject.id;
                const score = grade.score;

                if (!initialGrades[studentId]) {
                    initialGrades[studentId] = {};
                }
                initialGrades[studentId][subjectId] = score;
            }
            setGrades(initialGrades);
        }
    }, [data]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Input Nilai</h1>

            {isLoadingSelected && selectedClassId && <p>Memuat data kelas...</p>}

            {selectedClass && (
                <GradeInputTable
                    students={selectedClass.class_student}
                    subjects={selectedClass.class_subject.map((cs) => ({
                        subject: {
                            id: cs.subject_id,
                            title: cs.title,
                        },
                    }))}
                    grades={grades}
                    onChange={updateScore}
                    onSubmit={() => {handleSubmit(selectedClass.id)}}
                    isSubmitting={isLoading}
                />
            )}
        </div>
    );
}
