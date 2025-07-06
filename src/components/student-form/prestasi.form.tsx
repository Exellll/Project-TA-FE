import { StudentProps } from "_interfaces/student.interfaces";
import { useGetStudentAchievementByIdQuery } from "_services/modules/student-achievement";
import CInput from "components/input";
import { AchievementList } from "data/options";
import useStudentAchievementForm from "hooks/student-achievement/useStudentAchievementForm";
import React, { useEffect, useState } from "react";
import { Button, Timeline } from "react-daisyui";
import { Controller, useFieldArray } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";

const Prestasi: React.FC<StudentProps> = ({
  step,
  setStep,
  stepStatic,
  setStepStatic,
  handleStep,
}) => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { data } = useGetStudentAchievementByIdQuery(userId!, {
    skip: !userId,
  });

  const {
    handleCreate,
    handleUpdate,
    register,
    errors,
    control,
    isLoading,
    reset,
  } = useStudentAchievementForm(setStep, setStepStatic, userId!);

  useEffect(() => {
    if (data && userId && Array.isArray(data)) {
      setJumlahPrestasi(data.length);
      reset({
        achievements: data.map((item) => ({
          achievement_type: item.achievement_type,
          achievement_level: item.achievement_level,
          name: item.name,
          organizer: item.organizer,
          year: item.year,
          rank: item.rank,
        })),
      });
      // data.forEach((item) => append({
      //   achievement_type: item.achievement_type,
      //   achievement_level: item.achievement_level,
      //   name: item.name,
      //   organizer: item.organizer,
      //   year: item.year,
      //   rank: item.rank,
      // })),
    }
  }, [data, userId, reset]);
  

  const [jumlahPrestasi, setJumlahPrestasi] = useState(0);

  const handleJumlahPrestasiChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);
    setJumlahPrestasi(value > 0 ? value : 0);
  };

  useEffect(() => {
    const currentFields = fields.length;

    if (jumlahPrestasi > currentFields) {
      // Tambah
      for (let i = currentFields; i < jumlahPrestasi; i++) {
        append({
          achievement_type: "",
          achievement_level: "",
          name: "",
          organizer: "",
          year: "",
          rank: "",
        });
      }
    } else if (jumlahPrestasi < currentFields) {
      // Hapus
      for (let i = currentFields - 1; i >= jumlahPrestasi; i--) {
        remove(i);
      }
    }
  }, [jumlahPrestasi]);

  const { fields, remove, append, update } = useFieldArray({
    name: "achievements",
    control: control,
  });

  return (
    <Timeline.Item
      connect="both"
      endClassName={stepStatic < 7 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
      startClassName={
        stepStatic < 6 && !userId ? "bg-gray-400" : "bg-[#1362fc]"
      }
    >
      <Timeline.Middle
        className={
          stepStatic === 6 && !userId
            ? "text-yellow-800"
            : stepStatic < 7 && !userId
            ? "text-gray-500"
            : "text-blue-ribbon"
        }
      />
      <Timeline.End box={false}>
        <button
          onClick={() =>
            handleStep(7) && setStep((prevStep) => (prevStep === 7 ? 0 : 7))
          }
          className="font-black mx-1"
        >
          Prestasi
        </button>
        <form
          onSubmit={!userId ? handleCreate : handleUpdate}
          className={`
                transition-all ${
                  jumlahPrestasi >= 2
                    ? "duration-[2000ms]"
                    : "duration-[1250ms]"
                } ease-in-out
                ${
                  step === 7 || userId
                    ? "max-h-[10000px] opacity-100 transform translate-y-0"
                    : "max-h-0 opacity-0 transform -translate-y-4"
                }
              `}
        >
          <div className="grid grid-cols-4 mx-1">
            <div>
              <label>Jumlah Prestasi</label>
              <CInput
                value={fields.length}
                type="number"
                className="w-full"
                placeholder="Masukan Jumlah Prestasi"
                onChange={handleJumlahPrestasiChange}
                min="0"
              />
            </div>
          </div>
          {fields.length > 0 || userId ? (
            <div>
              {fields.map((achievements, index) => (
                <React.Fragment key={index}>
                  <div className="m-1 font-black">
                    <label>Prestasi {index + 1}</label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-1 w-full">
                    <div>
                      <label>Tipe Prestasi</label>
                      <Controller
                        control={control}
                        name={`achievements.${index}.achievement_type`}
                        render={({ field: { value, onChange } }) => (
                          <ReactSelect
                            styles={{
                              control: (baseStyle) => ({
                                ...baseStyle,
                                padding: 5,
                                borderColor: "#BDBDBD",
                                borderRadius: "0.5rem",
                              }),
                            }}
                            menuPortalTarget={document.body}
                            options={AchievementList}
                            value={AchievementList.find(
                              (item) => item.value === value
                            )}
                            onChange={(e) => onChange(e?.value)}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label>Level Prestasi</label>
                      <CInput
                        {...register(`achievements.${index}.achievement_level`)}
                        error={errors.achievements?.[index]?.achievement_level}
                        type="text"
                        className="w-full"
                        placeholder="Prestasi"
                      />
                    </div>
                    <div>
                      <label>Nama Prestasi</label>
                      <CInput
                        {...register(`achievements.${index}.name`)}
                        error={errors.achievements?.[index]?.name}
                        type="text"
                        className="w-full"
                        placeholder="Nama Prestasi"
                      />
                    </div>
                    <div>
                      <label>Organizer</label>
                      <CInput
                        {...register(`achievements.${index}.organizer`)}
                        error={errors.achievements?.[index]?.organizer}
                        type="text"
                        className="w-full"
                        placeholder="Organizer"
                      />
                    </div>
                    <div>
                      <label>Tahun</label>
                      <CInput
                        {...register(`achievements.${index}.year`)}
                        error={errors.achievements?.[index]?.year}
                        type="date"
                        className="w-full"
                        placeholder="Tahun"
                      />
                    </div>
                    <div>
                      <label>Peringkat</label>
                      <CInput
                        {...register(`achievements.${index}.rank`)}
                        error={errors.achievements?.[index]?.rank}
                        type="text"
                        className="w-full"
                        placeholder="Peringkat ke-"
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : null}
          <div className="mt-6 flex justify-end">
            <Button className="bg-blue-ribbon text-white hover:bg-blue-ribbon/90 rounded-2xl font-medium">
              <span className="mx-5">Lanjut</span>
            </Button>
          </div>
        </form>
      </Timeline.End>
    </Timeline.Item>
  );
};

export default Prestasi;
