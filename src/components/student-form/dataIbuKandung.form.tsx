import { StudentProps } from "_interfaces/student.interfaces";
import { useGetParentByIdQuery } from "_services/modules/parents";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import {
  EducationList,
  IncomeList,
  ParentJobList,
  SpecialNeedsList,
} from "data/options";
import useParentsForm from "hooks/parent/useParentsForm";
import React, { useEffect } from "react";
import { Button, Timeline } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";

const DataIbuKandung: React.FC<StudentProps> = ({
  step,
  setStep,
  stepStatic,
  setStepStatic,
  handleStep,
}) => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { data } = useGetParentByIdQuery(userId!, {skip: !userId});

  const { handleCreate, handleUpdate, register, control, errors, isLoading, reset } = useParentsForm(
    "ibu",
    setStep,
    setStepStatic,
    userId!
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const parent = data.find(
        (item) => item.gender === "female" && item.type === "parent"
      );
  
      if (parent) {
        reset({
          name: parent.name,
          nik: parent.nik,
          birth_date: parent.birth_date,
          education: parent.education,
          job: parent.job,
          income: parent.income,
          special_needs: parent.special_needs,
        });
      }
    }
  }, [data, reset]);

  return (
    <Timeline.Item
      connect="both"
      endClassName={stepStatic < 3 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
      startClassName={stepStatic < 2 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
    >
      <Timeline.Middle
        className={
          stepStatic === 2 && !userId
            ? "text-yellow-800"
            : stepStatic < 3 && !userId
            ? "text-gray-500"
            : "text-blue-ribbon"
        }
      />
      <Timeline.End box={false}>
        <button
          onClick={() =>
            handleStep(3) && setStep((prevStep) => (prevStep === 3 ? 0 : 3))
          }
          className="font-black mx-1"
        >
          Data Ibu Kandung
        </button>
        <form
          onSubmit={!userId ? handleCreate : handleUpdate}
          className={`
                transition-all duration-[1250ms] ease-in-out
                ${
                  step === 3 || userId
                    ? "max-h-[2000px] opacity-100 transform translate-y-0 overflow-visible z-10"
                    : "max-h-0 opacity-0 transform -translate-y-4 -z-50"
                }
              `}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-1 w-full">
            <div>
              <label className="flex flex-wrap font-base">Nama</label>
              <CInput
                {...register("name")}
                error={errors.name}
                type="text"
                className="w-full"
                placeholder="Nama Ibu Kandung"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">NIK</label>
              <CInput
                {...register("nik")}
                error={errors.nik}
                type="text"
                className="w-full"
                placeholder="NIK"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Tanggal Lahir</label>
              <CInput
                {...register("birth_date")}
                error={errors.birth_date}
                type="date"
                className="w-full"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Pendidikan</label>
              <Controller
                control={control}
                name="education"
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
                    options={EducationList}
                    value={EducationList.find((item) => item.value === value)}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.education} />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Pekerjaan</label>
              <Controller
                control={control}
                name="job"
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
                    options={ParentJobList}
                    value={ParentJobList.find((item) => item.value === value)}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.job} />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Penghasilan</label>
              <Controller
                control={control}
                name="income"
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
                    options={IncomeList}
                    value={IncomeList.find((item) => item.value === value)}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.income} />
            </div>
            <div>
              <label className="flex flex-wrap font-base">
                Kebutuhan Khusus
              </label>
              <Controller
                control={control}
                name="special_needs"
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
                    options={SpecialNeedsList}
                    value={SpecialNeedsList.find(
                      (item) => item.value === value
                    )}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.special_needs} />
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                className="bg-blue-ribbon text-white hover:bg-blue-ribbon/90 rounded-2xl font-medium"
              >
                <span className="mx-5">Lanjut</span>
              </Button>
            </div>
          </div>
        </form>
      </Timeline.End>
    </Timeline.Item>
  );
};

export default DataIbuKandung;
