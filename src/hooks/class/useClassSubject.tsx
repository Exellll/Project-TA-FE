import React, { useEffect, useState } from "react";
import { DragDropTable } from "components/table/dnd-table";
import { io, Socket } from "socket.io-client";
import {
  ClassClientToServerEvents,
  ClassServerToClientEvents,
  StaffSubjectI,
} from "_interfaces/class-subject.interface";

import { useGetListStaffSubjectQuery } from "_services/modules/subject";
import { resolve } from "path";
import { HeaderClassSubject } from "pages/class/section/header/class-subject.header";
import { toast } from "react-toastify";
import { useRef } from "react";
const useClassSubject = (
  socket: Socket<ClassServerToClientEvents, ClassClientToServerEvents>,
  class_id: string
) => {
  const [staffSubjectInClass, setStaffSubjectInClass] =
    useState<StaffSubjectI[]>();
  const [staffSubjectOutClass, setStaffSubjectOutClass] = useState<
    StaffSubjectI[]
  >([]);
  const { data: listAllStaffSubject, isLoading: isLoadingFetch } =
    useGetListStaffSubjectQuery({page: 1, limit: 100}); // Fetch data staff subject
  const [isLoading, setIsLoading] = useState<boolean>(); // Tambahkan state untuk loading
  const isActionRef = useRef<boolean>(false); // Ref untuk mengelola isAction

  const handleDeleteSubject = (class_id: string, staff_subject_id: string) => {
    isActionRef.current = true; // Update ref
    setIsLoading(true);
    socket.emit("delete", { class_id, staff_subject_id });
    setIsLoading(false);
  };

  const handleAddSubject = (class_id: string, staff_subject_id: string) => {
    isActionRef.current = true; // Update ref
    setIsLoading(true);
    socket.emit("add", { class_id, staff_subject_id });
    setIsLoading(false);
  };

  const initData = async () => {
    setIsLoading(true);
    socket.emit("join_room", { class_id });

    const fetchStaffSubjectInClass = new Promise((resolve) => {
      const joinRoomHandler = (data: { subjects: StaffSubjectI[] }) => {
        setStaffSubjectInClass(data.subjects);
        resolve(data.subjects);
      };

      const addHandler = (data: { staffSubject: StaffSubjectI }) => {
        const newData = listAllStaffSubject?.find(
          (item) => item.id === data.staffSubject.id
        );
        if (newData) {
          setStaffSubjectInClass((prev) => [...(prev || []), newData]);
          setStaffSubjectOutClass((prev) =>
            prev.filter((item) => item.id !== newData.id)
          );
        }
        if (isActionRef.current) {
          toast.success("Data berhasil ditambahkan ke kelas");
          isActionRef.current = false; // Reset ref
        }
      };

      const deleteHandler = (data: { staff_subject_id: string }) => {
        const newData = listAllStaffSubject?.find(
          (item) => item.id === data.staff_subject_id
        );
        if (newData) {
          setStaffSubjectOutClass((prev) => [...(prev || []), newData]);
        }
        setStaffSubjectInClass((prev) =>
          prev?.filter((item) => item.id !== data.staff_subject_id)
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
        Promise.resolve(listAllStaffSubject),
        fetchStaffSubjectInClass,
      ]);

      const tempDataOut = (allClass as any[]).filter(
        (item) => !(inClass as any[]).some((inItem) => inItem.id === item.id)
      );

      setStaffSubjectOutClass(tempDataOut ?? []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoadingFetch) {
      initData();
    }
  }, [class_id, isLoadingFetch]);

  return {
    staffSubjectInClass,
    staffSubjectOutClass,
    isLoading,
    columns: HeaderClassSubject(),
    handleRowDrop: (
      fromRow: StaffSubjectI,
      toRow: StaffSubjectI,
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
    isLoadingFetch,
  };
};

export default useClassSubject;
