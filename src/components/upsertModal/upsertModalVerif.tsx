import React from "react";
import { Button, Modal } from "react-daisyui";
import { StudentTransactionI } from "_interfaces/student-transaction.interfaces";
import { useVerifyStudentTransactionMutation } from "_services/modules/student-transaction"; // sesuaikan path
import useStudentTransactionForm from "hooks/student-transaction/useStudentTransactionForm";
import { ref } from "yup";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: StudentTransactionI | null;
  onSuccess?: () => void;
}

export default function VerifyPaymentModal({
  isOpen,
  onClose,
  data,
  onSuccess,
}: Props): React.ReactElement {
  const [verifyStudentTransaction, { isLoading },] = useVerifyStudentTransactionMutation();
  const { handleVerify, isLoadingVerif, refetch } = useStudentTransactionForm({ page: 1, limit: 10, search: '' }, onSuccess);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data?.id) {
      try {
        await handleVerify(data.id);
        onClose();
        refetch();
      } catch (error) {
        console.error("Verifikasi gagal:", error);
      }
    }
  };

  return (
    <Modal open={isOpen} backdrop={true} className="flex flex-col bg-white w-full max-w-md rounded-xl">
      <form onSubmit={handleSubmit}>
        <Modal.Body className="p-6 space-y-4">
          <p className="text-xl font-semibold text-gray-800">Verifikasi Pembayaran</p>
          <div>
            <p>
              Nama Siswa: <span className="font-medium">{data?.student_bill?.students.name}</span>
            </p>
            <p>
              Jumlah Tagihan:{" "}
              <span className="font-medium">
                Rp {Number(data?.student_bill?.bill_amount).toLocaleString()}
              </span>
            </p>
            <p>
              Status: <span className="font-medium">{data?.status}</span>
            </p>
            {data?.bukti_pembayaran && (
              <a
                href={data?.bukti_pembayaran}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                Lihat Bukti Pembayaran
              </a>
            )}
          </div>
        </Modal.Body>

        <Modal.Actions className="flex justify-end items-center gap-4 px-6 pb-4">
          <Button
            type="button"
            onClick={onClose}
            className="w-[30%] rounded-xl bg-gray-600 text-white hover:bg-white hover:border-gray-600 hover:text-gray-600"
          >
            Keluar
          </Button>
          <Button
            type="submit"
            className="w-[30%] rounded-xl bg-green-600 text-white hover:bg-white hover:border-green-600 hover:text-green-600"
            loading={isLoadingVerif}
          >
            Verifikasi
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
}
