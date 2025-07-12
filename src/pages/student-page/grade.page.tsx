import StudentContainer from "layout/container/index-student";
import { useGetGradesByStudentQuery } from "_services/modules/grade";
import { useAppSelector } from "store";
import { useState } from "react";

const getIdFromToken = (token: string): string | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch (error) {
    return null;
  }
};

const StudentGradePage: React.FC = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const studentId = accessToken ? getIdFromToken(accessToken) : null;

  const { data, isLoading } = useGetGradesByStudentQuery(
    studentId ? { student_id: studentId } : { student_id: "" }
  );

  const grades = data?.grades || [];

  const schoolYears = Array.from(new Set(grades.map((item) => item.school_year)));
  const semesters = Array.from(new Set(grades.map((item) => item.semester)));

  const [selectedYear, setSelectedYear] = useState<string | "all">("all");
  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");

  const filteredGrades = grades.filter((item) => {
    const matchYear = selectedYear === "all" || item.school_year === selectedYear;
    const matchSemester = selectedSemester === "all" || item.semester === selectedSemester;
    return matchYear && matchSemester;
  });

  return (
    <StudentContainer className="p-4">
      <div className="max-w-6xl mx-auto mt-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Nilai Saya</h1>
          <p className="text-gray-600 text-lg">
            Berikut adalah daftar nilai berdasarkan mata pelajaran.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-sm text-gray-700 mr-2">Tahun Ajaran:</label>
            <select
              className="border rounded px-2 py-1"
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(e.target.value === "all" ? "all" : e.target.value)
              }
            >
              <option value="all">Semua</option>
              {schoolYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700 mr-2">Semester:</label>
            <select
              className="border rounded px-2 py-1"
              value={selectedSemester}
              onChange={(e) =>
                setSelectedSemester(e.target.value === "all" ? "all" : Number(e.target.value))
              }
            >
              <option value="all">Semua</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner text-blue-500" />
          </div>
        ) : filteredGrades.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Tidak ada nilai yang cocok dengan filter.
          </div>
        ) : (
          <div className="overflow-x-auto border">
            <table className="min-w-full border-collapse border border-gray-400 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border border-gray-400 px-4 py-3 text-left">Mata Pelajaran</th>
                  <th className="border border-gray-400 px-4 py-3 text-left">Guru</th>
                  <th className="border border-gray-400 px-4 py-3 text-center">Nilai</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((grade) => (
                  <tr key={grade.id}>
                    <td className="border border-gray-400 px-4 py-2">{grade.subject.title}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {grade.subject.teacher.map((t) => t.name).join(", ")}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{grade.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </StudentContainer>
  );
};

export default StudentGradePage;
