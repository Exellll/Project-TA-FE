import { StudentTransactionI, StudentTransactionParams } from "_interfaces/student-transaction.interfaces";
import ContentContainer from "components/container";
import { SearchBox } from "components/input/SearchBox";
import DeletePopUp from "components/modal/other/Delete";
import Pagination from "components/table/pagination";
import { Table } from "components/table/table";
import VerifyPaymentModal from "components/upsertModal/upsertModalVerif";
import { HeaderStudentTransactionEkskul, HeaderStudentTransactionEkskulPaid, HeaderStudentTransactionSPP, HeaderStudentTransactionSPPPaid } from "data/table/Student-transaction";
import useStudentTransactionForm from "hooks/student-transaction/useStudentTransactionForm";
import React, { useState } from "react";

export const studentTransactionSPPRouteName = "bill/ekskul";
export default function StudentTransactionEkskulPage(): React.ReactElement {
  const [searchParams, setSearchParams] = useState<StudentTransactionParams>({
    search: "",
    limit: 20,
    page: 1,
    type: "Tagihan Ekskul",
  });
  const [type, setType] = useState<"create" | "update">("create");
  const [modalUpsert, setModalUpsert] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const { studentTransactions, handleDelete, refetch } = useStudentTransactionForm(searchParams)

  const filteredDataPending = studentTransactions?.studentTransactions?.filter((item) => item.status === "pending")
  const filteredDataPaid = studentTransactions?.studentTransactions?.filter((item) => item.status === "paid")
  const modalData = studentTransactions?.studentTransactions?.find((item) => item.id === selectedId);

  console.log("🧪 Selected ID:", selectedId);
  console.log("🧪 Modal Data:", modalData);

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
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <ContentContainer>
        {modalData && (
          <VerifyPaymentModal
            isOpen={modalUpsert}
            onClose={handleModalUpsert}
            data={modalData}
            onSuccess={() => {refetch();}}
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
                    columns={HeaderStudentTransactionEkskul(handleDeletePopUp, setSelectedId, handleModalUpsert)}
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
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table<StudentTransactionI>
                    columns={HeaderStudentTransactionEkskulPaid()}
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
