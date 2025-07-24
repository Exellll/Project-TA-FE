import React from "react";
import { Button } from "react-daisyui";

interface Props {
  students: { student_id: string; name: string }[];
  subjects: { subject: { id: string; title: string } }[];
  grades: Record<string, Record<string, number>>;
  onChange: (studentId: string, subjectId: string, value: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const GradeInputTable = ({
  students,
  subjects,
  grades,
  onChange,
  onSubmit,
  isSubmitting,
}: Props): React.ReactElement => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Nama Siswa</th>
              {subjects.map((s) => (
                <th key={s.subject.id}>{s.subject.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td >{student.name}</td>
                {subjects.map((s) => (
                  <td key={`${student.student_id}-${s.subject.id}`}>
                    <input
                      type="number"
                      className="input input-bordered input-sm w-20"
                      value={grades?.[student.student_id]?.[s.subject.id] ?? ""}
                      onChange={(e) =>
                        onChange(student.student_id, s.subject.id, parseFloat(e.target.value))
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4 min-w-max">
        <Button
          className="w-[20%] lg:w-[20%] rounded-xl hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon"
          onClick={onSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Nilai"}
        </Button>
      </div>
    </div>
  );
};

export default GradeInputTable;
