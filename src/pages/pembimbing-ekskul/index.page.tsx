import { Params } from "_interfaces/class.interface";
import { PembimbingI } from "_interfaces/pembimbing-ekskul.interfaces";
import PembimbingEkskulModal from "components/upsertModal/upsertModalPembimbing";
import { HeaderPembimbing } from "data/table/Pembimbing-ekskul";
import usePembimbingEkskulForm from "hooks/pembimbing-ekskul/usePembimbingEkskulForm";
import TableLayout from "layout/table";
import React, { useState } from "react";

export const PembimbingEkskulRouteName = "/pembimbing-ekskul";
export default function PembimbingEkskulPage(): React.ReactElement {
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

  const { pembimbing, handleDelete } = usePembimbingEkskulForm(searchParams);

  const [idToDelete, setIdToDelete] = useState<string>("");

  const handleDeletePopUp = (id: string) => {
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
    <TableLayout<PembimbingI, Params>
      title="Pembimbing Ekskul"
      data={pembimbing?.pembimbing!}
      params={{ value: searchParams, setValue: setSearchParams }}
      headerTable={() => HeaderPembimbing(handleDeletePopUp, handleUpdate)}
      handleCreate={handleCreate}
      setSelectedId={setSelectedColumn}
      remove={{ isOpen: isDeletePopupOpen, handler: () => {handleDelete(idToDelete); setIsDeletePopupOpen(false);}, handlerClose: () => setIsDeletePopupOpen(false) }}
      modal={
        <PembimbingEkskulModal
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
