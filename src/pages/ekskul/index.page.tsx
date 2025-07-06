import { Params } from "_interfaces/class.interface";
import { EkskulI } from "_interfaces/ekskul.interfaces";
import SubjectModal from "components/subject/UpsertModal";
import EkskulModal from "components/upsertModal/upsertModalEkskul";
import { HeaderEkskul } from "data/table/Ekskul";
import useEkskulForm from "hooks/ekskul/useEkskulForm";
import useSubjectForm from "hooks/subject/useUpsertSubject";
import TableLayout from "layout/table";
import React, { useState } from "react";

export const ekskulRouteName = "/ekskul";
export default function EkskulPage(): React.ReactElement {
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
  const [idToDelete, setIdToDelete] = useState<string>("");

  const { ekskul, handleDelete } = useEkskulForm(searchParams);

  const handleDeletePopUp = (id?: string) => {
    if (id) {
      setIdToDelete(id);
    }
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
    <TableLayout<EkskulI, Params>
      title="Ekskul"
      data={ekskul?.ekskul!}
      params={{ value: searchParams, setValue: setSearchParams }}
      headerTable={() => HeaderEkskul(handleDeletePopUp, handleUpdate)}
      handleCreate={handleCreate}
      setSelectedId={setSelectedColumn}
      remove={{ isOpen: isDeletePopupOpen, handler: () => {handleDelete(idToDelete); setIsDeletePopupOpen(false);}, handlerClose: () => setIsDeletePopupOpen(false) }}
      modal={
        <EkskulModal
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
