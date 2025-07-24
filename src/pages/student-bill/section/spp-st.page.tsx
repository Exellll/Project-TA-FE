import { StudentTransactionI, StudentTransactionParams } from "_interfaces/student-transaction.interfaces";
import ContentContainer from "components/container";
import { SearchBox } from "components/input/SearchBox";
import DeletePopUp from "components/modal/other/Delete";
import Pagination from "components/table/pagination";
import { Table } from "components/table/table";
import VerifyPaymentModal from "components/upsertModal/upsertModalVerif";
import { HeaderStudentTransactionSPP, HeaderStudentTransactionSPPPaid } from "data/table/Student-transaction";
import useStudentTransactionForm from "hooks/student-transaction/useStudentTransactionForm";
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import StudentTransactionPDF from "components/PDF/StudentTransactionPDF";

export const studentTransactionSPPRouteName = "bill/spp";
export default function StudentTransactionSPPPage(): React.ReactElement {
  const [searchParams, setSearchParams] = useState<StudentTransactionParams>({
    search: "",
    limit: 20,
    page: 1,
    type: "SPP",
  });
  const [type, setType] = useState<"create" | "update">("create");
  const [modalUpsert, setModalUpsert] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const { studentTransactions, handleDelete, refetch } = useStudentTransactionForm(searchParams)
  const [idToDelete, setIdToDelete] = useState<string>("");

  const filteredDataPending = studentTransactions?.studentTransactions?.filter((item) => item.status === "pending")
  const filteredDataPaid = studentTransactions?.studentTransactions?.filter((item) => item.status === "paid")
  const modalData = studentTransactions?.studentTransactions?.find((item) => item.id === selectedId);

  const handleDeletePopUp = (id: string) => {
    if (id) {
      setSelectedId(id);
    }
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };

  const handleClose = () => {
    setIsDeletePopupOpen(false);
    setSelectedId("");
  }
  const handleModalUpsert = () => {
    setModalUpsert(!modalUpsert);
  };

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  const filteredDataPaidPDF = studentTransactions?.studentTransactions?.filter(
    (item) => item.status === "paid" && item.payment_date.startsWith(`2025-${selectedMonth}`)
  );

  return (
    <>
      <ContentContainer>
        {modalData && (
          <VerifyPaymentModal
            isOpen={modalUpsert}
            onClose={handleModalUpsert}
            data={modalData}
            onSuccess={() => refetch()}
          />
        )}
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <SearchBox className="py-4" />
                {/* <SVGIcon svg={DownloadSVG} className="bg-blue-ribbon" /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table<StudentTransactionI>
                    columns={HeaderStudentTransactionSPP(handleDeletePopUp, setSelectedId, handleModalUpsert)}
                    data={filteredDataPending}
                    loading={false}
                    id={selectedColumn}
                    setIsChecked={setSelectedColumn}
                  />
                  <div className="flex flex-col">
                    <Pagination
                      currentPage={searchParams.page}
                      totalPages={10}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
      <ContentContainer>
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <SearchBox className="py-4" />
                {/* <SVGIcon svg={DownloadSVG} className="bg-blue-ribbon" /> */}
                <div className="flex items-center gap-4">
                  <select
                    className="border rounded px-3 py-2 text-sm"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="01">Januari</option>
                    <option value="02">Februari</option>
                    <option value="03">Maret</option>
                    <option value="04">April</option>
                    <option value="05">Mei</option>
                    <option value="06">Juni</option>
                    <option value="07">Juli</option>
                    <option value="08">Agustus</option>
                    <option value="09">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                  </select>

                  <PDFDownloadLink
                    document={<StudentTransactionPDF data={filteredDataPaidPDF || []} month={selectedMonth} />}
                    fileName={`laporan-transaksi-SPP-${selectedMonth}.pdf`}
                    className="bg-blue-ribbon text-white px-4 py-2 rounded text-sm"
                  >
                    {({ loading }) => (
                      <span>{loading ? "Memuat PDF..." : "Cetak PDF"}</span>
                    )}
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table<StudentTransactionI>
                    columns={HeaderStudentTransactionSPPPaid()}
                    data={filteredDataPaid}
                    loading={false}
                    id={selectedColumn}
                    setIsChecked={setSelectedColumn}
                  />
                  <div className="flex flex-col">
                    <Pagination
                      currentPage={searchParams.page}
                      totalPages={10}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </>
  );
}
