import { Params, SBParams } from "_interfaces/class.interface";
import { StudentBillI } from "_interfaces/student-bill.interfaces";
import { DocumentSVG, DownloadSVG } from "assets/images";
import ContentContainer from "components/container";
import { SVGIcon } from "components/icon/SVGIcon";
import { SearchBox } from "components/input/SearchBox";
import Pagination from "components/table/pagination";
import { Table } from "components/table/table";
import StudentBillModal from "components/upsertModal/upsertModalTagihan";
import { HeaderStudentBill } from "data/table/Student-bill";
import useClassManagement from "hooks/class/useClassManagement";
import useStudentBillForm from "hooks/student-bill/useStudentBillForm";
import TableLayout from "layout/table";
import React, { useState } from "react";
import { Button } from "react-daisyui";

export const studentBillRouteName = "bill";
export default function StudentBillPage(): React.ReactElement {
  const [searchParams, setSearchParams] = useState<SBParams>({
    search: "",
    limit: 10,
    page: 1,
    class_name: "",
  });
  const { listData } = useClassManagement();

  const [type, setType] = useState<"create" | "update">("create");
  const [modalUpsert, setModalUpsert] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const { studentBills, handleDelete } = useStudentBillForm(searchParams)
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>(""); // untuk filter kelas

  const classOptions = listData?.data.map((item) => item.name) ?? [];

  const handleDeletePopUp = (id: string) => {
    if (id) {
      setIdToDelete(id);
    }
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };
  const handleModalUpsert = () => {
    setModalUpsert(!modalUpsert);
  };
  const handleUpdate = (id: string) => {
    handleModalUpsert();
    setType("update");
    setSelectedId(id);
  };
  const handleCreate = () => {
    handleModalUpsert();
    setType("create");
    setSelectedId("");
  };

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ContentContainer>
      <StudentBillModal
        handler={handleModalUpsert}
        isOpen={modalUpsert}
        type={type}
        id={selectedId}
      />
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <SearchBox className="py-4" />
              <select
                className="select select-bordered max-w-xs"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setSearchParams({
                    ...searchParams,
                    page: 1,
                    class_name: e.target.value,
                  });
                }}
              >
                <option value="">Semua Kelas</option>
                {classOptions.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between gap-4 ml-4">
              <Button
                onClick={() => {
                  handleCreate();
                }}
                className="bg-blue-ribbon text-white hover:bg-blue-ribbon/90 rounded-xl font-medium"
              >
                <SVGIcon svg={DocumentSVG} className="bg-white" />
                Create Tagihan Siswa
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table<StudentBillI>
                    columns={HeaderStudentBill(handleDeletePopUp, handleUpdate)}
                    data={studentBills?.studentBills!}
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
      </div>
      {/* <TableLayout<StudentBillI, Params>
        title="Tagihan Siswa"
        data={studentBills?.studentBills!}
        params={{ value: searchParams, setValue: setSearchParams }}
        headerTable={() => HeaderStudentBill(handleDeletePopUp, handleUpdate)}
        handleCreate={handleCreate}
        setSelectedId={setSelectedColumn}
        remove={{ isOpen: isDeletePopupOpen, handler: () => { handleDelete(idToDelete); setIsDeletePopupOpen(false); }, handlerClose: () => setIsDeletePopupOpen(false) }}
        modal={
          <StudentBillModal
            handler={handleModalUpsert}
            isOpen={modalUpsert}
            type={type}
            id={selectedId}
          />
        }
        handleEdit={handleUpdate}
        loading={false}
      /> */}
    </ContentContainer>
  );
}
