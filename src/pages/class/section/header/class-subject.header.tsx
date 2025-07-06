import { MdDelete, MdUpdate, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { Columns } from "components/table/dnd-table";
import {
  ClasssubjectI,
  StaffSubjectI,
} from "_interfaces/class-subject.interface";

export const HeaderClassSubject = (
  handleDeletePopUp?: (id: string) => void,
  handleUpdate?: (id: string) => void
): Columns<StaffSubjectI>[] => {
  return [
    {
      fieldId: "subject",
      label: "Mata Pelajaran",
      render: (data) => <p>{data.subject.title || "—"}</p>,
    },
    {
      fieldId: "staff",
      label: "Nama Guru",
      render: (data) => <p>{data.staff.name || 0}</p>,
    },
  ];
};
