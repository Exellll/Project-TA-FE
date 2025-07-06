import { SchoolPng } from "assets/images";
import OptimizedImage from "components/Image/OptimizedImage";
import { Outlet } from "react-router-dom";
interface AuthLayoutProps {}
const AuthLayout: React.FC<AuthLayoutProps> = (): React.ReactElement => {
  return (
    <div className="flex justify-between w-screen bg-black max-h-screen">
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 h-screen">
        <img
          src={SchoolPng}
          alt="School"
          className="object-fill w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center bg-white w-full md:w-1/2 h-screen overflow-auto">
        <div className="bg-white w-full px-8 lg:px-[18%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
