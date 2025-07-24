import { useGetSubjectByIdQuery } from "_services/modules/subject";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import { AnnouncementTypeList, GroupSubjectsList } from "data/options";
import useSubjectForm from "hooks/subject/useUpsertSubject";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Radio } from "@material-tailwind/react";
import useAnnouncementForm from "hooks/announcement/useAnnouncementForm";
import { useGetAnnouncementByIdQuery } from "_services/modules/announcement";

interface props {
  id?: string;
  isOpen: boolean;
  type: "create" | "update";
  handler: () => void;
}
export default function AnnouncementModal({
  isOpen,
  type,
  handler,
  id,
}: props): React.ReactElement {
  const { data: announcementsById, refetch } = useGetAnnouncementByIdQuery(id!);

  useEffect(() => {
    if (announcementsById) {
      reset({
        title: announcementsById.title,
        content: announcementsById.content,
        type: announcementsById.type,
        attachment_url: announcementsById.attachment_url,
        status: announcementsById.status ? "active" : "inactive",
      });
    }
  }, [announcementsById]);

  useEffect(() => {
    if (type === "create" && isOpen) {
      reset({
        title: "",
        content: "",
        type: "",
        attachment_url: "",
        status: "active",
      });
    }
  }, [type, isOpen]);

  const {
    register,
    handleCreate,
    handleUpdate,
    reset,
    isLoading,
    isLoadingUpdate,
    control,
    errors,
    setValue
  } = useAnnouncementForm(
    {
      search: "",
      limit: 20,
      page: 1,
    },
    handler,
    id
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <Modal
      open={isOpen}
      backdrop={false}
      className="flex flex-col bg-white lg:min-w-[900px]"
    >
      <form onSubmit={type === "create" ? handleCreate : async (e?: React.BaseSyntheticEvent) => { await handleUpdate(e), refetch(); }}>
        <Modal.Body className="flex flex-col justify-start items-start">
          <p className="text-xl font-semibold text-start">
            {type === "create" ? "Form Create" : "Form Edit"} Pengumuman Sekolah
          </p>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Judul Pengumuman</label>
            <CInput
              {...register("title")}
              error={errors.title}
              type="text"
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Isi Pengumuman</label>
            <textarea
              {...register("content")}
              rows={6} // atau sesuai keinginan
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tulis isi pengumuman di sini"
            />
          </div>
          <div className="flex flex-col gap-2 w-full pt-1">
            <label className="font-base">Tipe Pengumuman</label>
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
                  options={AnnouncementTypeList}
                  value={AnnouncementTypeList.find((item) => item.value === value)}
                  onChange={(e) => onChange(e?.value)}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2 w-full pt-4">
            <label className="font-base">Lampiran (Gambar/File)</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  setValue("file", file);
                }
              }}
            />
            {announcementsById?.attachment_url && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">File Sebelumnya:</p>
                {/\.(jpg|jpeg|png|gif|svg)$/i.test(announcementsById.attachment_url) ? (
                  <img
                    src={announcementsById.attachment_url}
                    alt="Lampiran"
                    className="w-32 h-32 object-cover rounded border"
                  />
                ) : (
                  <a
                    href={announcementsById.attachment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Existing File
                  </a>
                )}
              </div>
            )}
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
          </div>
        </Modal.Body>
        <Modal.Actions className="flex w-full justify-end items-center mt-16">
          <Button
            className="w-[30%] lg:w-[20%] rounded-xl hover:text-[#3A3B3C] bg-[#3A3B3C] text-white hover:bg-white/90 hover:border-[#3A3B3C]"
            type="button"
            onClick={() => {
              handler();
              if (type === "create") {
                reset({
                  title: "",
                  type: "",
                  status: "active",
                  content: "",
                  attachment_url: "",
                });
              }
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
