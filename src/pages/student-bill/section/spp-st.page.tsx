import { Params } from "_interfaces/class.interface";
import { StudentBillI } from "_interfaces/student-bill.interfaces";
import { StudentTransactionI, StudentTransactionParams } from "_interfaces/student-transaction.interfaces";
import StudentTransactionModal from "components/upsertModal/upsertModalST";
import StudentBillModal from "components/upsertModal/upsertModalTagihan";
import { HeaderStudentBill } from "data/table/Student-bill";
import { HeaderStudentTransactionSPP } from "data/table/Student-transaction";
import useStudentBillForm from "hooks/student-bill/useStudentBillForm";
import useStudentTransactionForm from "hooks/student-transaction/useStudentTransactionForm";
import TableLayout from "layout/table";
import React, { useState } from "react";

export const studentTransactionSPPRouteName = "bill/spp";
export default function StudentTransactionSPPPage(): React.ReactElement {
  const [searchParams, setSearchParams] = useState<StudentTransactionParams>({
    search: "",
    limit: 20,
    page: 1,
    type: "SPP",
  });
  const [type, setType] = useState<"create" | "update"> ("create");
  const [modalUpsert, setModalUpsert] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const { studentTransactions } = useStudentTransactionForm(searchParams)

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
    <TableLayout<StudentTransactionI, Params>
      title="SPP"
      data={studentTransactions?.studentTransactions!}
      params={{ value: searchParams, setValue: setSearchParams }}
      headerTable={HeaderStudentTransactionSPP}
      handleCreate={handleCreate}
      setSelectedId={setSelectedColumn}
      remove={{ isOpen: isDeletePopupOpen, handler: handleDeletePopUp }}
      modal={
        <StudentTransactionModal
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
