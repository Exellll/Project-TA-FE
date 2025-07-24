import { ContentLibraryI } from "_interfaces/content-library.interfaces";
import { useGetContentLibraryByParentQuery } from "_services/modules/content-library";
import { DownloadSVG, FileUploadSVG, FolderUploadSVG } from "assets/images";
import ContentContainer from "components/container";
import ContentLibraryModal from "components/content-library/CreateFolderModal";
import { SVGIcon } from "components/icon/SVGIcon";
import { SearchBox } from "components/input/SearchBox";
import DeletePopUp from "components/modal/other/Delete";
import Pagination from "components/table/pagination";
import { Table } from "components/table/table";
import { HeaderContentLibrary } from "data/table/Content-library";
import useContentLibrary from "hooks/content-library/useContentLibrary";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { useAppSelector } from "store";
import { deleteContentLibraryID, saveContentLibraryID } from "store/content-library";

export const contentLibraryRouteName = "content-library";
export default function ContentLibraryPage(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { navigation } = useAppSelector(state => state.contentLibrary);

  const [tableData, setTableData] = useState<ContentLibraryI[]>([]);
  const [dataFolder, setFolderData] = useState<ContentLibraryI[]>([]);
  const [searchParams, setSearchParams] = useState({
    search: "",
    limit: 10,
    page: 1,
  });
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [modalUpsert, setModalUpsert] = useState<boolean>(false);
  const [type, setType] = useState<"folder" | "file">("folder");
  const handleFolderModal = (type: "folder" | "file") => {
    setModalUpsert(!modalUpsert);
    setType(type);
  };


  const handleCloseModal = () => {
    setModalUpsert(!modalUpsert);
  }

  const handleDeletePopUp = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };
  const handleCreatePost = (): void => {
    void navigate("/post/create");
  };

  const handleEditPost = (id: string): void => {
    void navigate(`/post/${id}/edit`);
  };

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  const { data, isLoading } = useContentLibrary(searchParams);
  const { data: folderData, isLoading: isFolderLoading } = useGetContentLibraryByParentQuery(navigation[navigation.length - 1]?.id!, { skip: !navigation[navigation.length - 1]?.id });

  const handleRowClick = (item: ContentLibraryI): void => {
    if (item.type === "folder") {
      dispatch(saveContentLibraryID({ id: item.id, name: item.name }));
    }else if (item.type === "file") {
      const dummyFileUrl = item.file_url;
      downloadFile(dummyFileUrl, item.name);
    } else if(item.type === "") {
      dispatch(deleteContentLibraryID());
      setFolderData([]);
    }
    // download coba cari virtual dom
  };

  const downloadFile = (url: string, fileName: string): void => {
    // loading true
    fetch(url).then((response) => response.blob()).then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    }).finally(() => {
      // loading false
    });
  };

  useEffect(() => {
    // render data tabel berdasarkan id folder
    if (navigation.length > 0 && dataFolder) {
      setTableData([{
        "id": "",
        "name": "",
        "file_url": "",
        "type": "",
        "parent": "",
        "owner": "",
        "createdAt": "",
        "updatedAt": "",
        "deletedAt": null
      }, ...dataFolder]);
    } else if (data) {
      setTableData(data.contentLibrary || []);
    }
  }, [navigation, data, dataFolder]);

  useEffect(() => {
    if(folderData){
      setFolderData(folderData);
    }
  },[folderData]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ContentContainer>
      <DeletePopUp
        isOpen={isDeletePopupOpen}
        data={navigation.length > 0 ? "File Name" : "Post"}
        onClose={handleDeletePopUp}
        onEdit={() => {
          handleDeletePopUp();
        }}
        menu="Post"
      />
      <ContentLibraryModal
        isOpen={modalUpsert}
        handler={handleCloseModal}
        type={type}
      />
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <SearchBox className="py-4" />
              <SVGIcon svg={DownloadSVG} className="bg-blue-ribbon" />
              <button onClick={() => handleFolderModal("folder")}>
                <SVGIcon svg={FolderUploadSVG} className="bg-blue-ribbon" />
              </button>
              <button onClick={() => handleFolderModal("file")}>
                <SVGIcon svg={FileUploadSVG} className="bg-blue-ribbon" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table<ContentLibraryI>
                    columns={HeaderContentLibrary(
                      handleDeletePopUp,
                      handleEditPost
                    )}
                    data={tableData}
                    loading={navigation.length > 0 ? isFolderLoading : isLoading}
                    id={selectedColumn}
                    setIsChecked={setSelectedColumn}
                    onRowClick={handleRowClick}
                    action={true}
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
