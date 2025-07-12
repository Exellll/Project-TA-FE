import React from "react";
import { Button } from "react-daisyui";
import ReactSelect from "react-select";

interface Option {
  label: string;
  value: string;
}

type ScheduleDay = "senin" | "selasa" | "rabu" | "kamis" | "jumat" | "sabtu";

type ScheduleGrid = {
  [day in ScheduleDay]?: {
    [time: string]: {
      subject_id: string;
    };
  };
};

interface Props {
  subjects: Option[];
  times: { time: string; isBreak: boolean }[];
  grid: ScheduleGrid;
  onChange: (
    day: ScheduleDay,
    time: string,
    field: "subject_id",
    value: string
  ) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const days: ScheduleDay[] = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];

const ScheduleInputTable = ({
  subjects,
  times,
  grid,
  onChange,
  onSubmit,
  isSubmitting,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th>Jam</th>
            {days.map((day) => (
              <th key={day} className="capitalize">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map(({ time, isBreak }) => (
            <tr key={time}>
              <td className="font-semibold border border-black text-center">{time}</td>
              {isBreak ? (
                <td colSpan={days.length} className="text-center bg-gray-100 text-gray-500 border border-black font-semibold">
                  ISTIRAHAT
                </td>
              ) : (
                days.map((day) => (
                  <td key={`${day}-${time}`} className="border border-black p-1">
                    <ReactSelect
                      options={subjects}
                      value={subjects.find(
                        (s) => s.value === grid?.[day]?.[time]?.subject_id
                      )}
                      onChange={(val) =>
                        onChange(day, time, "subject_id", val?.value || "")
                      }
                      placeholder="Mapel"
                      className="text-sm"
                    />
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
          className="w-[20%] lg:w-[20%] rounded-xl hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Jadwal"}
        </Button>
      </div>
    </div>
  );
};

export default ScheduleInputTable;
