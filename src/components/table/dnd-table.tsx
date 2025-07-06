import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  ROW: "row",
};

export interface Columns<T> {
  fieldId: string; // Field key dari data
  label: string; // Label header kolom
  render?: (data: T) => React.ReactNode; // Fungsi render untuk isi kolom
  renderHeader?: () => React.ReactNode; // Fungsi render untuk header kolom
}

interface DragDropTableProps<T extends Record<string, any>> {
  tableId: string; // Identifier untuk tabel
  data: T[];
  columns: Columns<T>[];
  isLoading?: boolean;
  listAccessDrop: string[];
  onRowDrop: (
    fromRow: T | null,
    toRow: T | null,
    fromIndex: number | null,
    toIndex: number | null,
    targetTableId: string
  ) => void; // Logika drop
}

export const DragDropTable = <T extends Record<string, any>>({
  tableId,
  data,
  columns,
  onRowDrop,
  listAccessDrop,
  isLoading = false,
}: DragDropTableProps<T>) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.ROW,
    drop: (item: { row: T; index: number; sourceTableId: string }) => {
      if (item.sourceTableId !== tableId) {
        // Drop hanya pada tabel berbeda
        onRowDrop(item.row, null, item.index, null, tableId);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moveRow = (dragIndex: number, hoverIndex: number, draggedRow: T) => {
    if (dragIndex !== hoverIndex) {
      onRowDrop(
        draggedRow,
        data[hoverIndex] || null,
        dragIndex,
        hoverIndex,
        tableId
      );
    }
  };

  return (
    <div
      ref={drop}
      className={`overflow-auto min-h-[250px] border border-gray-200 rounded-lg ${
        isOver ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <table className="w-full border-collapse table-auto">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border p-2 font-semibold text-left">
                {column.renderHeader ? column.renderHeader() : column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Skeleton loading rows
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="animate-pulse">
                {columns.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-4 border bg-gray-200 h-6 rounded"
                  ></td>
                ))}
              </tr>
            ))
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <DraggableRow<T>
                key={index}
                index={index}
                data={item}
                columns={columns}
                moveRow={moveRow}
                sourceTableId={tableId}
              />
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

interface DraggableRowProps<T extends Record<string, any>> {
  index: number;
  data: T;
  columns: Columns<T>[];
  moveRow: (dragIndex: number, hoverIndex: number, draggedRow: T) => void;
  sourceTableId: string;
}

const DraggableRow = <T extends Record<string, any>>({
  index,
  data,
  columns,
  moveRow,
  sourceTableId,
}: DraggableRowProps<T>) => {
  const ref = React.useRef<HTMLTableRowElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ROW,
    item: { row: data, index, sourceTableId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ROW,
    canDrop: (item: { row: T; index: number; sourceTableId: string }) => {
      // Tidak bisa drop ke tabel asal atau ke baris lain dalam tabel yang sama
      return item.sourceTableId !== sourceTableId;
    },
    drop: (item: { row: T; index: number; sourceTableId: string }) => {
      if (item.sourceTableId === sourceTableId && item.index !== index) return;
      moveRow(item.index, index, item.row);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <tr
      ref={ref}
      className={`hover:bg-gray-50 ${isDragging ? "opacity-50" : ""} ${
        isDragging ? "bg-green-200" : ""
      }`}
    >
      {columns.map((column, colIndex) => (
        <td key={colIndex} className="border p-2">
          {column.render ? column.render(data) : data[column.fieldId] || "—"}
        </td>
      ))}
    </tr>
  );
};
