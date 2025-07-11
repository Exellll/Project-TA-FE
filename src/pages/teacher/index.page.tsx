import { AnnouncementI } from "_interfaces/announcement.interfaces";
import { Params } from "_interfaces/class.interface";
import { TeacherI } from "_interfaces/teachers.interfaces";
import AnnouncementModal from "components/upsertModal/upsertModalAnnouncement";
import TeacherModal from "components/upsertModal/upsertModalTeacher";
import { HeaderAnnouncement } from "data/table/Announcement";
import { HeaderTeacher } from "data/table/Teacher";
import useAnnouncementForm from "hooks/announcement/useAnnouncementForm";
import useTeacherForm from "hooks/teacher/useTeacherForm";
import TableLayout from "layout/table";
import React, { useState } from "react";

export const teacherRouteName = "teacher";
export default function TeacherPage(): React.ReactElement {
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
  const { teacher, handleDelete } = useTeacherForm(searchParams);
  const [idToDelete, setIdToDelete] = useState<string>("");

  const handleDeletePopUp = (id: string) => {
    if(id){
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

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  return (
    <>
    <TableLayout<TeacherI, Params>
      title="Guru"
      data={teacher?.teachers!}
      params={{ value: searchParams, setValue: setSearchParams }}
      headerTable={() => HeaderTeacher(handleDeletePopUp, handleUpdate)}
      handleCreate={handleCreate}
      setSelectedId={setSelectedColumn}
      remove={{ isOpen: isDeletePopupOpen, handler: () => {handleDelete(idToDelete); setIsDeletePopupOpen(false);}, handlerClose: () => setIsDeletePopupOpen(false)}}
      modal={
        <TeacherModal
          handler={handleModalUpsert}
          isOpen={modalUpsert}
          type={type}
          id={selectedId}
        />
      }
      handleEdit={handleUpdate}
      loading={false}
    />
    </>
  );
}
