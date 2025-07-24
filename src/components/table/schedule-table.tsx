import React from "react";
import { Button } from "react-daisyui";
import ReactSelect from "react-select";

export type ScheduleDay = "senin" | "selasa" | "rabu" | "kamis" | "jumat" | "sabtu";

interface Option {
  label: string;
  value: string;
}

interface TimeSlot {
  time: string;
  isBreak: boolean;
}

type Grid = {
  [day in ScheduleDay]?: {
    [time: string]: {
      subject_id: string;
    };
  };
};

interface Props {
  subjects: Option[];
  times: TimeSlot[];
  grid: Grid;
  onChange: (day: ScheduleDay, time: string, field: "subject_id", value: string) => void;
  onSubmit: (config: {
    startTime: string;
    endTime: string;
    duration: number;
    breakTime: string;
    breakDuration: number;
  }) => void;
  isSubmitting: boolean;
  startTime: string;
  endTime: string;
  duration: number;
  breakTime: string;
  breakDuration: number;
}

const days: ScheduleDay[] = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];

const ScheduleInputTable: React.FC<Props> = ({
  subjects,
  times,
  grid,
  onChange,
  onSubmit,
  isSubmitting,
  startTime,
  endTime,
  duration,
  breakTime,
  breakDuration,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full table-fixed border border-black">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="w-[100px] border border-black">Jam</th>
            {days.map((day) => (
              <th key={day} className="capitalize border border-black">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map(({ time, isBreak }) => (
            <tr key={time}>
              <td className="font-semibold border border-black text-center">{time}</td>
              {isBreak ? (
                <td
                  colSpan={days.length}
                  className="text-center bg-gray-100 text-gray-500 border border-black font-semibold"
                >
                  ISTIRAHAT
                </td>
              ) : (
                days.map((day) => (
                  <td key={`${day}-${time}`} className="border border-black p-1 px-2 py-2 min-w-full w-full">
                    <div className="w-full">
                      <ReactSelect
                        isClearable
                        options={subjects}
                        value={subjects.find(
                          (s) => s.value === grid?.[day]?.[time]?.subject_id
                        )}
                        onChange={(val) =>
                          onChange(day, time, "subject_id", val?.value || "")
                        }
                        placeholder="Mapel"
                        className="w-full h-[38px] text-base"
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        styles={{
                          container: (base) => ({
                            ...base,
                            width: '100%',
                          }),
                          control: (base) => ({
                            ...base,
                            minHeight: '38px',
                            fontSize: '14px',
                          }),
                          menu: (base) => ({
                            ...base,
                            zIndex: 9999,
                            width: '220px',
                          }),
                          singleValue: (base) => ({
                            ...base,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%',
                          }),
                          valueContainer: (base) => ({
                            ...base,
                            maxWidth: '100%',
                            overflow: 'hidden',
                          }),
                        }}
                      />
                    </div>
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <Button
          onClick={() =>
            onSubmit({
              startTime,
              endTime,
              duration,
              breakTime,
              breakDuration,
            })
          }
          disabled={isSubmitting}
          loading={isSubmitting}
          className="w-[20%] rounded-xl hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Jadwal"}
        </Button>
      </div>
    </div>
  );
};

export default ScheduleInputTable;
