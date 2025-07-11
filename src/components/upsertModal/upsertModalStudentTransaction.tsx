import { useState } from "react";
import { Button, Modal } from "react-daisyui";
import { Input } from "@material-tailwind/react";
import useStudentTransactionForm from "hooks/student-transaction/useStudentTransactionForm";
import { reset } from "mixpanel-browser";
import CUploadFile from "components/input/CInputFile";
import ValidationError from "components/validation/error";

interface Props {
    isOpen: boolean;
    handler: () => void;
    id?: string
    onSuccess?: () => void;
}

export default function UploadPaymentModal({
    isOpen,
    handler,
    id,
    onSuccess,
}: Props): React.ReactElement {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { handleCreate, handleUpdate, refetch, setValue, reset, errors, register, handleFileChange, isLoadingPay } = useStudentTransactionForm({
        page: 1,
        limit: 10,
        search: "",
    }, onSuccess, handler, id);
    return (
        <Modal open={isOpen} backdrop={false} className="flex flex-col bg-white w-full max-w-md rounded-xl">
            <form onSubmit={async (e?: React.BaseSyntheticEvent) => { await handleUpdate(e);}}>
                <Modal.Body className="flex flex-col justify-start items-start p-6">
                    <p className="text-xl font-semibold">Upload Bukti Pembayaran</p>
                    <div className="flex flex-col gap-2 w-full pt-4">
                        <label className="font-base">Pilih File</label>
                        <CUploadFile
                            label=""
                            onChange={handleFileChange}
                            register={register("file")}
                            id="file"
                            errors={errors.file}
                        />
                        <ValidationError error={errors.file} />
                    </div>
                </Modal.Body>

                <Modal.Actions className="flex w-full justify-end items-center gap-4 px-6 pb-4">
                    <Button
                        type="button"
                        onClick={() => {
                            setSelectedFile(null);
                            handler();
                            reset({ bukti_pembayaran: "" });
                        }}
                        className="w-[30%] rounded-xl bg-gray-700 text-white hover:bg-white hover:border-gray-700 hover:text-gray-700"
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="w-[30%] rounded-xl bg-blue-ribbon text-white hover:bg-white hover:border-blue-ribbon hover:text-blue-ribbon"
                        loading={isLoadingPay}
                    >
                        Kirim
                    </Button>
                </Modal.Actions>
            </form>
        </Modal>
    );
}
