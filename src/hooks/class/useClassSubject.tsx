import React, { useEffect, useState } from "react";
import { DragDropTable } from "components/table/dnd-table";
import { io, Socket } from "socket.io-client";
import {
  ClassClientToServerEvents,
  ClassServerToClientEvents,
  StaffSubjectI,
  SubjectI,
} from "_interfaces/class-subject.interface";

import { useGetListStaffSubjectQuery, useGetListSubjectQuery, useGetListSubjectSocketQuery } from "_services/modules/subject";
import { resolve } from "path";
import { HeaderClassSubject } from "pages/class/section/header/class-subject.header";
import { toast } from "react-toastify";
import { useRef } from "react";
const useClassSubject = (
  socket: Socket<ClassServerToClientEvents, ClassClientToServerEvents>,
  class_id: string
) => {

  const [SubjectsInClass, setSubjectsInClass] =
    useState<SubjectI[]>();
    
  const [SubjectsOutClass, setSubjectsOutClass] = useState<
    SubjectI[]
  >([]);

  const { data: listAllSubjects, isLoading: isLoadingFetchSubject } =
  useGetListSubjectSocketQuery({ page: 1, limit: 100 }); // Fetch data subjects


  const [isLoading, setIsLoading] = useState<boolean>(); // Tambahkan state untuk loading
  const isActionRef = useRef<boolean>(false); // Ref untuk mengelola isAction

  const handleDeleteSubject = (class_id: string, subject_id: string) => {
    isActionRef.current = true; // Update ref
    setIsLoading(true);
    socket.emit("delete", { class_id, subject_id });
    setIsLoading(false);
  };

  const handleAddSubject = (class_id: string, subject_id: string) => {
    isActionRef.current = true; // Update ref
    setIsLoading(true);
    socket.emit("add", { class_id, subject_id });
    setIsLoading(false);
  };

  const initData = async () => {
    setIsLoading(true);
    socket.emit("join_room", { class_id });

    const fetchStaffSubjectInClass = new Promise((resolve) => {
      const joinRoomHandler = (data: { subjects: SubjectI[] }) => {
        setSubjectsInClass(data.subjects);
        resolve(data.subjects);
      };

      const addHandler = (data: { subject: SubjectI }) => {
        const newData = listAllSubjects?.find(
          (item) => item.id === data.subject.id
        );
        if (newData) {
          setSubjectsInClass((prev) => [...(prev || []), newData]);
          setSubjectsOutClass((prev) =>
            prev.filter((item) => item.id !== newData.id)
          );
        }
        if (isActionRef.current) {
          toast.success("Data berhasil ditambahkan ke kelas");
          isActionRef.current = false; // Reset ref
        }
      };

      const deleteHandler = (data: { subject_id: string }) => {
        const newData = listAllSubjects?.find(
          (item) => item.id === data.subject_id
        );
        if (newData) {
          setSubjectsOutClass((prev) => [...(prev || []), newData]);
        }
        setSubjectsInClass((prev) =>
          prev?.filter((item) => item.id !== data.subject_id)
        );
        if (isActionRef.current) {
          toast.success("Data berhasil dihapus dari kelas");
          isActionRef.current = false; // Reset ref
        }
      };

      socket.off("join_room", joinRoomHandler);
      socket.off("add", addHandler);
      socket.off("delete", deleteHandler);

      socket.on("join_room", joinRoomHandler);
      socket.on("add", addHandler);
      socket.on("delete", deleteHandler);
    });

    try {
      const [allClass, inClass] = await Promise.all([
        Promise.resolve(listAllSubjects),
        fetchStaffSubjectInClass,
      ]);

      const tempDataOut = (allClass as any[]).filter(
        (item) => !(inClass as any[]).some((inItem) => inItem.id === item.id)
      );

      setSubjectsOutClass(tempDataOut ?? []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoadingFetchSubject) {
      initData();
    }
  }, [class_id, isLoadingFetchSubject]);

  return {
    SubjectsInClass,
    SubjectsOutClass,
    isLoading,
    columns: HeaderClassSubject(),
    handleRowDrop: (
      fromRow: SubjectI,
      toRow: SubjectI,
      fromIndex: number | null,
      toIndex: number | null,
      targetTableId: string
    ) => {
      if (targetTableId === "A" && fromIndex !== null) {
        handleAddSubject(class_id, fromRow.id);
      } else if (targetTableId === "B" && fromIndex !== null) {
        handleDeleteSubject(class_id, fromRow.id);
      }
    },
    isLoadingFetchSubject,
  };
};

export default useClassSubject;
