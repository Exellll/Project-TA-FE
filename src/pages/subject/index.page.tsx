import { Params } from "_interfaces/class.interface";
import { SubjectsI } from "_interfaces/subject.interfaces";
import { useCreateSubjectMutation, useGetListSubjectQuery } from "_services/modules/subject";
import SubjectModal from "components/subject/UpsertModal";
import { HeaderSubject } from "data/table/Subject";
import useSubjectForm from "hooks/subject/useUpsertSubject";
import TableLayout from "layout/table";
import React, { useState } from "react";

export const subjectRouteName = "subject";
export default function SubjectPage(): React.ReactElement {
  const [searchParams, setSearchParams] = useState<Params>({
    search: "",
    limit: 10,
    page: 1,
  });
  const [type, setType] = useState<"create" | "update"> ("create");
  const [modalUpsert, setModalUpsert] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const { subjects } = useSubjectForm(searchParams);

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
    <TableLayout<SubjectsI, Params>
      title="Subject"
      data={subjects?.subjects!}
      params={{ value: searchParams, setValue: setSearchParams }}
      headerTable={HeaderSubject}
      handleCreate={handleCreate}
      setSelectedId={setSelectedColumn}
      remove={{ isOpen: isDeletePopupOpen, handler: handleDeletePopUp }}
      modal={
        <SubjectModal
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
