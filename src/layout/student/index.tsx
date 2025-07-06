import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import StudentNavbar from "components/shared/studentNavBar";
import StudentContainer from "layout/container/index-student";

const StudentLayout: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("Spix | Student")}</title>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
        <StudentNavbar />
        <StudentContainer>
            <Outlet />
        </StudentContainer>
      </div>
    </>
  );
};

export default StudentLayout;
