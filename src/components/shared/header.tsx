import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  DefaultAvatar,
  LogoutSVG,
  NotifNormalSVG,
  SpixCommunityLogoGray,
} from "assets/images";
import OptimizedImage from "components/Image/OptimizedImage";
import { SVGIcon } from "components/icon/SVGIcon";
import { HeaderName } from "data/header-name";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import { Avatar, Button, Menu, Modal } from "react-daisyui";
import { FiSettings, FiUser } from "react-icons/fi";
import { IoChevronBackOutline, IoMenuOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
// import { useNotificationCountQuery } from "_services/modules/notification";
// import { useGetProfileQuery } from "_services/modules/profile";
import { useAppDispatch } from "store";
import { deleteTokenAuth } from "store/auth";
interface HeaderProps {
  toggleSidebar: () => void;
  className?: string;
  toggleRightbar?: () => void;
}

interface HeaderMenuProps {}

const HeaderMenu: React.FC<HeaderMenuProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleShowDialog = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  const handleCloseDialog = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  const handleLogout = () => {
    dispatch(deleteTokenAuth());
  };
  return (
    <>
      <Menu className="z-[999] absolute top-[60px] right-0 bg-white w-56 shadow-md">
        <Menu.Item>
          <Link to="#" className="flex items-center gap-2">
            <FiSettings size={20} />
            <span className="font-bold">Settings</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            to="#"
            className="flex items-center gap-2"
            onClick={handleShowDialog}
          >
            <SVGIcon svg={LogoutSVG} className="bg-[#FF0000]" />
            <span className="font-bold text-[#FF0000]">Logout</span>
          </Link>
        </Menu.Item>
      </Menu>
      <ForwardedRefLogoutModal
        ref={modalRef}
        handleLogout={handleLogout}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

interface ModalLogoutProps {
  handleClose: () => void;
  handleLogout: () => void;
}
const LogoutModal: ForwardRefRenderFunction<
  HTMLDialogElement,
  ModalLogoutProps
> = ({ handleClose, handleLogout }, ref) => {
  return (
    <div className="font-sans">
      <Modal backdrop={true} ref={ref} className="bg-white">
        <Modal.Header className="font-bold">
          Are you sure want to log out?
        </Modal.Header>
        <Modal.Body>
          Press ESC key or click the button below to close
        </Modal.Body>
        <Modal.Actions>
          <Button
            onClick={handleLogout}
            className="text-white bg-[#FF0000] hover:border-[#FF0000] hover:text-[#FF0000]"
          >
            Yes, sure
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
const ForwardedRefLogoutModal = forwardRef(LogoutModal);

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  className,
  toggleRightbar,
}): JSX.Element => {
  const location = useLocation();
  const path = location.pathname;
  const [toolbarMenuVisible, setToolbarMenuVisible] = useState<boolean>(false);
  const toggleToolbarMenuVisible = () => setToolbarMenuVisible((prev) => !prev);
  // const { data } = useGetProfileQuery();
  const Header = HeaderName.find((item) => {
    return path.slice(1).includes(item.path);
  });
  // const { data: NotifCount, refetch } = useNotificationCountQuery();
  return (
    <>
      <nav
        className={`lg:flex fixed z-[998] select-none h-[60px] bg-[#FCFCFC] py-4 pt-14 pr-8 hidden top-0 justify-between items-center ${className}`}
      >
        <div className="p-2">
          <h1 className="text-2xl font-bold text-black">{Header?.title}</h1>
        </div>
        <div className="flex items-center gap-4 p-2 relative">
          <div className="flex p-2 rounded-xl bg-white items-center relative shadow-md">
            {/* {NotifCount?.data !== 0 ? (
              <div className="w-2 h-2 bg-[#FF0000] rounded-full absolute right-2 top-2"></div>
            ) : null} */}
            <SVGIcon svg={NotifNormalSVG} className="bg-blue-ribbon" />
          </div>
          {/* {notificationVisible && <Notification isOpen={notificationVisible} />} */}
          <div className="flex items-center gap-4">
            <Avatar
              size="xs"
              shape="circle"
              src={DefaultAvatar}
              onClick={toggleToolbarMenuVisible}
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-[#2E2E2E]">John Doe</p>
              <p className="text-sm font-normal text-[#2E2E2E]">
                Kepala Sekolah
              </p>
            </div>
          </div>
          {toolbarMenuVisible && <HeaderMenu />}
        </div>
      </nav>
      <nav
        className={`bg-white lg:hidden z-[998] flex flex-col select-none h-fit mb-2 top-0 ${className}`}
      >
        <div className="flex justify-between items-center">
          <div className="p-2">
            <OptimizedImage
              src={SpixCommunityLogoGray}
              alt="spix"
              placeholderSrc="spix"
              resizeMode="contain"
              width={150}
            />
          </div>
          <div className="flex items-center gap-4 p-2 relative">
            <div className="flex p-2 rounded-xl bg-white items-center relative shadow-md">
              {/* {NotifCount?.data !== 0 ? (
                <div className="w-2 h-2 bg-[#FF0000] rounded-full absolute right-2 top-2"></div>
              ) : null} */}
              <SVGIcon svg={NotifNormalSVG} className="bg-blue-ribbon" />
            </div>

            <Avatar
              onClick={toggleToolbarMenuVisible}
              className="cursor-pointer"
              size="xs"
              shape="circle"
              src={DefaultAvatar}
            />
            {toolbarMenuVisible && <HeaderMenu />}
          </div>
        </div>
        <div className="flex justify-between items-center bg-white p-2 w-full">
          <IoMenuOutline
            size={30}
            className="flex relative cursor-pointer"
            onClick={toggleSidebar}
          />
          <div className="p-2">
            <h1 className="text-base font-bold text-black">{Header?.title}</h1>
          </div>
          <div className="min-w-[30px]">
            <div
              className={`${
                toggleRightbar !== undefined ? "flex" : "hidden"
              } relative cursor-pointer`}
              onClick={toggleRightbar}
            >
              <IoChevronBackOutline
                size={20}
                className="absolute right-4"
                color="#ADADAD"
              />
              <IoChevronBackOutline size={20} color="#ADADAD" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
