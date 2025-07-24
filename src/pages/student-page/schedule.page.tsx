import StudentContainer from "layout/container/index-student";
import { useGetSchedulesByStudentQuery } from "_services/modules/schedule";
import { useAppSelector } from "store";
import { useEffect, useMemo, useState } from "react";
import ScheduleViewTable from "components/table/schedule-view-table";
import { isEqual } from "lodash";

const getIdFromToken = (token: string): string | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
};

type TimeSlot = {
  time: string;
  isBreak: boolean;
};

const StudentSchedulePage: React.FC = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const studentId = accessToken ? getIdFromToken(accessToken) : null;

  const { data, isLoading } = useGetSchedulesByStudentQuery(
    studentId ? { student_id: studentId } : { student_id: "" }
  );

  const schedules = data?.schedules || [];
  const scheduleConfig = data?.schedule_config; // <- pastikan ini tersedia di backend

  const schoolYears = Array.from(new Set(schedules.map((item) => item.school_year)));
  const semesters = Array.from(new Set(schedules.map((item) => item.semester)));

  const [selectedYear, setSelectedYear] = useState<string | "all">("all");
  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");

  const filteredSchedules = schedules.filter((item) => {
    const matchYear = selectedYear === "all" || item.school_year === selectedYear;
    const matchSemester = selectedSemester === "all" || item.semester === selectedSemester;
    return matchYear && matchSemester;
  });

  const timeSlots: TimeSlot[] = useMemo(() => {
    if (!scheduleConfig) return [];

    const {
      start_time,
      end_time,
      duration,
      break_duration,
      break_time,
    } = scheduleConfig;

    const breaks = break_time?.split(",").map((b: string) => parseInt(b.trim())) || [];
    const result: TimeSlot[] = [];

    const toMinutes = (timeStr: string) => {
      const [h, m] = timeStr.split(":").map(Number);
      return h * 60 + m;
    };

    const toTimeStr = (mins: number) => {
      const h = Math.floor(mins / 60).toString().padStart(2, "0");
      const m = (mins % 60).toString().padStart(2, "0");
      return `${h}:${m}`;
    };

    let start = toMinutes(start_time);
    const end = toMinutes(end_time);

    let index = 0;
    while (start < end) {
      if (breaks.includes(index)) {
        result.push({ time: toTimeStr(start), isBreak: true });
        start += break_duration;
      } else {
        result.push({ time: toTimeStr(start), isBreak: false });
        start += duration;
      }
      index++;
    }

    return result;
  }, [scheduleConfig]);

  const [grid, setGrid] = useState<{ [day: string]: { [time: string]: string } }>({});

  useEffect(() => {
    const newGrid: typeof grid = {};

    for (const item of filteredSchedules) {
      const day = item.day;
      const time = item.start_time.slice(0, 5);
      const title = item.subject.title;

      if (!newGrid[day]) newGrid[day] = {};
      newGrid[day][time] = title;
    }

    if (!isEqual(grid, newGrid)) {
      setGrid(newGrid);
    }
  }, [filteredSchedules]);

  return (
    <StudentContainer className="p-4">
      <div className="max-w-6xl mx-auto mt-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Jadwal Saya</h1>
          <p className="text-gray-600 text-lg">Berikut adalah jadwal pelajaran Anda.</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-sm text-gray-700 mr-2">Tahun Ajaran:</label>
            <select
              className="border rounded px-2 py-1"
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(e.target.value === "all" ? "all" : e.target.value)
              }
            >
              <option value="all">Semua</option>
              {schoolYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700 mr-2">Semester:</label>
            <select
              className="border rounded px-2 py-1"
              value={selectedSemester}
              onChange={(e) =>
                setSelectedSemester(e.target.value === "all" ? "all" : Number(e.target.value))
              }
            >
              <option value="all">Semua</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        {isLoading || !scheduleConfig ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner text-blue-500" />
          </div>
        ) : filteredSchedules.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Tidak ada jadwal yang cocok dengan filter.
          </div>
        ) : (
          <ScheduleViewTable timeSlots={timeSlots} grid={grid} />
        )}
      </div>
    </StudentContainer>
  );
};

export default StudentSchedulePage;
