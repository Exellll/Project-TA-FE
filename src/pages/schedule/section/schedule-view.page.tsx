import React, { useEffect, useMemo, useState } from "react";
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
  const { data, isLoading } = useGetSchedulesByClassQuery(
    { class_id: id! },
    { skip: !id }
  );

  const scheduleData = data?.schedules || [];
  const scheduleConfig = data?.schedule_config;

  // Generate timeSlots dari config
  const timeSlots: TimeSlot[] = useMemo(() => {
    if (!scheduleConfig) return [];

    const {
      start_time,
      end_time,
      duration,
      break_duration,
      break_time,
    } = scheduleConfig;

    const breaks = break_time.split(",").map((b: string) => parseInt(b.trim()));
    const result: TimeSlot[] = [];

    const toMinutes = (timeStr: string) => {
      const [h, m] = timeStr.split(":").map(Number);
      return h * 60 + m;
    };

    const toTimeStr = (mins: number) => {
      const h = Math.floor(mins / 60)
        .toString()
        .padStart(2, "0");
      const m = (mins % 60).toString().padStart(2, "0");
      return `${h}:${m}`;
    };

    let start = toMinutes(start_time);
    const end = toMinutes(end_time);

    let index = 0;
    while (start < end) {
      if (breaks.includes(index)) {
        result.push({
          time: toTimeStr(start),
          isBreak: true,
        });
        start += break_duration;
      } else {
        result.push({
          time: toTimeStr(start),
          isBreak: false,
        });
        start += duration;
      }
      index++;
    }

    return result;
  }, [scheduleConfig]);

  const [grid, setGrid] = useState<{
    [day: string]: { [time: string]: string };
  }>({});

  useEffect(() => {
    if (scheduleData.length > 0) {
      const newGrid: typeof grid = {};

      for (const schedule of scheduleData) {
        const { day, start_time, subject } = schedule;
        const timeKey = start_time.slice(0, 5); // misal: "07:00"
        if (!newGrid[day]) newGrid[day] = {};
        newGrid[day][timeKey] = subject?.title || "-";
      }

      setGrid(newGrid);
    }
  }, [scheduleData]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Jadwal Kelas</h1>

      {isLoading || !scheduleConfig ? (
        <p>Memuat jadwal...</p>
      ) : (
        <ScheduleViewTable timeSlots={timeSlots} grid={grid} />
      )}
    </div>
  );
}
