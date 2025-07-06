import { Params } from "_interfaces/class.interface";
import { PresencesI } from "_interfaces/presences.interface";
import { SubjectsI } from "_interfaces/subject.interfaces";
import { useGetPresencesTodayQuery } from "_services/modules/presences";
import { useCreateSubjectMutation, useGetListSubjectQuery } from "_services/modules/subject";
import ContentContainer from "components/container";
import SubjectModal from "components/subject/UpsertModal";
import { Table } from "components/table/table";
import { HeaderPresences } from "data/table/Presences";
import { HeaderSubject } from "data/table/Subject";
import useSubjectForm from "hooks/subject/useUpsertSubject";
import TableLayout from "layout/table";
import React, { useState } from "react";

export const presenceRouteName = "presence";
export default function PresencePage(): React.ReactElement {
  const [searchParams, setSearchParams] = useState<Params>({
    search: "",
    limit: 20,
    page: 1,
  });
  const [type, setType] = useState<"create" | "update">("create");
  const [modalUpsert, setModalUpsert] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const { subjects } = useSubjectForm(searchParams);

  const handleDeletePopUp = () => {
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

  const {data} = useGetPresencesTodayQuery(searchParams);

  return (
    <ContentContainer>
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table<PresencesI>
                    columns={HeaderPresences(handleDeletePopUp, handleModalUpsert)}
                    data={data?.presences!}
                    loading={false}
                    id={selectedColumn}
                    setIsChecked={setSelectedColumn}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
