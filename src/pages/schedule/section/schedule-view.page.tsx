import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSchedulesByClassQuery } from "_services/modules/schedule";
import ScheduleViewTable from "components/table/schedule-view-table";

export const scheduleViewRouteName = "/schedule/view/:id";
export default function ScheduleViewPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  const [timeSlots] = useState<string[]>([
    "07:00",
    "07:45",
    "08:30",
    "09:15",
    "10:00",
    "10:30",
    "11:15",
    "12:00",
    "12:45",
    "13:30",
    "14:15",
    "15:00",
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
        if (!newGrid[day]) newGrid[day] = {};
        newGrid[day][start_time] = subject?.title || "-";
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
        <ScheduleViewTable times={timeSlots} grid={grid} />
      )}
    </div>
  );
};
