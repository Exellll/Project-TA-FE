"use client"

import { useState, useEffect } from "react"
import { Input } from "react-daisyui"

interface EffectiveHourPickerProps {
  initialTime: string
  onTimeChange: (newTime: string) => void
}

export function EffectiveHourPicker({ initialTime, onTimeChange }: EffectiveHourPickerProps) {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    setTime(initialTime)
  }, [initialTime])

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    setTime(newTime)
    onTimeChange(newTime)
  }

  return (
    <div className="flex items-center space-x-2">
      <span>Jam Masuk :</span>
      <Input type="time" value={time} onChange={handleTimeChange} className="w-32" />
    </div>
  )
}

