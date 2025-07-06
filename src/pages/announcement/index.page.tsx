import { AnnouncementI } from "_interfaces/announcement.interfaces";
import { Params } from "_interfaces/class.interface";
import AnnouncementModal from "components/upsertModal/upsertModalAnnouncement";
import { HeaderAnnouncement } from "data/table/Announcement";
import useAnnouncementForm from "hooks/announcement/useAnnouncementForm";
import TableLayout from "layout/table";
import React, { useState } from "react";

export const announcementRouteName = "announcement";
export default function AnnouncementPage(): React.ReactElement {
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { announcements } = useAnnouncementForm(searchParams);

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
    <TableLayout<AnnouncementI, Params>
      title="Pengumuman"
      data={announcements?.announcements!}
      params={{ value: searchParams, setValue: setSearchParams }}
      headerTable={HeaderAnnouncement}
      handleCreate={handleCreate}
      setSelectedId={setSelectedColumn}
      remove={{ isOpen: isDeletePopupOpen, handler: handleDeletePopUp }}
      modal={
        <AnnouncementModal
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
