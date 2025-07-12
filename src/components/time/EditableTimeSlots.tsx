import React, { useState, useEffect } from "react";

type TimeSlot = {
  time: string;
  isBreak: boolean;
};

export default function EditableTimeSlots({
  onChange,
}: {
  onChange: (slots: TimeSlot[]) => void;
}) {
  const [slots, setSlots] = useState<TimeSlot[]>([
    { time: "", isBreak: false },
  ]);

  const handleSlotChange = (index: number, field: "time" | "isBreak", value: any) => {
    const updated = [...slots];
    updated[index] = {
      ...updated[index],
      [field]: field === "isBreak" ? value.target.checked : value.target.value,
    };
    setSlots(updated);
  };

  // Auto-add row if last filled
  useEffect(() => {
    const last = slots[slots.length - 1];
    if (last.time && slots.length < 30) {
      setSlots([...slots, { time: "", isBreak: false }]);
    }
  }, [slots]);

  // Notify parent
  useEffect(() => {
    const filtered = slots.filter((slot) => slot.time); // hanya yg valid
    onChange(filtered);
  }, [slots, onChange]);

  const removeSlot = (index: number) => {
    const updated = slots.filter((_, i) => i !== index);
    setSlots(updated);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border border-black">
        <thead>
          <tr className="bg-gray-100 border-b border-black">
            <th className="border-r border-black">Jam</th>
            <th className="border-r border-black">Istirahat?</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, idx) => (
            <tr key={idx} className="border-b border-black">
              <td className="border-r border-black">
                <input
                  type="time"
                  value={slot.time}
                  onChange={(e) => handleSlotChange(idx, "time", e)}
                  className="input input-bordered w-full"
                />
              </td>
              <td className="border-r border-black text-center">
                <input
                  type="checkbox"
                  checked={slot.isBreak}
                  onChange={(e) => handleSlotChange(idx, "isBreak", e)}
                />
              </td>
              <td className="text-center">
                {idx !== slots.length - 1 && (
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => removeSlot(idx)}
                  >
                    Hapus
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
