import { Columns } from "components/table/table";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdCreate, MdDelete, MdGrade, MdUpdate, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { Class } from "_interfaces/class.interface";
import { useNavigate } from "react-router-dom";
export const HeaderSchedule = (
  handleDeletePopUp: (id: string) => void,
  handleUpdate: (id: string) => void
): Columns<Class>[] => {
  const navigate = useNavigate();
  return [
    {
      fieldId: "checkbox",
      label: "checkbox",
    },
    {
      fieldId: "index",
      label: "No",
    },
    { fieldId: "name", label: "Kelas" },
    // {
    //   fieldId: "homeroom",
    //   label: "Wali Kelas",
    //   render: (data) => (
    //     <p className="font-semibold">{data?.homeroom?.name ?? ""}</p>
    //   ),
    // },
    {
      fieldId: "??",
      label: "Tahun",
      render: (data) => <p className="font-semibold">2024</p>,
    },
    {
      fieldId: "capacity",
      label: "",
      renderHeader: () => (
        <p className="font-semibold">
          Kapasitas <br /> (Maksimal)
        </p>
      ),
    },
    {
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <p
          className={`font-semibold ${
            data?.status === "open" ? "text-[#45BF43]" : "text-[#FF0000]"
          }`}
        >
          {data?.status}
        </p>
      ),
    },
    {
      fieldId: "id",
      label: "",
      render: (data) => (
        <>
          <Menu>
            <MenuHandler>
              <Button
                size="sm"
                className="rounded text-center text-lg hover:bg-transparent text-san-juan border-none"
                onClick={() => {}}
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
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                placeholder={""}
                className="p-0"
                onClick={() => {
                  navigate(`/schedule/input/${data!.id}`);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                >
                  <MdCreate className="mt-1 me-3 h-4 w-4" />
                  Buat / Update Jadwal
                </label>
              </MenuItem>
              <MenuItem
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                placeholder={""}
                className="p-0"
                onClick={() => {
                  navigate(`/schedule/view/${data!.id}`)
                }}
              >
                <label
                  htmlFor="item-2"
                  className="flex cursor-pointer items-center gap-2 p-2 text-blue-ribbon-400 hover:bg-gray-100"
                >
                  <MdVisibility className="mt-1 me-3 h-4 w-4" />
                  Lihat Jadwal
                </label>
              </MenuItem>
              <MenuItem
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                placeholder={""}
                className="p-0"
                onClick={() => {
                  handleDeletePopUp(data!.id);
                }}
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
        </>
      ),
    },
  ];
};
