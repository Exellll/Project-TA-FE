import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "react-daisyui";

import { useGetClassByIdQuery } from "_services/modules/class";
import { useGetSchedulesByClassQuery } from "_services/modules/schedule";
import ScheduleInputTable from "components/table/schedule-table";
import useScheduleForm from "hooks/schedule/useScheduleForm";
import { ScheduleDay } from "_interfaces/schedule.interfaces";

export const scheduleInputRouteName = "/schedule/input/:id";

type TimeSlot = { time: string; isBreak: boolean };

const ScheduleInputPage = (): React.ReactElement => {
    const { id: selectedClassId } = useParams<{ id: string }>();

    const { data: selectedClass, isLoading } = useGetClassByIdQuery(
        { id: selectedClassId! },
        { skip: !selectedClassId }
    );

    const { data } = useGetSchedulesByClassQuery(
        { class_id: selectedClassId! },
        { refetchOnMountOrArgChange: true }
    );

    const scheduleConfig = data?.schedule_config;
    const schedules = data?.schedules ?? [];

    const [startTime, setStartTime] = useState("07:00");
    const [endTime, setEndTime] = useState("14:00");
    const [durationInput, setDurationInput] = useState("");
    const [duration, setDuration] = useState<number | null>(null);
    const [breakDuration, setBreakDuration] = useState(15);
    const [breakTime, setBreakTime] = useState("3,7");
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

    const {
        grid,
        setGrid,
        handleChange,
        handleSubmit,
        isSubmitting,
    } = useScheduleForm(
        timeSlots.map((slot) => slot.time),
        selectedClassId!,
        scheduleConfig && {
            startTime: scheduleConfig.start_time,
            endTime: scheduleConfig.end_time,
            duration: scheduleConfig.duration,
            breakTime: scheduleConfig.break_time,
            breakDuration: scheduleConfig.break_duration,
        }
    );

    const subjectOptions =
        selectedClass?.class_subject.map((subj) => ({
            label: subj.title,
            value: subj.subject_id,
        })) ?? [];

    useEffect(() => {
        if (!scheduleConfig) return;
        setStartTime(scheduleConfig.start_time);
        setEndTime(scheduleConfig.end_time);
        setDuration(scheduleConfig.duration);
        setDurationInput(String(scheduleConfig.duration));
        setBreakDuration(scheduleConfig.break_duration);
        setBreakTime(scheduleConfig.break_time || "");
    }, [scheduleConfig]);

    useEffect(() => {
        const generateTimeSlots = () => {
            if (!startTime || !endTime) return;
            
            const [startHour, startMin] = startTime.split(":").map(Number);
            const [endHour, endMin] = endTime.split(":").map(Number);
            const breaks = breakTime
                .split(",")
                .map((s) => parseInt(s.trim()))
                .filter((i) => !isNaN(i));

            const slots: TimeSlot[] = [];
            let current = startHour * 60 + startMin;
            const end = endHour * 60 + endMin;
            let index = 0;

            while (current < end) {
                const hour = String(Math.floor(current / 60)).padStart(2, "0");
                const min = String(current % 60).padStart(2, "0");
                const time = `${hour}:${min}`;
                const isBreak = breaks.includes(index);
                slots.push({ time, isBreak });
                current += isBreak ? breakDuration : duration ?? 30;
                index++;
            }

            setTimeSlots(slots);
        };

        if (duration) generateTimeSlots();
    }, [startTime, endTime, duration, breakDuration, breakTime]);

    useEffect(() => {
        if (!schedules.length) return;

        const initialGrid: typeof grid = {};
        schedules.forEach(({ day, start_time, subject }) => {
            const dayKey = day as ScheduleDay;
            const time = start_time.slice(0, 5);
            const subjectId = subject?.id || "";

            if (!initialGrid[dayKey]) initialGrid[dayKey] = {};
            initialGrid[dayKey]![time] = { subject_id: subjectId };
        });

        setGrid(initialGrid);
    }, [schedules, setGrid]);

    const handleDurationBlur = () => {
        const value = Number(durationInput);
        if (!durationInput) {
            toast.error("Durasi tidak boleh kosong");
            setDuration(null);
        } else if (value < 30) {
            toast.error("Durasi minimal adalah 30 menit");
            setDuration(null);
            setDurationInput("");
        } else {
            setDuration(value);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Input Jadwal Kelas</h1>
            {isLoading && <p>Memuat data kelas...</p>}

            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-300">
                <h2 className="text-lg font-semibold mb-2">Atur Waktu Jadwal Otomatis</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InputField label="Jam Mulai" type="time" value={startTime} onChange={setStartTime} />
                    <InputField label="Jam Selesai" type="time" value={endTime} onChange={setEndTime} />
                    <InputField
                        label="Durasi per Mata Pelajaran (menit)"
                        type="number"
                        value={durationInput}
                        onChange={setDurationInput}
                        onBlur={handleDurationBlur}
                    />
                    <InputField
                        label="Durasi Istirahat (menit)"
                        type="number"
                        value={breakDuration}
                        onChange={(val) => setBreakDuration(Number(val))}
                    />
                    <InputField
                        label="Index Waktu Istirahat (contoh: 3,6)"
                        type="text"
                        value={breakTime}
                        onChange={setBreakTime}
                    />
                </div>
            </div>

            {selectedClass && (
                <ScheduleInputTable
                    subjects={subjectOptions}
                    times={timeSlots}
                    grid={grid}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    startTime={startTime}
                    endTime={endTime}
                    duration={duration!}
                    breakTime={breakTime}
                    breakDuration={breakDuration}
                />
            )}
        </div>
    );
};

export default ScheduleInputPage;

interface InputFieldProps {
    label: string;
    type: string;
    value: string | number;
    onChange: (val: string) => void;
    onBlur?: () => void;
}

const InputField = ({ label, type, value, onChange, onBlur }: InputFieldProps) => (
    <div>
        <label className="text-sm font-medium mr-4">{label}</label>
        <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
        />
    </div>
);
