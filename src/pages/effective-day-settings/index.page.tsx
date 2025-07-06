"use client"

import type React from "react"
import { useEffect, useState } from "react"
import ContentContainer from "components/container"
import { Table } from "components/table/table"
import { HeaderEffectiveDaySettings } from "data/table/Effective-day-settings"
import useEffectiveDaySettings from "hooks/effective-day-settings/useEffectiveDaySettings"
import { EffectiveHourPicker } from "components/presences/effective-hour-picker"
import { Button } from "react-daisyui"
import { useUpdateEffectiveDaySettingsMutation } from "_services/modules/effective-day-settings"

export const effectiveDaySettingsRouteName = "effective-day-settings"

// function formatTimeString(timeString: string): string {
//   const [hours, minutes] = timeString.split(":")
//   return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
// }

export default function EffectiveDaySettingsPage(): React.ReactElement {
  const [effectiveDay, setEffectiveDay] = useState<string[]>([])
  const [isChange, setIsChange] = useState<boolean>(false)
  const [valueArray, setValueArray] = useState<number[]>([])
  const [selectedValue, setSelectedValue] = useState<number | null>(null)
  const [effectiveHour, setEffectiveHour] = useState<string>("")
  const [selectedId, setSelectedId] = useState<string>("")
  const { data, isLoading, UpdateEds } = useEffectiveDaySettings(selectedId)

  useEffect(() => {
    if (data) {
      setEffectiveDay(data.effectiveDay || [])
      if (data.effectiveHour) {
        setEffectiveHour(data.effectiveHour)
      }
    }
  }, [data])

  const handleEffectiveDay = (index: number, isEffective: string) => {
    const newEffectiveDay = [...effectiveDay]
    newEffectiveDay[index] = isEffective
    setEffectiveDay(newEffectiveDay)
    setSelectedValue(index)
  }

  const handleTimeChange = (newTime: string) => {
    setEffectiveHour(newTime)
    setIsChange(true)
  }

  useEffect(() => {
    const newValueArray: number[] = []
    for (let index = 0; index < effectiveDay.length; index++) {
      if (effectiveDay[index] !== data?.effectiveDay?.[index]) {
        newValueArray.push(index)
      }
    }
    setValueArray(newValueArray)
  }, [effectiveDay, data?.effectiveDay])

  useEffect(() => {
    if (valueArray.length > 0 || (data?.effectiveHour && effectiveHour !== data.effectiveHour)) {
      setIsChange(true)
    } else {
      setIsChange(false)
    }
  }, [valueArray, effectiveHour, data?.effectiveHour])

  const handleSaveChanges = async (id: string) => {
    const booleanEffectiveDay = effectiveDay.map((day) => {
      if (day === "true") {
        return true
      } else {
        return false
      }
    })
    console.log("id", id)
    setSelectedId(id)
    await UpdateEds({effectiveDay: booleanEffectiveDay, effectiveHour, id})
    setIsChange(false)
  }

  return (
    <ContentContainer>
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="flex justify-end mb-2">
              <EffectiveHourPicker initialTime={effectiveHour} onTimeChange={handleTimeChange} />
            </div>
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table<string>
                    columns={HeaderEffectiveDaySettings(handleEffectiveDay)}
                    data={effectiveDay}
                    loading={isLoading}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end mt-1">
              {isChange && (
                <Button onClick={() => handleSaveChanges(data!.id)} className="bg-blue-ribbon text-white hover:bg-blue-ribbon/90 rounded-xl font-medium">
                  Simpan Perubahan
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}

