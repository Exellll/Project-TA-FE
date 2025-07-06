import { useGetSubjectByIdQuery } from "_services/modules/subject";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import { GroupSubjectsList, StudentBillTypeList } from "data/options";
import useSubjectForm from "hooks/subject/useUpsertSubject";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Radio } from "@material-tailwind/react";
import useStudentBillForm from "hooks/student-bill/useStudentBillForm";
import { useGetStudentBillByIdQuery } from "_services/modules/student-bill";
import useStudentsForm from "hooks/student/useStudentsForm";

interface props {
  id?: string;
  isOpen: boolean;
  type: "create" | "update";
  handler: () => void;
}
export default function StudentBillModal({
  isOpen,
  type,
  handler,
  id,
}: props): React.ReactElement {
  const { data: studentBillById, refetch } = useGetStudentBillByIdQuery(id!);
  const { students, isLoading: isStudentLoading, } = useStudentsForm({
    search: "",
    limit: 20,
    page: 1,
    is_draft: 'false',
  });

  useEffect(() => {
    if (studentBillById) {
      reset({
        student_id: studentBillById.student_id,
        type: studentBillById.type,
        due_date: studentBillById.due_date,
        bill_amount: studentBillById.bill_amount
      });
    }
  }, [studentBillById]);

  const {
    register,
    handleCreate,
    handleUpdate,
    reset,
    isLoading,
    isLoadingUpdate,
    control,
    errors,
  } = useStudentBillForm(
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
      <form onSubmit={type === "create" ? handleCreate : async (e?: React.BaseSyntheticEvent) => {await handleUpdate(e); refetch();}}>
        <Modal.Body className="flex flex-col justify-start items-start">
          <p className="text-xl font-semibold text-start">
            {type === "create" ? "Form Create" : "Form Edit"} Tagihan Siswa
          </p>
          <div className="flex flex-col gap-2 w-full pt-1">
            <label className="font-base">Siswa</label>
            <Controller
              control={control}
              name="student_id"
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
                  isLoading={isStudentLoading}
                  options={(students?.students || []).map((students) => ({
                    label: students.name,
                    value: students.id,
                  }))}
                  value={(students?.students || [])
                    .map((students) => ({
                      label: students.name,
                      value: students.id,
                    }))
                    .find((opt) => opt.value === value)}
                  key={value}
                  onChange={(e) => onChange(e?.value)}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2 w-full pt-1">
            <label className="font-base">Tipe Tagihan</label>
            <Controller
              control={control}
              name="type"
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
                  options={StudentBillTypeList}
                  value={StudentBillTypeList.find((item) => item.value === value)}
                  onChange={(e) => onChange(e?.value)}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Tanggal Jatuh Tempo</label>
            <CInput
              {...register("due_date")}
              error={errors.due_date}
              type="date"
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Jumlah Tagihan</label>
            <CInput
              {...register("bill_amount")}
              error={errors.bill_amount}
              type="text"
              className="w-full"
            />
          </div>
          {/* <div className="flex flex-col gap-2 w-full pt-1">
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
          </div> */}
        </Modal.Body>
        <Modal.Actions className="flex w-full justify-end items-center mt-16">
          <Button
            className="w-[30%] lg:w-[20%] rounded-xl hover:text-[#3A3B3C] bg-[#3A3B3C] text-white hover:bg-white/90 hover:border-[#3A3B3C]"
            type="button"
            onClick={() => {
              handler();
              reset({});
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