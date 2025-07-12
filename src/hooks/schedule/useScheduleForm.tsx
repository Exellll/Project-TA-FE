import { useState } from "react";
import { useCreateSchedulesBulkMutation } from "_services/modules/schedule";
import { SchedulePayload } from "_interfaces/schedule.interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ScheduleDay = "senin" | "selasa" | "rabu" | "kamis" | "jumat" | "sabtu";

type GridState = {
  [day in ScheduleDay]?: {
    [time: string]: {
      subject_id: string;
    };
  };
}

export default function useScheduleForm(times: string[], classId: string) {
  const [grid, setGrid] = useState<GridState>({});
  const [createBulk, { isLoading }] = useCreateSchedulesBulkMutation();

  const navigate = useNavigate();
  
  const onChange = (
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

  const onSubmit = async () => {
    const schedules: SchedulePayload[] = [];

    for (const day in grid) {
      const slots = grid[day as ScheduleDay];
      if (!slots) continue;

      for (const time in slots) {
        const subject_id = slots[time].subject_id;
        if (subject_id) {
          schedules.push({
            day: day as ScheduleDay,
            start_time: time,
            end_time: calculateEndTime(time),
            subject_id: subject_id,
            class_id: classId,
          });
        }
      }
    }

    try{
      await createBulk(schedules);
      navigate("/schedule");
      toast.success("Jadwal berhasil disimpan!");
    }catch(error) {
      console.error("Gagal menyimpan jadwal:", error);
      toast.error("Gagal menyimpan jadwal. Silakan coba lagi.");
    }

  };

  return {
    grid,
    onChange,
    onSubmit,
    isSubmitting: isLoading,
    setGrid,
  };
}

// Tambahkan logic default end_time (misal durasi 45 menit)
function calculateEndTime(start: string): string {
  const [h, m] = start.split(":").map(Number);
  const end = new Date();
  end.setHours(h);
  end.setMinutes(m + 45);

  const hh = end.getHours().toString().padStart(2, "0");
  const mm = end.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}
