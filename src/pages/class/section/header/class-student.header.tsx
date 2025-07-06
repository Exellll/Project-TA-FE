import { Columns } from "components/table/dnd-table";
import { StudentI } from "_interfaces/student.interfaces";

export const HeaderClassStudent = (
  handleDeletePopUp?: (id: string) => void,
  handleUpdate?: (id: string) => void
): Columns<StudentI>[] => {
  return [
    {
      fieldId: "nis",
      label: "NIS (Nomor Induk Siswa)",
      render: (data) => <p>{data.nisn || "—"}</p>,
    },
    {
      fieldId: "name",
      label: "Nama Siswa",
      render: (data) => <p>{data.name || 0}</p>,
    },
  ];
};
