import { useGetSubjectByIdQuery } from "_services/modules/subject";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import { GroupSubjectsList } from "data/options";
import useSubjectForm from "hooks/subject/useUpsertSubject";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Radio } from "@material-tailwind/react";

interface props {
  id?: string;
  isOpen: boolean;
  type: "create" | "update";
  handler: () => void;
}
export default function SubjectModal({
  isOpen,
  type,
  handler,
  id,
}: props): React.ReactElement {
  const { data: subjectsById } = useGetSubjectByIdQuery(id!);

  useEffect(() => {
    if (subjectsById) {
      reset({
        title: subjectsById.title,
        group: subjectsById.group,
        status: subjectsById.status ? "active" : "inactive",
      });
    }
  }, [subjectsById]);

  const {
    register,
    handleCreate,
    handleUpdate,
    reset,
    isLoading,
    isLoadingUpdate,
    control,
    errors,
  } = useSubjectForm(
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
      <form onSubmit={type === "create" ? handleCreate : handleUpdate}>
        <Modal.Body className="flex flex-col justify-start items-start">
          <p className="text-xl font-semibold text-start">
            {type === "create" ? "Form Create" : "Edit"} Mata Pelajaran
          </p>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Mata Pelajaran</label>
            <CInput
              {...register("title")}
              error={errors.title}
              type="text"
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2 w-full pt-1">
            <label className="font-base">Kelompok</label>
            <Controller
              control={control}
              name="group"
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
                  options={GroupSubjectsList}
                  value={GroupSubjectsList.find((item) => item.value === value)}
                  onChange={(e) => onChange(e?.value)}
                />
              )}
            />
            <ValidationError error={errors.group} />
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
            <ValidationError error={errors.status} />
          </div>
        </Modal.Body>
        <Modal.Actions className="flex w-full justify-end items-center mt-16">
          <Button
            className="w-[30%] lg:w-[20%] rounded-xl hover:text-[#3A3B3C] bg-[#3A3B3C] text-white hover:bg-white/90 hover:border-[#3A3B3C]"
            type="button"
            onClick={() => {
              handler();
              reset({ title: "", group: "", status: "active" });
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
