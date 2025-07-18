import React, { useState } from "react";
import { lowerCase } from "lodash";
import { Button, Modal } from "react-daisyui";

interface ErrorPopupProps {
  isOpen: boolean;
  data: string;
  onClose: () => void;
  onEdit: () => void;
  menu: string;
}

const DeletePopUp: React.FC<ErrorPopupProps> = ({
  isOpen,
  data,
  onClose,
  onEdit,
  menu,
}) => {
  return (
    <Modal
      open={isOpen}
      backdrop={false}
      className="flex flex-col justify-center items-center bg-white"
    >
      <Modal.Header className="flex flex-col items-center">
        <svg
          width="89"
          height="88"
          viewBox="0 0 89 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            width="88"
            height="88"
            rx="44"
            fill="#ffcdd2"
            fill-opacity="0.2"
          />
          <rect
            x="10.5"
            y="10"
            width="68"
            height="68"
            rx="34"
            fill="#ef9a9a"
            fill-opacity="0.2"
          />
          <path
            opacity="0.2"
            d="M60.8989 60.4998H28.1014C25.7352 60.4998 24.2502 58.0229 25.3996 56.0166L41.7983 27.541C42.9796 25.4785 46.0208 25.4785 47.2021 27.541L63.6008 56.0166C64.7502 58.0229 63.2652 60.4998 60.8989 60.4998Z"
            fill="#f44336"
          />
          <path
            d="M64.9001 55.267L48.5032 26.7914C48.0934 26.0937 47.5085 25.5153 46.8063 25.1134C46.1041 24.7114 45.3091 24.5 44.5001 24.5C43.691 24.5 42.896 24.7114 42.1938 25.1134C41.4916 25.5153 40.9067 26.0937 40.4969 26.7914L24.1001 55.267C23.7058 55.9418 23.498 56.7092 23.498 57.4907C23.498 58.2723 23.7058 59.0397 24.1001 59.7145C24.5046 60.4164 25.0885 60.998 25.792 61.3996C26.4955 61.8013 27.2932 62.0085 28.1032 62.0001H60.8969C61.7063 62.0079 62.5032 61.8003 63.206 61.3987C63.9088 60.997 64.4921 60.4158 64.8963 59.7145C65.2911 59.0401 65.4995 58.2728 65.5002 57.4913C65.5009 56.7097 65.2937 55.9421 64.9001 55.267ZM62.2994 58.2126C62.1565 58.4565 61.9513 58.6579 61.7048 58.7963C61.4584 58.9347 61.1795 59.005 60.8969 59.0001H28.1032C27.8206 59.005 27.5418 58.9347 27.2953 58.7963C27.0488 58.6579 26.8436 58.4565 26.7007 58.2126C26.5712 57.9934 26.5029 57.7435 26.5029 57.4889C26.5029 57.2343 26.5712 56.9843 26.7007 56.7651L43.0976 28.2895C43.2434 28.0468 43.4495 27.846 43.696 27.7066C43.9424 27.5672 44.2207 27.4939 44.5038 27.4939C44.7869 27.4939 45.0652 27.5672 45.3117 27.7066C45.5581 27.846 45.7642 28.0468 45.9101 28.2895L62.3069 56.7651C62.4353 56.985 62.5023 57.2353 62.501 57.4899C62.4996 57.7445 62.43 57.9941 62.2994 58.2126ZM43.0001 47.0001V39.5001C43.0001 39.1023 43.1581 38.7208 43.4394 38.4395C43.7207 38.1582 44.1022 38.0001 44.5001 38.0001C44.8979 38.0001 45.2794 38.1582 45.5607 38.4395C45.842 38.7208 46.0001 39.1023 46.0001 39.5001V47.0001C46.0001 47.3979 45.842 47.7795 45.5607 48.0608C45.2794 48.3421 44.8979 48.5001 44.5001 48.5001C44.1022 48.5001 43.7207 48.3421 43.4394 48.0608C43.1581 47.7795 43.0001 47.3979 43.0001 47.0001ZM46.7501 53.7501C46.7501 54.1951 46.6181 54.6301 46.3709 55.0002C46.1236 55.3702 45.7722 55.6586 45.3611 55.8288C44.95 55.9991 44.4976 56.0437 44.0611 55.9569C43.6246 55.8701 43.2237 55.6558 42.9091 55.3411C42.5944 55.0264 42.3801 54.6255 42.2933 54.1891C42.2065 53.7526 42.251 53.3002 42.4213 52.8891C42.5916 52.478 42.88 52.1266 43.25 51.8793C43.62 51.6321 44.055 51.5001 44.5001 51.5001C45.0968 51.5001 45.6691 51.7372 46.091 52.1591C46.513 52.5811 46.7501 53.1534 46.7501 53.7501Z"
            fill="#f44336"
          />
          <circle cx="63.5" cy="18" r="2" fill="#f44336" />
          <circle cx="20.5" cy="57" r="2" fill="#f44336" />
          <path
            d="M23.5001 20.2676L23.5001 23.7317L20.5001 21.9996L23.5001 20.2676Z"
            fill="#d32f2f"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M71.5 47C71.496 45.8968 70.6021 45.0037 69.5 45.0037C70.6046 45.0037 71.5 44.1066 71.5 43C71.504 44.1032 72.3979 44.9963 73.5 44.9963C72.3954 44.9963 71.5 45.8934 71.5 47Z"
            fill="#d32f2f"
          />
        </svg>
      </Modal.Header>
      <Modal.Body className="text-center text-sm font-medium">
        <div className="font-bold text-base">
          Are You Sure You Want to Delete {data} ?
        </div>
        This {lowerCase(menu)} will be deleted
      </Modal.Body>
      <Modal.Actions className="flex w-full flex-col justify-center items-center">
        <Button
          className="w-full rounded-full hover:text-red-700 mt-2 bg-red-700 text-white hover:bg-white/90 hover:border-red-700"
          type="button"
          onClick={onEdit}
        >
          Yes
        </Button>
        <Button
          type="button"
          className="w-full rounded-full text-white mt-2 bg-blue-300 hover:text-blue-300 hover:bg-white/90 border-blue-300 !ml-0"
          onClick={onClose}  
        >
          No
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeletePopUp;
