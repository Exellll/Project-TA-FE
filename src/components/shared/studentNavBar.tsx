import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { SchoolBadge, DefaultAvatar, LogoutSVG } from "assets/images";
import OptimizedImage from "components/Image/OptimizedImage";
import { useAppDispatch, useAppSelector } from "store";
import { deleteTokenAuth } from "store/auth";
import { SVGIcon } from "components/icon/SVGIcon";
import { Button, Modal, Avatar, Menu } from "react-daisyui";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FiSettings } from "react-icons/fi";
import path from "path";

const studentMenu = [
  { name: "Beranda", path: "/landingpage", icon: "🏠" },
  { name: "Nilai", path: "/student/grades", icon: "📊" },
  { name: "Jadwal", path: "/student/schedule", icon: "📅" },
  { name: "Tagihan", path: "/student/billing", icon: "💰" },
  { name: "Pengumuman", path: "/student/announcement", icon: "📢" },
  { name: "Ekskul", path: "/student/ekstrakulikuler", icon: "🎨" },
];

const getUsernameFromToken = (token: string): { username: string | null; role: string | null } => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      username: payload.username || null,
      role: payload.role || null,
    };
  } catch (error) {
    return {
      username: null,
      role: null,
    };
  }
};

const StudentNavbar: React.FC = () => {
  const location = useLocation();
  const [menus] = useState(studentMenu);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { accessToken } = useAppSelector((state) => state.auth);
  const { username, role } = getUsernameFromToken(accessToken || '');

  const handleShowDialog = useCallback(() => {
    modalRef.current?.showModal();
    setMenuOpen(false);
  }, []);
  const handleCloseDialog = useCallback(() => {
    modalRef.current?.close();
  }, []);
  const handleLogout = () => {
    dispatch(deleteTokenAuth());
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <nav className="bg-white shadow-md w-full z-50 px-4 py-3 lg:px-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <OptimizedImage
            alt="School-badge"
            placeholderSrc="School-badge"
            src={SchoolBadge}
            width={40}
            resizeMode="cover"
          />
          <span className="text-lg font-semibold hidden sm:block text-gray-800">
            Student Portal
          </span>
        </div>

        <ul className="flex gap-4 flex-wrap justify-center">
          {menus.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-1 px-4 py-2 rounded-xl font-medium transition ${
                  isActive || location.pathname.includes(item.path)
                    ? "bg-blue-500 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.name}</span>
            </NavLink>
          ))}
        </ul>

        <div className="relative mt-2 sm:mt-0">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleMenu}
          >
            <Avatar
              size="xs"
              shape="circle"
              src={DefaultAvatar}
              className="cursor-pointer"
            />
            <div className="flex flex-col text-sm leading-tight">
              <span className="font-semibold text-gray-800">{username}</span>
              <span className="text-gray-500">{role === 'student' ? 'Siswa' : 'Orang Tua'}</span>
            </div>
          </div>

          {menuOpen && (
            <Menu className="z-[999] absolute top-[50px] right-0 bg-white w-56 shadow-md">
              <Menu.Item>
                <NavLink to="#" className="flex items-center gap-2">
                  <FiSettings size={20} />
                  <span className="font-bold">Settings</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="flex items-center gap-2 w-full"
                  onClick={handleShowDialog}
                >
                  <SVGIcon svg={LogoutSVG} className="bg-[#FF0000]" />
                  <span className="font-bold text-[#FF0000]">Logout</span>
                </button>
              </Menu.Item>
            </Menu>
          )}
        </div>
      </nav>

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

export default StudentNavbar;
