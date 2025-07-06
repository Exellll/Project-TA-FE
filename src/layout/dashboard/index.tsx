import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "components/shared/header";
import Sidebar from "components/shared/sidebar";
import Container from "layout/container";
import "react-datetime/css/react-datetime.css";

const DashboardLayout: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [navbarActive, setNavbarActive] = useState<boolean>(false);
  const toggleSidebar = (): void => {
    setNavbarActive((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>{t("Spix | Community")}</title>
      </Helmet>
      <div className="block lg:flex lg:flex-row">
        <Sidebar active={navbarActive} toggleSidebar={toggleSidebar} />
        <Container className={`${"w-full lg:w-[80%] lg:relative"}`}>
          <Header
            className={`${"w-full lg:absolute"}`}
            toggleSidebar={toggleSidebar}
          />
          <Outlet />
        </Container>
      </div>
    </>
  );
};

export default DashboardLayout;
