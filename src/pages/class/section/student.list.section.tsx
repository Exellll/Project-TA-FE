import React, { useEffect, useState } from "react";
import { DragDropTable } from "components/table/dnd-table";
import { io, Socket } from "socket.io-client";
import {
  ClassServerToClientEvents,
  ClassClientToServerEvents,
} from "_interfaces/class-subject.interface";
import useClassStudent from "hooks/class/useClassStudent";

interface StudentsListProps {
  class_id: string;
}
// Pindahkan di luar hook agar instance socket tunggal
const socket: Socket<ClassServerToClientEvents, ClassClientToServerEvents> = io(
  `${process.env.REACT_APP_SOCKET_HOST}/class_student`,
  {
    path: "/socket.io",
    transports: ["websocket"],
  }
);

export const StudentList: React.FC<StudentsListProps> = ({ class_id }) => {
  const {
    isLoading,
    isLoadingFetch,
    studentsInClass,
    columns,
    handleRowDrop,
    studentsOutClass,
  } = useClassStudent(socket, class_id);

  return (
    <div>
      <>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            Daftar Students Di Kelas
          </h2>
          <DragDropTable
            data={studentsInClass ?? []}
            columns={columns}
            isLoading={isLoading || isLoadingFetch}
            listAccessDrop={["D"]}
            onRowDrop={(fromRow, toRow, fromIndex, toIndex, targetTableId) => {
              handleRowDrop(
                fromRow!,
                toRow!,
                fromIndex,
                toIndex,
                targetTableId
              );
            }}
            tableId={"C"}
          />
        </div>
        <div className="h-8"></div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Daftar Students</h2>
          <DragDropTable
            data={studentsOutClass!}
            columns={columns}
            isLoading={isLoading || isLoadingFetch}
            listAccessDrop={["C"]}
            onRowDrop={(fromRow, toRow, fromIndex, toIndex, targetTableId) => {
              handleRowDrop(
                fromRow!,
                toRow!,
                fromIndex,
                toIndex,
                targetTableId
              );
            }}
            tableId={"D"}
          />
        </div>
      </>
    </div>
  );
};
