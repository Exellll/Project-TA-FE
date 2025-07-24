// components/PDF/PrintableRapor.tsx
import { GradeRes } from "_interfaces/grade.interfaces";
import ReactMarkdown from "react-markdown";
import React from "react";

interface PrintableRaporProps {
  studentName: string;
  nis: string;
  className: string;
  schoolYear: string;
  semester: number;
  grades: GradeRes[];
  recommendation?: string;
}

export const PrintableRapor = React.forwardRef<HTMLDivElement, PrintableRaporProps>(
  ({ studentName, nis, className, schoolYear, semester, grades, recommendation }, ref) => {
    return (
      <div ref={ref} className="p-10 text-black w-full">
        <h2 className="text-center text-lg font-bold mb-6">RAPOT NILAI SISWA</h2>

        <div className="grid grid-cols-2 text-sm mb-4 justify-between">
          <div>
            <p><strong>Kelas:</strong> {className}</p>
            <p><strong>Wali Kelas:</strong> -</p>
            <p><strong>Tahun Ajaran / Semester:</strong> {schoolYear} - Semester {semester}</p>
          </div>
          <div>
            <p><strong>Nama Siswa:</strong> {studentName}</p>
            <p><strong>NIS:</strong> {nis}</p>
          </div>
        </div>

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
            {grades.map((item, index) => (
              <tr key={item.id} className="text-center border-t border-black">
                <td className="border-r border-black px-2">{index + 1}</td>
                <td className="border-r border-black px-2">{item.subject.title}</td>
                <td className="border-r border-black px-2">75</td>
                <td className="border-r border-black px-2">{item.score}</td>
                <td className="px-2">
                  {item.score >= 85 ? "A" : item.score >= 75 ? "B" : item.score >= 60 ? "C" : "D"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <h3 className="font-bold text-sm mb-2 border-b border-black">Hasil Analisis Berdasarkan AI</h3>
          <div className="text-sm whitespace-pre-line border p-3 min-h-[100px]">
            <ReactMarkdown>{recommendation ?? "Belum tersedia"}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
);
