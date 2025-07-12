import { GradeRes } from "_interfaces/grade.interfaces";
import React from "react";

interface Props {
  grades: GradeRes[];
}

const StudentGradeTable: React.FC<Props> = ({ grades }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="table w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left">Mata Pelajaran & Guru</th>
            <th className="text-left">Nilai</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td>
                <div className="font-medium">{grade.subject.title}</div>
                <div className="text-sm text-gray-500">
                  {grade.subject.teacher.map((t) => t.name).join(", ")}
                </div>
              </td>
              <td>{grade.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentGradeTable;
