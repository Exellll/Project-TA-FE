import { Columns } from "components/table/table";
import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { AnnouncementI } from "_interfaces/announcement.interfaces";
import moment from "moment";

export const HeaderAnnouncement = (
    handleDeletePopUp: (id: string) => void,
    handleModalUpsert: (id: string) => void
): Columns<AnnouncementI>[] => {
    return [
        {
            fieldId: "checkbox",
            label: "checkbox",
        },
        {
            fieldId: "index",
            label: "No",
        },
        { fieldId: "title", label: "Judul Pengumuman" },
        { fieldId: "content", label: "Konten" },
        { fieldId: "type", label: "Tipe" },
        {
            fieldId: "published_at",
            label: "Tanggal Terbit",
            render: (data) => (
                <p className={`font-semibold`}>
                    {moment(data?.createdAt).format("DD-MM-YYYY")}
                </p>
            ),
        },
        {
            fieldId: "attachment_url",
            label: "Lampiran",
            render: (data) => {
                const attachment = data?.attachment_url || '';
                const isImage = /\.(jpg|jpeg|png|gif|svg)$/i.test(attachment);
                const isPDF = /\.pdf$/i.test(attachment);

                if (isImage) {
                    return (
                        <a
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            <img src={attachment} alt="Lampiran" className="w-16 h-16 object-cover" />
                        </a>
                    );
                } else if (isPDF) {
                    return (
                        <a
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            View PDF
                        </a>
                    );
                } else {
                    return <span className="text-gray-400 italic">No Attachment</span>;
                }
            },
            
        },
        {
            fieldId: "status",
            label: "Status",
            render: (data) => (
                <p
                    className={`font-semibold ${data?.status === true ? "text-[#45BF43]" : "text-[#FF0000]"
                        }`}
                >
                    {data?.status === true ? "active" : "inactive"}
                </p>
            ),
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
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                    >
                        <MenuItem
                            className="p-0"
                            onClick={() => handleModalUpsert(data?.id!)}
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                            placeholder={""}
                        >
                            <label
                                htmlFor="item-edit"
                                className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                            >
                                <MdEdit className="mt-1 me-3 h-4 w-4" />
                                Edit
                            </label>
                        </MenuItem>
                        <MenuItem
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                            placeholder={""}
                            className="p-0"
                            onClick={() => handleDeletePopUp(data?.id!)}
                        >
                            <label
                                htmlFor="item-delete"
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
