import CInput from "components/input";
import ValidationError from "components/validation/error";
import { useEffect } from "react";
import { Button, Modal } from "react-daisyui";
import useContentLibrary from "hooks/content-library/useContentLibrary";
import CUploadFile from "components/input/CInputFile";

interface props {
  id?: string;
  isOpen: boolean;
  type: "folder" | "file";
  handler: () => void;
}
export default function CreateFolderModal({
  isOpen,
  type,
  handler,
}: props): React.ReactElement {
  const {
    register,
    handleCreate,
    errors,
    isLoading,
    setValue,
    handleCreateFile,
    handleFileChange,
  } = useContentLibrary(
    {
      search: "",
      limit: 10,
      page: 1,
    },
    handler
  );

  useEffect(() => {
    setValue("type", type);
  }, [type]);

  console.log(errors);

  return (
    <Modal
      open={isOpen}
      backdrop={false}
      className="flex flex-col bg-white lg:min-w-[500px]"
    >
      <form onSubmit={type === "folder" ? handleCreate : handleCreateFile}>
        <Modal.Body className="flex flex-col justify-start items-start">
          <p className="text-xl font-semibold text-start">{type === "folder" ? "Folder Baru" : "File Baru"}</p>
          <div className="flex flex-col gap-2 w-full pt-4">
            {type === "folder" ? (
              <>
                <label className="font-base">Nama Folder</label>
                <CInput
                  placeholder="Nama Folder"
                  {...register("name")}
                  error={errors.name}
                  type="text"
                  className="w-full"
                />
              </>
            ) : (
              <>
                <CUploadFile
                  label="Nama File"
                  onChange={handleFileChange}
                  register={register("file_url")}
                  id="file_url"
                  errors={errors.file_url}
                />
                <ValidationError error={errors.file_url} />
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Actions className="flex w-full justify-end items-center mt-16">
          <Button
            className="w-[30%] lg:w-[20%] rounded-xl hover:text-[#3A3B3C] bg-[#3A3B3C] text-white hover:bg-white/90 hover:border-[#3A3B3C]"
            type="button"
            onClick={() => {
              handler();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-[30%] lg:w-[20%] rounded-xl hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon"
            loading={isLoading}
          >
            OK
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
}
