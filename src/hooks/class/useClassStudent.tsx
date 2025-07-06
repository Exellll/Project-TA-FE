import {
  StudentClientToServerEvents,
  StudentServerToClientEvents,
} from "_interfaces/class-student.interface";
import { StudentI } from "_interfaces/student.interfaces";
import { useGetStudentsQuery } from "_services/modules/students";
import { HeaderClassStudent } from "pages/class/section/header/class-student.header";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";

const useClassStudent = (
  socket: Socket<StudentServerToClientEvents, StudentClientToServerEvents>,
  class_id: string
) => {
  const [studentsInClass, setStudentsInClass] = useState<StudentI[]>();
  const [studentsOutClass, setStudentsOutClass] = useState<StudentI[]>([]);
  const { data: listAllStudents, isLoading: isLoadingFetch } =
    useGetStudentsQuery({
      page: 1,
      limit: 100,
      search: "",
      is_draft: "false",
    });
  const [isLoading, setIsLoading] = useState<boolean>(); // Tambahkan state untuk loading
  const isActionRef = useRef<boolean>(false); // Ref untuk mengelola isAction

  const handleDeleteSubject = (class_id: string, student_id: string) => {
    isActionRef.current = true; // Update ref
    setIsLoading(true);
    socket.emit("delete", { class_id, student_id });
    setIsLoading(false);
  };

  const handleAddSubject = (class_id: string, student_id: string) => {
    isActionRef.current = true; // Update ref
    setIsLoading(true);
    socket.emit("add", { class_id, student_id });
    setIsLoading(false);
  };

  const initData = async () => {
    setIsLoading(true);
    socket.emit("join_room", { class_id });

    const fetchStudentsInClass = new Promise((resolve) => {
      const joinRoomHandler = (data: { students: StudentI[] }) => {
        setStudentsInClass(data.students);
        resolve(data.students);
      };

      const addHandler = (data: { students: StudentI }) => {
        const newData = listAllStudents?.students?.find(
          (item) => item.id === data.students.id
        );

        if (newData) {
          setStudentsInClass((prev) => [...(prev || []), newData]);
        }
        setStudentsOutClass((prev) =>
          prev.filter((item) => item.id !== data.students.id!)
        );
        if (isActionRef.current) {
          toast.success("Data berhasil ditambahkan ke kelas");
          isActionRef.current = false; // Reset ref
        }
      };

      const deleteHandler = (data: { student_id: string }) => {
        const newData = listAllStudents?.students.find(
          (item) => item.id === data.student_id
        );
        if (newData) {
          setStudentsOutClass((prev) => [...(prev || []), newData]);
        }
        setStudentsInClass((prev) =>
          prev?.filter((item) => item.id !== data.student_id)
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
        Promise.resolve(listAllStudents),
        fetchStudentsInClass,
      ]);

      const tempDataOut = (allClass?.students as any[]).filter(
        (item) => !(inClass as any[]).some((inItem) => inItem.id === item.id)
      );

      setStudentsOutClass(tempDataOut ?? []);
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
    studentsInClass,
    studentsOutClass,
    isLoading,
    columns: HeaderClassStudent(),
    handleRowDrop: (
      fromRow: StudentI,
      toRow: StudentI,
      fromIndex: number | null,
      toIndex: number | null,
      targetTableId: string
    ) => {
      if (targetTableId === "C" && fromIndex !== null) {
        handleAddSubject(class_id, fromRow.id ?? "");
      } else if (targetTableId === "D" && fromIndex !== null) {
        handleDeleteSubject(class_id, fromRow.id ?? "");
      }
    },
    isLoadingFetch,
  };
};

export default useClassStudent;
