// pages/grade/view-grade.page.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGradesByClassQuery } from "_services/modules/grade";
import { Button } from "react-daisyui";

export const viewGradeRouteName = "/grade/view/:id";
export default function ViewGradePage(): React.ReactElement {
    const { id } = useParams();
    const { data, isLoading } = useGetGradesByClassQuery({ class_id: id! });
    const navigate = useNavigate();

    if (isLoading) return <p>Loading nilai...</p>;
    if (!data || data.length === 0) return <p>Tidak ada nilai ditemukan</p>;

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
            <table className="table table-zebra w-full">
                <thead className="bg-blue-ribbon-300 text-center">
                    <tr>
                        <th>Nama Siswa</th>
                        <th>Mata Pelajaran</th>
                        <th>Nilai</th>
                        <th>Tahun Ajaran</th>
                        <th>Semester</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100 text-center">
                    {data.map((grade) => (
                        <tr key={grade.id}>
                            <td>{grade.student.name}</td>
                            <td>{grade.subject.title}</td>
                            <td>{grade.score}</td>
                            <td>{grade.school_year}</td>
                            <td>{grade.semester}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
