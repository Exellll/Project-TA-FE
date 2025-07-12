import React from "react";

interface ScheduleViewProps {
  times: string[];
  grid: {
    [day: string]: {
      [time: string]: string; // nama mapel
    };
  };
}

const days = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];

const ScheduleViewTable: React.FC<ScheduleViewProps> = ({ times, grid }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border border-black">
        <thead>
          <tr>
            <th className="border border-black bg-gray-100">Jam</th>
            {days.map((day) => (
              <th key={day} className="border border-black capitalize bg-gray-100">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="border border-black font-semibold">{time.slice(0, 5)}</td>
              {days.map((day) => (
                <td key={`${day}-${time}`} className="border border-black text-sm text-center">
                  {grid?.[day]?.[time] || "-"}
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
