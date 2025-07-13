import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSchedulesByClassQuery } from "_services/modules/schedule";
import ScheduleViewTable from "components/table/schedule-view-table";

type TimeSlot = {
  time: string;
  isBreak: boolean;
};

export const scheduleViewRouteName = "/schedule/view/:id";
export default function ScheduleViewPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  const [timeSlots] = useState<TimeSlot[]>([
    { time: "07:00", isBreak: false },
    { time: "07:45", isBreak: false },
    { time: "08:30", isBreak: false },
    { time: "09:15", isBreak: true },
    { time: "09:30", isBreak: false },
    { time: "10:15", isBreak: false },
    { time: "11:00", isBreak: false },
    { time: "11:45", isBreak: true },
    { time: "12:00", isBreak: false },
    { time: "12:45", isBreak: false },
    { time: "13:30", isBreak: false },
    { time: "14:15", isBreak: false },
  ]);

  const { data, isLoading } = useGetSchedulesByClassQuery(
    { class_id: id! },
    { skip: !id }
  );

  const scheduleData = data?.schedules || [];

  const [grid, setGrid] = useState<{
    [day: string]: { [time: string]: string };
  }>({});

  useEffect(() => {
    if (scheduleData.length > 0) {
      const newGrid: typeof grid = {};

      for (const schedule of scheduleData) {
        const { day, start_time, subject } = schedule;
        const timeKey = start_time.slice(0, 5); // penting
        if (!newGrid[day]) newGrid[day] = {};
        newGrid[day][timeKey] = subject?.title || "-";
      }

      setGrid(newGrid);
    }
  }, [data]);


  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Jadwal Kelas</h1>

      {isLoading ? (
        <p>Memuat jadwal...</p>
      ) : (
        <ScheduleViewTable timeSlots={timeSlots} grid={grid} />
      )}
    </div>
  );
};
