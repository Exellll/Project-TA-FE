import React, { useEffect, useState } from "react";
import { DragDropTable } from "components/table/dnd-table";
import { io, Socket } from "socket.io-client";
import {
  ClassServerToClientEvents,
  ClassClientToServerEvents,
} from "_interfaces/class-subject.interface";
import useClassSubject from "hooks/class/useClassSubject";

interface Subject extends Record<string, string> {
  title: string;
  group: string;
}

interface SubjectListProps {
  class_id: string;
}
// Pindahkan di luar hook agar instance socket tunggal
const socket: Socket<ClassServerToClientEvents, ClassClientToServerEvents> = io(
  `${process.env.REACT_APP_SOCKET_HOST}/class_subject`,
  {
    path: "/socket.io",
    transports: ["websocket"],
  }
);

export const SubjectList: React.FC<SubjectListProps> = ({ class_id }) => {
  const {
    isLoading,
    isLoadingFetchSubject,
    SubjectsInClass,
    columns,
    handleRowDrop,
    SubjectsOutClass,
  } = useClassSubject(socket, class_id);

  return (
    <div>
      <>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            Daftar Mata Pelajaran Di Kelas
          </h2>
          <DragDropTable
            data={SubjectsInClass ?? []}
            columns={columns}
            isLoading={isLoading || isLoadingFetchSubject}
            listAccessDrop={["B"]}
            onRowDrop={(fromRow, toRow, fromIndex, toIndex, targetTableId) => {
              handleRowDrop(
                fromRow!,
                toRow!,
                fromIndex,
                toIndex,
                targetTableId
              );
            }}
            tableId={"A"}
          />
        </div>
        <div className="h-8"></div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Daftar Mata Pelajaran yang Tersedia</h2>
          <DragDropTable
            data={SubjectsOutClass!}
            columns={columns}
            isLoading={isLoading || isLoadingFetchSubject}
            listAccessDrop={["B"]}
            onRowDrop={(fromRow, toRow, fromIndex, toIndex, targetTableId) => {
              handleRowDrop(
                fromRow!,
                toRow!,
                fromIndex,
                toIndex,
                targetTableId
              );
            }}
            tableId={"B"}
          />
        </div>
      </>
    </div>
  );
};
