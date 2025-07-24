import { Class, Params } from "_interfaces/class.interface";
import ContentContainer from "components/container";
import { SearchBox } from "components/input/SearchBox";
import Header from "components/shared/header";
import Pagination from "components/table/pagination";
import { Table } from "components/table/table";
import ClassModal from "components/upsertModal/upsertModalClass";
import { HeaderGrade } from "data/table/Grade";
import useClassManagement from "hooks/class/useClassManagement";
import TableLayout from "layout/table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const gradeRouteName = "/grade";
export default function GradePage(): React.ReactElement {
    const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
    const location = useLocation();

    const {
        listData,
        searchParams,
        setSearchParams,
        isDeletePopupOpen,
        handleClosePopUp,
        handleDeletePopUp,
        isFetchLoading,
        handleModalUpsert,
        modalUpsert,
        refetch,
        handleCreateStart,
        handleUpdateStart,
        selectedId,
        type,
    } = useClassManagement();

    useEffect(() => {
        if (location.state?.shouldRefetch) {
            refetch(); // Trigger the refetch
        }
    }, [location.state]);

    const handlePageChange = async (page: number): Promise<void> => {
        setSearchParams({ ...searchParams, page });
    };
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <>
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
                                    <Table<Class>
                                        columns={HeaderGrade(handleDeletePopUp, handleUpdateStart)}
                                        data={listData?.data ?? []}
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
