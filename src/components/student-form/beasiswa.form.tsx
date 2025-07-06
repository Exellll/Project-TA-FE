import { StudentProps } from "_interfaces/student.interfaces";
import { useGetStudentScholarshipsByIdQuery } from "_services/modules/student-scholarships";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import { ScholarshipsTypeList } from "data/options";
import useStudentScholarshipsForm from "hooks/student-scholarships/useStudentScholarshipsForm";
import React, { useEffect } from "react";
import { Button, Timeline } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";

const Beasiswa: React.FC<StudentProps> = ({
  step,
  setStep,
  stepStatic,
  setStepStatic,
  handleStep,
}) => {

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  
  const {data} = useGetStudentScholarshipsByIdQuery(userId!, {skip: !userId});

  useEffect(() => {
    if (data) {
      reset({
        scholarship_type: data.scholarship_type,
        start_year: data.start_year,
        end_year: data.end_year,
        description: data.description,
      });
    }
  }, [data]);

  const { handleCreate, handleUpdate, register, errors, control, isLoading, reset } =
    useStudentScholarshipsForm(setStep, setStepStatic, userId!);

  return (
    <Timeline.Item
      connect="both"
      endClassName={stepStatic < 8 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
      startClassName={stepStatic < 7 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
    >
      <Timeline.Middle
        className={
          stepStatic === 7 && !userId
            ? "text-yellow-800"
            : stepStatic < 8 && !userId
            ? "text-gray-500"
            : "text-blue-ribbon"
        }
      />
      <Timeline.End box={false}>
        <button
          onClick={() =>
            handleStep(8) && setStep((prevStep) => (prevStep === 8 ? 0 : 8))
          }
          className="font-black mx-1"
        >
          Beasiswa
        </button>
        <form
          onSubmit={!userId ? handleCreate : handleUpdate}
          className={`
                transition-all duration-[1250ms] ease-in-out
                ${
                  step === 8 || userId
                    ? "max-h-[2000px] opacity-100 transform translate-y-0"
                    : "max-h-0 opacity-0 transform -translate-y-4"
                }
              `}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-1">
            <div>
              <label>Jenis Beasiswa</label>
              <Controller
                control={control}
                name="scholarship_type"
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
                    options={ScholarshipsTypeList}
                    value={ScholarshipsTypeList.find(
                      (item) => item.value === value
                    )}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.scholarship_type} />
            </div>
            <div>
              <label>Keterangan</label>
              <CInput
                {...register("description")}
                error={errors.description}
                type="text"
                className="w-full"
                placeholder="Keterangan"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label>Tahun Mulai</label>
                <CInput
                  {...register("start_year")}
                  error={errors.start_year}
                  type="date"
                  className="w-full"
                />
              </div>
              <div>
                <label>Tahun Selesai</label>
                <CInput
                  {...register("end_year")}
                  error={errors.end_year}
                  type="date"
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <div className="mt-6 flex justify-end">
                <Button
                  type="submit"
                  className="bg-blue-ribbon text-white hover:bg-blue-ribbon/90 rounded-2xl font-medium"
                >
                  <span className="mx-5">Lanjut</span>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Timeline.End>
    </Timeline.Item>
  );
};

export default Beasiswa;
