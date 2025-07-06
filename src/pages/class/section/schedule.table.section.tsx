import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useDrop, useDrag } from "react-dnd";

type ScheduleItem = {
  day: string;
  timeSlot: string;
  subject: string;
};

type ScheduleTableProps = {
  initialSchedule: ScheduleItem[];
  daysOfWeek?: string[];
  timeSlots?: string[];
  onSearch?: (query: string) => void;
  onRemoveSubject?: (subject: string) => void; // New prop to remove item from schedule
};

const ItemTypes = {
  SUBJECT: "subject",
};

const defaultDaysOfWeek = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
const defaultTimeSlots = [
  "07:00 - 08:00",
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
];

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  initialSchedule,
  daysOfWeek = defaultDaysOfWeek,
  timeSlots = defaultTimeSlots,
  onSearch,
  onRemoveSubject,
}) => {
  const [scheduleState, setScheduleState] =
    useState<ScheduleItem[]>(initialSchedule);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };
  const moveScheduleItem = (
    fromDay: string,
    fromTimeSlot: string,
    toDay?: string,
    toTimeSlot?: string,
    subject?: string
  ) => {
    setScheduleState((prevSchedule) => {
      // Remove item if dropped outside (to SubjectList)
      if (!toDay || !toTimeSlot) {
        onRemoveSubject?.(subject || "");
        return prevSchedule.filter(
          (item) => !(item.day === fromDay && item.timeSlot === fromTimeSlot)
        );
      }

      // Move or add within the schedule
      const updatedSchedule = prevSchedule.filter(
        (item) => !(item.day === fromDay && item.timeSlot === fromTimeSlot)
      );
      updatedSchedule.push({
        day: toDay,
        timeSlot: toTimeSlot,
        subject: subject || "",
      });
      return updatedSchedule;
    });
  };

  const DroppableCell: React.FC<{ day: string; timeSlot: string }> = ({
    day,
    timeSlot,
  }) => {
    const scheduleItem = scheduleState.find(
      (item) => item.day === day && item.timeSlot === timeSlot
    );

    const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.SUBJECT,
      drop: (item: {
        fromDay?: string;
        fromTimeSlot?: string;
        subject: string;
      }) => {
        moveScheduleItem(
          item.fromDay || day,
          item.fromTimeSlot || timeSlot,
          day,
          timeSlot,
          item.subject
        );
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.SUBJECT,
      item: {
        fromDay: day,
        fromTimeSlot: timeSlot,
        subject: scheduleItem?.subject || "",
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      canDrag: !!scheduleItem,
    });

    return (
      <td
        ref={(node) => drag(drop(node))}
        className={`border p-2 ${isOver ? "bg-gray-200" : ""} ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        {scheduleItem ? scheduleItem.subject : ""}
      </td>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-lg font-semibold">Mata Pelajaran</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="absolute right-2 top-2">
            <MagnifyingGlassIcon className="w-6 h-6 text-blue-500" />
          </button>
        </div>
      </div>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-200 text-gray-700 font-semibold text-left">
              Time
            </th>
            {daysOfWeek.map((day) => (
              <th
                key={day}
                className="px-4 py-2 border border-gray-200 text-gray-700 font-semibold text-left"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot) => (
            <tr key={timeSlot}>
              <td className="px-4 py-2 border border-gray-200 text-gray-700 font-semibold text-left">
                {timeSlot}
              </td>
              {daysOfWeek.map((day) => (
                <DroppableCell
                  key={`${day}-${timeSlot}`}
                  day={day}
                  timeSlot={timeSlot}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
