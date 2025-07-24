import { useState } from "react";
import {
  useCreateSchedulesBulkMutation,
  useCreateSchedulesWithConfigMutation,
  useGetSchedulesByClassQuery,
} from "_services/modules/schedule";
import { SchedulePayload } from "_interfaces/schedule.interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ScheduleDay = "senin" | "selasa" | "rabu" | "kamis" | "jumat" | "sabtu";

export type GridState = {
  [day in ScheduleDay]?: {
    [time: string]: {
      subject_id: string;
    };
  };
};

export type ScheduleConfig = {
  startTime: string;
  endTime: string;
  duration: number;
  breakTime: string;
  breakDuration: number;
};

export default function useScheduleForm(
  times: string[],
  classId: string,
  initialConfig?: ScheduleConfig
) {
  const [grid, setGrid] = useState<GridState>({});
  const [createWithConfig, { isLoading }] = useCreateSchedulesWithConfigMutation();
  const [createBulk] = useCreateSchedulesBulkMutation();
  const navigate = useNavigate();

  const { refetch } = useGetSchedulesByClassQuery(
    { class_id: classId! },
    { skip: !classId }
  );

  const handleChange = (
    day: ScheduleDay,
    time: string,
    field: "subject_id",
    value: string
  ) => {
    setGrid((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: {
          ...(prev[day]?.[time] || {}),
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (config: ScheduleConfig) => {
    const schedules = generateSchedulePayload(grid, classId, config);

    if (schedules.length === 0) {
      toast.warning("Tidak ada jadwal yang diinput");
      return;
    }

    const shouldUpdateConfig = !initialConfig || hasConfigChanged(initialConfig, config);

    try {
      if (shouldUpdateConfig) {
        await createWithConfig({
          schedules,
          config: {
            start_time: config.startTime,
            end_time: config.endTime,
            duration: config.duration,
            break_time: config.breakTime,
            break_duration: config.breakDuration,
          },
        });
      } else {
        await createBulk(schedules);
      }

      navigate("/schedule");
      await refetch();
      toast.success("Jadwal berhasil disimpan!");
    } catch {
      toast.error("Gagal menyimpan jadwal");
    }
  };

  return {
    grid,
    setGrid,
    handleChange,
    handleSubmit,
    isSubmitting: isLoading,
  };
}

function generateSchedulePayload(
  grid: GridState,
  classId: string,
  config: ScheduleConfig
): SchedulePayload[] {
  const result: SchedulePayload[] = [];

  for (const day in grid) {
    const slots = grid[day as keyof GridState];
    if (!slots) continue;

    for (const time in slots) {
      const subject_id = slots[time].subject_id;
      if (subject_id) {
        result.push({
          day: day as ScheduleDay,
          start_time: time,
          end_time: calculateEndTime(time, config.duration),
          subject_id,
          class_id: classId,
        });
      }
    }
  }

  return result;
}

function hasConfigChanged(a: ScheduleConfig, b: ScheduleConfig): boolean {
  return (
    a.startTime !== b.startTime ||
    a.endTime !== b.endTime ||
    a.duration !== b.duration ||
    a.breakTime !== b.breakTime ||
    a.breakDuration !== b.breakDuration
  );
}

function calculateEndTime(start: string, duration: number): string {
  const [hour, minute] = start.split(":").map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute + duration);

  return date.toTimeString().slice(0, 5);
}
