import React, { useState } from 'react';
import { StudentTransactionI } from '_interfaces/student-transaction.interfaces';
import { Button, Input, Modal } from 'react-daisyui';
import dayjs from 'dayjs';
import useStudentTransactionForm from 'hooks/student-transaction/useStudentTransactionForm';
import { useGetStudentTransactionByIdQuery, useGetStudentTransactionByStudentIdQuery } from '_services/modules/student-transaction';
import { useAppSelector } from 'store';
import UploadPaymentModal from 'components/upsertModal/upsertModalStudentTransaction';

const StudentTransactionPage: React.FC = () => {
  const { studentTransactions: transactions, isLoading, handleCreate } = useStudentTransactionForm({ page: 1, limit: 10, search: '' });

  const user = useAppSelector((state) => state.auth.user);
  const id = user?.id;

  const { data: transactionsData } = useGetStudentTransactionByStudentIdQuery(id!);
  const [payModal, setPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<StudentTransactionI | null>(null);
  const [bukti, setBukti] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const data = transactionsData?.studentTransactions || [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tagihan Saya</h1>
      <div className="space-y-6">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 p-5 rounded-xl bg-white shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-blue-700">
                  {item.student_bill?.students.name}
                </h2>
                <span className={`text-sm font-semibold ${item.status === 'paid' ? 'text-green-600' :
                  item.status === 'pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                  {item.status === 'paid' ? 'Lunas' :
                    item.status === 'pending' ? 'Menunggu Verifikasi' : 'Telat Bayar'}
                </span>
              </div>
              <p className="text-sm text-gray-500 italic mb-2">
                Jatuh Tempo: {dayjs(item.student_bill?.due_date).format('dddd, D MMMM YYYY')} · {item.student_bill?.type}
              </p>
              <p className="text-gray-700 mb-2">
                Jumlah: <span className="font-medium">Rp {Number(item.student_bill?.bill_amount).toLocaleString()}</span>
              </p>
              {item.bukti_pembayaran && (
                <a
                  href={item.bukti_pembayaran}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm underline"
                >
                  Lihat Bukti Pembayaran
                </a>
              )}
              {item.status === 'pending' && (
                <div className="mt-4">
                  <Button size="sm" color="primary" onClick={() => { setSelectedBill(item); setIsOpen(true); }}>Bayar Sekarang</Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Tidak ada tagihan yang tersedia.</p>
        )}
      </div>

      <UploadPaymentModal
        isOpen={isOpen}
        handler={() => setIsOpen(false)}
      />
    </div>
  );
};

export default StudentTransactionPage;
