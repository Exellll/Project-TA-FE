import { Columns } from "components/table/table";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { ContentLibraryI } from "_interfaces/content-library.interfaces";
import moment from "moment";
import { SVGIcon } from "components/icon/SVGIcon";
import { DownloadSVG, FileSVG, FolderSVG } from "assets/images";
import { useAppSelector } from "store";

export const HeaderContentLibrary = (
  handleDeletePopUp: () => void,
  handleEdit: (id: string) => void
): Columns<ContentLibraryI>[] => {
  const { navigation } = useAppSelector(state => state.contentLibrary);

  return [
    {
      fieldId: "name",
      label: "",
      renderHeader: () => (
        <p className={`font-semibold w-full text-start`}>Nama File / Folder</p>
      ),
      render: (data) => {
         if(data?.type === "") {
          return <span className="flex items-center font-semibold">
            <SVGIcon svg={FolderSVG} className="bg-black mr-2" />
            . . / 
            {navigation.map((item, index) => {
            if(index != navigation.length - 1) {
              return <span key={index} className="cursor-pointer hover:underline"> 
              {index >= 1 ? " /" : ""}
              {item.name} 
              </span>
            }
            })}
          </span> 
         }
         return <span className="flex items-center font-semibold">
          {data?.type === "folder" ? (
            <SVGIcon svg={FolderSVG} className="bg-black mr-2" />
          ) : (
            <SVGIcon svg={FileSVG} className="bg-black mr-2" />
          )}
          {data?.name}
        </span> 
      },
    },
    {
      fieldId: "createdAt",
      label: "Tanggal Dibuat",
      render: (data) => {
        if(data?.type != "") {
          return <p className={`font-semibold`}>
            {moment(data?.createdAt).format("DD-MM-YYYY")}
          </p>;
        }
        return (
          <p className={`font-semibold`}></p>
        );
      },
    },
    {
      fieldId: "id",
      label: "",
      render: (data) => (
        <Menu>
          <MenuHandler>
            <Button
              size="sm"
              className="rounded text-center text-lg hover:bg-transparent text-san-juan border-none"
            >
              ...
            </Button>
          </MenuHandler>
          <MenuList
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={() => {
                handleEdit(data?.id!);
              }}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
              >
                <SVGIcon svg={DownloadSVG} className="bg-blue-ribbon" />
                Unduh
              </label>
            </MenuItem>
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={handleDeletePopUp}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
              >
                <MdDelete className="mt-1 me-3 h-4 w-4" />
                Delete
              </label>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];
};
