import { SchoolBadge } from "assets/images";
import OptimizedImage from "components/Image/OptimizedImage";
import { MenuItem, menuItems, teacherMenuItems } from "data/sidebar-menu";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "store";

interface SidebarProps {
  active: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  active,
  toggleSidebar,
}): JSX.Element => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const role = accessToken ? JSON.parse(atob(accessToken.split('.')[1])).role : null;
  let selectedMenus: MenuItem[] = [];

  if (role === "superadmin") {
    selectedMenus = menuItems;
  } else if (role === "teacher") {
    selectedMenus = teacherMenuItems;
  } else {
    selectedMenus = [];
  }

  const [menus, setMenus] = useState(selectedMenus);
  const location = useLocation();

  return (
    <>
      {active ? (
        <div className="fixed z-[99] top-0 left-0 w-full h-full bg-black opacity-50 lg:hidden"></div>
      ) : null}
      <aside
        className={`bg-[#FCFCFC] ${active ? "w-[60%]" : "hidden lg:block"
          } fixed lg:relative z-[999] left-0 inset-0 lg:inherit lg:w-[20%] max-h-screen overflow-y-scroll`}

      >
        <div className="pl-4 pr-2">
          <div className="lg:flex hidden w-full flex-col justify-center items-center gap-2 mb-5 mt-2">
            <OptimizedImage
              alt="School-badge"
              placeholderSrc="School-badge"
              src={SchoolBadge}
              width={80}
              resizeMode="cover"
            />
          </div>
          <div className="lg:hidden  flex w-full flex-row justify-between items-center gap-2 mb-5 mt-2">
            <OptimizedImage
              alt="School-badge"
              placeholderSrc="School-badge"
              src={SchoolBadge}
              width={80}
              resizeMode="cover"
            />
            <div
              className="flex relative cursor-pointer"
              onClick={toggleSidebar}
            >
              <IoChevronBackOutline
                size={20}
                className="absolute right-2"
                color="#ADADAD"
              />
              <IoChevronBackOutline size={20} color="#ADADAD" />
            </div>
          </div>
        </div>

        <div className="select-none px-4 mb-20">
          <ul className="flex flex-col">
            {menus.map((item, index) => {
              return (
                <>
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      location.pathname.includes(item.path) && item.path !== "#"
                        ? "bg-linear-blue rounded-3xl shadow-xl"
                        : "rounded-xl"
                    }
                    onClick={() => {
                      if (item.child) {
                        setMenus((prev) => {
                          let temp = [...prev];
                          temp[index].expand =
                            temp[index].expand === undefined
                              ? true
                              : !temp[index].expand;
                          return temp;
                        });
                      }
                    }}
                  >
                    <li
                      className={`flex items-center gap-4 rounded-3xl font-medium hover:bg-opacity-20 transition-all duration-100 p-4 ml-2 ${location.pathname.includes(item.path)
                          ? "text-white"
                          : "text-[#ACACAC] hover:bg-neutral-400"
                        }`}
                    >
                      {location.pathname.includes(item.path)
                        ? item.activeIcon
                        : item.icon}
                      {item.name}
                    </li>
                  </NavLink>
                  {item.expand && (
                    <ul className="whitespace-nowrap list-disc pl-10">
                      {item.child &&
                        item.child.map((child, i) => (
                          <NavLink
                            key={i}
                            to={child.path}
                            className={({ isActive }) => {
                              return isActive
                                ? "bg-blue-ribbon rounded-xl text-blue-ribbon"
                                : "rounded-xl text-gray-500 hover:text-blue-ribbon transition-all duration-100";
                            }}
                          >
                            <li className="hover:bg-blue-ribbon hover:bg-opacity-20 transition-all duration-100 p-4 cursor-pointer ml-2 rounded-l-3xl">
                              {child.name}
                            </li>
                          </NavLink>
                        ))}
                    </ul>
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
