import React from "react";

interface TimeSlot {
  time: string;
  isBreak: boolean;
}

interface ScheduleViewProps {
  timeSlots: TimeSlot[];
  grid: {
    [day: string]: {
      [time: string]: string;
    };
  };
}

const days = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];

const ScheduleViewTable: React.FC<ScheduleViewProps> = ({ timeSlots, grid }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border border-black">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border border-black bg-gray-100">Jam</th>
            {days.map((day) => (
              <th key={day} className="border border-black capitalize bg-gray-100">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {timeSlots.map((slot) => (
            <tr key={slot.time}>
              <td className="border border-black font-semibold">
                {slot.time}
              </td>
              {days.map((day) => (
                <td key={`${day}-${slot.time}`} className="border border-black text-sm text-center">
                  {slot.isBreak ? (
                    <span className="italic text-gray-500">Istirahat</span>
                  ) : (
                    grid?.[day]?.[slot.time] || "-"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleViewTable;
