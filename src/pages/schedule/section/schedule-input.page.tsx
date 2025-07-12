import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetClassByIdQuery } from "_services/modules/class";
import useScheduleForm from "hooks/schedule/useScheduleForm";
import ScheduleInputTable from "components/table/schedule-table";
import { useGetSchedulesByClassQuery } from "_services/modules/schedule";
import { ScheduleDay } from "_interfaces/schedule.interfaces";
import { Input, Button, Checkbox } from "react-daisyui";

type TimeSlot = {
    time: string;
    isBreak: boolean;
};

export const scheduleInputRouteName = "/schedule/input/:id";

export default function ScheduleInputPage(): React.ReactElement {
    const { id: selectedClassId } = useParams<{ id: string }>();

    const { data: selectedClass, isLoading } = useGetClassByIdQuery(
        { id: selectedClassId! },
        { skip: !selectedClassId }
    );

    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
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

    const {
        grid,
        setGrid,
        onChange,
        onSubmit,
        isSubmitting,
    } = useScheduleForm(timeSlots.map((s) => s.time), selectedClassId!);

    const subjectsOptions =
        selectedClass?.class_subject.map((cs) => ({
            label: cs.title,
            value: cs.subject_id,
        })) || [];

    const { data } = useGetSchedulesByClassQuery({ class_id: selectedClassId! }, { refetchOnMountOrArgChange: true });

    const scheduleData = data?.schedules || [];

    useEffect(() => {
        if (data && scheduleData.length > 0) {
            const initialGrid: typeof grid = {};

            for (const schedule of scheduleData) {
                const day = schedule.day as ScheduleDay;
                const startTime = schedule.start_time.slice(0, 5);
                const subjectId = schedule.subject?.id || "";

                if (!initialGrid[day]) {
                    initialGrid[day] = {};
                }

                initialGrid[day]![startTime] = {
                    subject_id: subjectId,
                };
            }

            setGrid(initialGrid);
        }
    }, [data, scheduleData, setGrid]);

    const handleAddTimeSlot = () => {
        setTimeSlots([...timeSlots, { time: "", isBreak: false }]);
    };

    const handleTimeSlotChange = (index: number, field: "time" | "isBreak", value: string | boolean) => {
        const newSlots = [...timeSlots];
        newSlots[index] = {
            ...newSlots[index],
            [field]: value,
        };
        setTimeSlots(newSlots);
    };

    const handleRemoveTimeSlot = (index: number) => {
        setTimeSlots((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Input Jadwal Kelas</h1>

            {isLoading && <p>Memuat data kelas...</p>}

            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-300">
                <h2 className="text-lg font-semibold mb-2">Atur Time Slots</h2>

                <div className="space-y-2">
                    {timeSlots.map((slot, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                type="time"
                                value={slot.time}
                                onChange={(e) => handleTimeSlotChange(index, "time", e.target.value)}
                                className="w-[120px]"
                            />
                            <input
                                type="checkbox"
                                className=""
                                checked={slot.isBreak}
                                onChange={(e) => handleTimeSlotChange(index, "isBreak", e.target.checked)}
                            />
                            <span className="text-sm">Istirahat</span>
                            {timeSlots.length > 1 && (
                                <Button className="border-black hover:text-red-500 bg-gray-100 text-black hover:bg-white/90 hover:border-red-500" size="sm" onClick={() => handleRemoveTimeSlot(index)}>
                                    Hapus
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <Button className="mt-3 hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon" size="sm" onClick={handleAddTimeSlot}>
                    + Tambah Time Slot
                </Button>
            </div>

            {/* === Tabel Jadwal === */}
            {selectedClass && (
                <ScheduleInputTable
                    subjects={subjectsOptions}
                    times={timeSlots}
                    grid={grid}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                />
            )}
        </div>
    );
}
