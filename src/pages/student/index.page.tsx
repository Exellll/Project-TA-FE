import { StudentI } from "_interfaces/student.interfaces";
import { Params } from "_interfaces/class.interface";
import { useGetStudentsQuery } from "_services/modules/students";
import { DocumentSVG, DownloadSVG } from "assets/images";
import ContentContainer from "components/container";
import { SVGIcon } from "components/icon/SVGIcon";
import { SearchBox } from "components/input/SearchBox";
import DeletePopUp from "components/modal/other/Delete";
import Pagination from "components/table/pagination";
import { Table } from "components/table/table";
import { studentData } from "data/dummy/Student";
import { HeaderStudent, HeaderStudentDraft } from "data/table/Student";
import React, { useState } from "react";
import { Button, Tabs } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import TableLayout from "layout/table";
import useStudentsForm from "hooks/student/useStudentsForm";

export const studentRouteName = "student";
export default function StudentPage(): React.ReactElement {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    search: "",
    limit: 10,
    page: 1,
    is_draft: 'false',
  });
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const handleDeletePopUp = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };
  const handleCreate = (): void => {
    void navigate("/student/create");
  };
  const handleUpdate = (id: string): void => {
    void navigate(`/student/create?userId=${id}`);
  };

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  const { students, isLoading } = useStudentsForm(searchParams);

  const [activeTab, setActiveTab] = useState("Student");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Student") {
      setSearchParams({...searchParams, is_draft: "false"});
    } else {
      setSearchParams({...searchParams, is_draft: "true"});
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ContentContainer>
      <DeletePopUp
        isOpen={isDeletePopupOpen}
        data={"Post"}
        onClose={handleDeletePopUp}
        onEdit={() => {
          handleDeletePopUp();
        }}
        menu="Post"
      />
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <SearchBox className="py-4" />
              <SVGIcon svg={DownloadSVG} className="bg-blue-ribbon" />
            </div>
            <div className="flex items-center gap-4">
              <Tabs size="lg" variant="bordered" dataTheme="light">
                <Tabs.RadioTab  
                  name="Student"
                  label="Student"                
                  defaultChecked={true}
                  onClick={() => handleTabChange("Student")}
                >            
                </Tabs.RadioTab>
                <Tabs.RadioTab
                  name="Student Draft"
                  label="Student Draft"                  
                  onClick={() => handleTabChange("Student Draft")}
                >
                </Tabs.RadioTab>
              </Tabs>
            </div>
            <div className="flex items-center justify-between gap-4 ml-4">
              <Button
                onClick={() => {
                  handleCreate();
                }}
                className="bg-blue-ribbon text-white hover:bg-blue-ribbon/90 rounded-xl font-medium"
              >
                <SVGIcon svg={DocumentSVG} className="bg-white" />
                Create Siswa
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table<StudentI>
                    columns={activeTab === "Student" ? HeaderStudent(handleDeletePopUp, handleUpdate) : HeaderStudentDraft(handleDeletePopUp, handleUpdate)}
                    data={students?.students!.map(item => ({...item, id: item.student_id}))}
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
