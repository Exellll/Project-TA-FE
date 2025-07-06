import { Params } from "_interfaces/class.interface";
import { StudentBillI } from "_interfaces/student-bill.interfaces";
import StudentBillModal from "components/upsertModal/upsertModalTagihan";
import { HeaderStudentBill } from "data/table/Student-bill";
import useStudentBillForm from "hooks/student-bill/useStudentBillForm";
import TableLayout from "layout/table";
import React, { useState } from "react";

export const studentBillRouteName = "bill";
export default function StudentBillPage(): React.ReactElement {
  const [searchParams, setSearchParams] = useState<Params>({
    search: "",
    limit: 20,
    page: 1,
  });
  const [type, setType] = useState<"create" | "update"> ("create");
  const [modalUpsert, setModalUpsert] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const { studentBills } = useStudentBillForm(searchParams)

  const handleDeletePopUp = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };
  const handleModalUpsert = () => {
    setModalUpsert(!modalUpsert);
  };
  const handleUpdate = (id: string) => {
    handleModalUpsert();
    setType("update");
    setSelectedId(id);
  };
  const handleCreate = () => {
    handleModalUpsert();
    setType("create");
    setSelectedId("");
  };
  return (
    <TableLayout<StudentBillI, Params>
      title="Tagihan Siswa"
      data={studentBills?.studentBills!}
      params={{ value: searchParams, setValue: setSearchParams }}
      headerTable={HeaderStudentBill}
      handleCreate={handleCreate}
      setSelectedId={setSelectedColumn}
      remove={{ isOpen: isDeletePopupOpen, handler: handleDeletePopUp }}
      modal={
        <StudentBillModal
          handler={handleModalUpsert}
          isOpen={modalUpsert}
          type={type}
          id={selectedId}
        />
      }
      handleEdit={handleUpdate}
      loading={false}
    />
  );
}
