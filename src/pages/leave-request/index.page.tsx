import { DownloadSVG } from "assets/images";
import ContentContainer from "components/container";
import { SVGIcon } from "components/icon/SVGIcon";
import { SearchBox } from "components/input/SearchBox";
import Pagination from "components/table/pagination";
import { Table } from "components/table/table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStudentsForm from "hooks/student/useStudentsForm";
import { LeaveRequestI } from "_interfaces/leave-requests.interface";
import { HeaderLeaveRequest } from "data/table/Leave-requests";
import LeaveRequestModal from "components/leave-request-modal";
import useLeaveRequest from "hooks/leave-request/useLeaveRequest";

export const leaveRequestRouteName = "/leave-request";
export default function LeaveRequestPage(): React.ReactElement {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    search: "",
    limit: 10,
    page: 1,
    is_draft: 'true',
  });
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const handleCreate = (): void => {
    void navigate("/student/create");
  };

  const handleRejectPopUp = (id: string): void => {
    setIsRejectPopupOpen(!isRejectPopupOpen);
    setSelectedId(id);
  }
  const handleApprovePopUp = (id: string): void => {
    setIsApprovePopupOpen(!isApprovePopupOpen);
    setSelectedId(id);
  }

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  const { leave_request, isLoading, handleReject} = useLeaveRequest(searchParams, selectedId);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ContentContainer>
      <LeaveRequestModal
        isOpen={isRejectPopupOpen}
        onClose={() => handleRejectPopUp(selectedId)}
        onConfirm={() => {
          handleReject().then(() => {
            handleRejectPopUp(selectedId);
          });
        }}
        alertType="danger"
        title="Are you sure want to reject this leave request?"
        subTitle="test"
      />
      <LeaveRequestModal
        isOpen={isApprovePopupOpen}
        onClose={() => handleApprovePopUp(selectedId)}
        onConfirm={() => {
          handleApprovePopUp(selectedId);
        }}
        alertType="success"
        title="Are you sure want to approve this leave request?"
        subTitle="test"
      />
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <SearchBox className="py-4" />
              <SVGIcon svg={DownloadSVG} className="bg-blue-ribbon" />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table<LeaveRequestI>
                    columns={HeaderLeaveRequest(handleRejectPopUp, handleApprovePopUp)}
                    data={leave_request?.leave_request!}
                    loading={isLoading}
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
    </ContentContainer>
  );
}
