import { useGetSubjectByIdQuery } from "_services/modules/subject";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import { DayList } from "data/options";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Radio } from "@material-tailwind/react";
import useEkskulForm from "hooks/ekskul/useEkskulForm";
import { useGetEkskulByIdQuery } from "_services/modules/ekskul";

interface props {
  id?: string;
  isOpen: boolean;
  type: "create" | "update";
  handler: () => void;
}
export default function EkskulModal({
  isOpen,
  type,
  handler,
  id,
}: props): React.ReactElement {
  const { data: ekskulById, refetch } = useGetEkskulByIdQuery(id!);

  useEffect(() => {
    if (ekskulById) {
      reset({
        name: ekskulById?.name,
        description: ekskulById?.description,
        day: ekskulById?.day,
        start_time: ekskulById?.start_time,
        end_time: ekskulById?.end_time,
        location: ekskulById?.location,
        capacity: ekskulById?.capacity,
        status: ekskulById?.status ? "active" : "inactive",
      });
    }
  }, [ekskulById]);

  const {
    register,
    handleCreate,
    handleUpdate,
    reset,
    isLoading,
    isLoadingUpdate,
    control,
    errors,
  } = useEkskulForm(
    {
      search: "",
      limit: 20,
      page: 1,
    },
    handler,
    id
  );

  return (
    <Modal
      open={isOpen}
      backdrop={false}
      className="flex flex-col bg-white lg:min-w-[900px]"
    >
      <form onSubmit={type === "create" ? handleCreate : async (e?: React.BaseSyntheticEvent) => { await handleUpdate(e), refetch(); }}>
        <Modal.Body className="flex flex-col justify-start items-start">
          <p className="text-xl font-semibold text-start">
            {type === "create" ? "Form Create" : "Edit"} Ekskul
          </p>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Nama</label>
            <CInput
              {...register("name")}
              error={errors.name}
              type="text"
              className="w-full"
            />
            {/* <ValidationError error={errors.name} /> */}
          </div>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Deskripsi</label>
            <CInput
              {...register("description")}
              error={errors.description}
              type="text-area"
              className="w-full"
            />
            {/* <ValidationError error={errors.description} /> */}
          </div>
          <div className="flex flex-col gap-2 w-full pt-1">
            <label className="font-base">Hari</label>
            <Controller
              control={control}
              name="day"
              render={({
                field: { value, onChange },
              }: {
                field: { value: string; onChange: (value: any) => void };
              }) => (
                <ReactSelect
                  styles={{
                    control: (baseStyle) => ({
                      ...baseStyle,
                      padding: 5,
                      borderColor: "#BDBDBD",
                      borderRadius: "0.5rem",
                    }),
                  }}
                  options={DayList}
                  value={DayList.find((item) => item.value === value)}
                  onChange={(e) => onChange(e?.value)}
                />
              )}
            />
            {/* <ValidationError error={errors.day} /> */}
          </div>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Waktu Mulai</label>
            <CInput
              {...register("start_time")}
              error={errors.start_time}
              type="time"
              className="w-full"
            />
            {/* <ValidationError error={errors.start_time} /> */}
          </div>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Waktu Selesai</label>
            <CInput
              {...register("end_time")}
              error={errors.end_time}
              type="time"
              className="w-full"
            />
            {/* <ValidationError error={errors.end_time} /> */}
          </div>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Lokasi Ekskul</label>
            <CInput
              {...register("location")}
              error={errors.location}
              type="text"
              className="w-full"
            />
            {/* <ValidationError error={errors.location} /> */}
          </div>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Kapasitas</label>
            <CInput
              {...register("capacity")}
              error={errors.capacity}
              type="text"
              className="w-full"
            />
            {/* <ValidationError error={errors.capacity} /> */}
          </div>
          <div className="flex flex-col gap-2 w-full pt-1">
            <label className="font-base">Status</label>
            <div className="form-control">
              <Radio
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                {...register("status")}
                value={"active"}
                crossOrigin={""}
                label={"Active"}
              />
            </div>
            <div className="form-control">
              <Radio
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                {...register("status")}
                value={"inactive"}
                crossOrigin={""}
                label={"Inactive"}
              />
            </div>
            {/* <ValidationError error={errors.status} /> */}
          </div>
        </Modal.Body>
        <Modal.Actions className="flex w-full justify-end items-center mt-16">
          <Button
            className="w-[30%] lg:w-[20%] rounded-xl hover:text-[#3A3B3C] bg-[#3A3B3C] text-white hover:bg-white/90 hover:border-[#3A3B3C]"
            type="button"
            onClick={() => {
              handler();
              reset({ name: "", description: "", day: "", start_time: "", end_time: "", location: "", capacity: "", status: "active" });
            }}
          >
            Keluar
          </Button>
          <Button
            type="submit"
            className="w-[30%] lg:w-[20%] rounded-xl hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon"
            loading={isLoading || isLoadingUpdate}
          >
            Simpan
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
}
