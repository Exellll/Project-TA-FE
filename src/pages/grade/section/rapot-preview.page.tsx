import { useParams } from "react-router-dom";
import { useGetGradesByStudentQuery, useGetStudentRecommendationQuery } from "_services/modules/grade";
import { useGetStudentByIdQuery } from "_services/modules/students";
import { Button } from "react-daisyui";
import ReactMarkdown from 'react-markdown';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StudentRaporDocument from 'components/PDF/StudentRaporPDF';

export const StudentRaporPreviewRouteName = '/grade/rapor/:class_id/student/:student_id'
export default function StudentRaporPreview(): React.ReactElement {
    const { class_id, student_id } = useParams();
    const { data: grades } = useGetGradesByStudentQuery({ student_id: student_id! });
    const { data: student } = useGetStudentByIdQuery(student_id!);
    const { data: recommendation, isLoading } = useGetStudentRecommendationQuery({ student_id: student_id! });

    return (
        <div className="p-10 bg-white text-black max-w-4xl mx-auto">
            <h2 className="text-center text-lg font-bold mb-6">RAPOT NILAI SISWA</h2>

            <div className="grid grid-cols-2 text-sm mb-4 justify-between">
                <div>
                    <p><strong>Kelas:</strong> {grades?.grades?.[0]?.class?.name ?? "-"}</p>
                    <p><strong>Wali Kelas:</strong> -</p>
                    <p><strong>Tahun Ajaran / Semester:</strong> {grades?.grades?.[0].school_year} - Semester {grades?.grades?.[0].semester}</p>
                </div>
                <div>
                    <p><strong>Nama Siswa:</strong> {student?.name}</p>
                    <p><strong>NIS:</strong> {student?.nisn}</p>
                </div>
            </div>

            {/* Loading Spinner */}
            {isLoading ? (
                <div className="flex flex-col justify-center items-center min-h-[300px]">
                    <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <p className="mt-3 text-sm text-gray-600">Mohon menunggu rekomendasi siswa...</p>
                </div>
            ) : (
                <>
                    {/* Tabel Nilai */}
                    <table className="w-full text-sm border border-black mb-4">
                        <thead>
                            <tr className="text-center border-b border-black">
                                <th rowSpan={2} className="border-r border-black px-2">No</th>
                                <th rowSpan={4} className="border-r border-black px-2">Mata Pelajaran</th>
                                <th rowSpan={2} className="border-r border-black px-2">KKM</th>
                                <th colSpan={2} className="px-2 border-b border-black">Nilai Hasil Pembelajaran</th>
                            </tr>
                            <tr className="text-center border-b border-black">
                                <th className="border-r border-black px-2">Kognitif</th>
                                <th className="px-2">Afektif</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades?.grades.map((item, index) => (
                                <tr key={item.id} className="text-center border-t border-black">
                                    <td className="border-r border-black px-2">
                                        {index + 1}
                                    </td>
                                    <td className="border-r border-black px-2">
                                        {item.subject.title}
                                    </td>
                                    <td className="border-r border-black px-2">75</td>
                                    <td className="border-r border-black px-2">
                                        {item.score}
                                    </td>
                                    <td className="px-2">
                                        {item.score >= 85
                                            ? "A"
                                            : item.score >= 75
                                                ? "B"
                                                : item.score >= 60
                                                    ? "C"
                                                    : "D"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Rekomendasi AI */}
                    <div className="mt-6">
                        <h3 className="font-bold text-sm mb-2 border-b border-black">
                            Hasil Analisis Berdasarkan AI
                        </h3>
                        <p className="text-sm whitespace-pre-line border p-3 min-h-[100px]">
                            <ReactMarkdown>
                                {recommendation?.recommendation ?? "Belum tersedia"}
                            </ReactMarkdown>
                        </p>
                    </div>
                </>
            )}

            {grades && student && recommendation && (
                <div className="flex justify-end mt-4">
                    <PDFDownloadLink
                        document={
                            <StudentRaporDocument
                                studentName={student.name}
                                nisn={student.nisn}
                                className={grades.grades[0]?.class?.name ?? '-'}
                                schoolYear={grades.grades[0]?.school_year ?? '-'}
                                semester={grades.grades[0]?.semester ?? 1}
                                grades={grades.grades}
                                recommendation={recommendation?.recommendation}
                            />
                        }
                        fileName={`rapor_${student.name.replace(/\s+/g, '_')}.pdf`}
                        className="btn rounded-xl hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon"
                    >
                        {({ loading }) => <span>{loading ? 'Menyiapkan...' : 'Download Rapor'}</span>}
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};
