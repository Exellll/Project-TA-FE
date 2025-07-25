import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGradesByClassQuery } from "_services/modules/grade";
import { Button } from "react-daisyui";
import { uniqBy } from "lodash";

export const viewGradeRouteName = "/grade/view/:id";

export default function ViewGradePage(): React.ReactElement {
    const { id } = useParams();
    const { data, isLoading } = useGetGradesByClassQuery({ class_id: id! });
    const navigate = useNavigate();

    if (isLoading) return <p>Loading nilai...</p>;
    if (!data || data.length === 0) return <p>Tidak ada nilai ditemukan</p>;

    const students = uniqBy(data.map((grade) => grade.student), "id");
    const subjects = uniqBy(data.map((grade) => grade.subject), "id").sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    const gradeMap: Record<string, Record<string, number>> = {};
    data.forEach((grade) => {
        if (!gradeMap[grade.student.student_id]) {
            gradeMap[grade.student.student_id] = {};
        }
        gradeMap[grade.student.student_id][grade.subject.id] = grade.score;
    });

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Daftar Nilai Kelas</h1>
                <Button
                    className="bg-blue-ribbon text-white hover:bg-blue-ribbon-400"
                    onClick={() => navigate("/grade")}
                >
                    Kembali
                </Button>
            </div>

            <div className="overflow-auto">
                <table className="w-full border border-gray-600 border-collapse text-sm">
                    <thead className="bg-blue-ribbon-300 text-white">
                        <tr>
                            <th className="border border-gray-600 p-2">Nama Siswa</th>
                            {subjects.map((subject) => (
                                <th key={subject.id} className="border border-gray-600 p-2">
                                    {subject.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.student_id} className="bg-white hover:bg-gray-50">
                                <td className="border border-gray-600 p-2 font-semibold text-left">
                                    {student.name}
                                </td>
                                {subjects.map((subject) => (
                                    <td
                                        key={subject.id}
                                        className="border border-gray-600 p-2 text-center"
                                    >
                                        {gradeMap[student.student_id]?.[subject.id] ?? "-"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
