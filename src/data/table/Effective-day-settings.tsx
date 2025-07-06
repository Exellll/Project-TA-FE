import { Columns } from "components/table/table";
import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "react-daisyui";
import { EdsI } from "_interfaces/effective-day-settings.interface";

export const HeaderEffectiveDaySettings = (
    handleEffectiveDay: (index: number, isEffective: string) => void,
    //   handleModalUpsert: (id: string) => void
): Columns<string>[] => {
    return [
        {
            fieldId: "effectiveDay",
            label: "Hari",
        },
        // {
        //   fieldId: "status",
        //   label: "Status",
        //   render: (data) => (
        //     <p
        //       className={`font-semibold ${
        //         data?.status === true ? "text-[#45BF43]" : "text-[#FF0000]"
        //       }`}
        //     >
        //       {data?.status === true ? "active" : "inactive"}
        //     </p>
        //   ),
        // },
        {
            fieldId: "status",
            label: "Status",
            render: (data, index) => (
                <Menu>
                    <MenuHandler>
                        <Button
                            size="sm"
                            className="rounded text-center text-lg hover:bg-transparent text-san-juan border-none"
                        >
                            {data === "true" ? "Efektif" : "Tidak Efektif"}
                        </Button>
                    </MenuHandler>
                    <MenuList
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                    >
                        {/* bisa pake select option -> control react hooks form */}
                        <MenuItem
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                            placeholder={""}
                            className="p-0"
                            onClick={() => handleEffectiveDay(index!, "true")}
                        >
                            <label
                                htmlFor="item-delete"
                                className="flex cursor-pointer items-center gap-2 p-2 text-black hover:bg-gray-100"
                            >
                                Efektif
                            </label>
                        </MenuItem>
                        <MenuItem
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                            placeholder={""}
                            className="p-0"
                            onClick={() => handleEffectiveDay(index!, "false")}
                        >
                            <label
                                htmlFor="item-delete"
                                className="flex cursor-pointer items-center gap-2 p-2 text-black hover:bg-gray-100"
                            >
                                Tidak Efektif
                            </label>
                        </MenuItem>
                    </MenuList>
                </Menu>
            ),
        },
    ];
};
