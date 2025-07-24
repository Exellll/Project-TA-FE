import moment from "moment";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import "react-toastify/dist/ReactToastify.css";
import { protectedRoutes, publicRoutes, studentRoutes, teacherRoutes } from "./routes";
import { RouteObject, useNavigate, useRoutes } from "react-router-dom";
import { deleteTokenAuth } from "store/auth";

const AppRoutes = () => {
  const { accessToken, expiresAt } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggingOut = () => {
    dispatch(deleteTokenAuth());
  };
  
  const roleRoutes = (): RouteObject[] => {
    if(accessToken) {
      const role = JSON.parse(atob(accessToken.split('.')[1])).role;
      if (role === 'superadmin') {
        return protectedRoutes;
      } else if (role === 'teacher') {
        return teacherRoutes;
      } else if (role === 'student') {
        return studentRoutes;
      } else if (role === 'parent') {
        return protectedRoutes;
      } else {
        return protectedRoutes;
      }
    } else {
      return publicRoutes;
    }
  }
  
  // useEffect(() => {
  //   if (expiresAt && accessToken) {
  //     const now = moment();
  //     const exp = moment(expiresAt);
  //     console.log(now, exp);
  //     if (exp.isBefore(now)) {
  //       loggingOut();
  //     }
  //   } else {
  //     loggingOut();
  //   }
  // }, [expiresAt, accessToken]);

  const permittedRoutes = roleRoutes();
  // const permittedRoutes = protectedRoutes;

  const element = useRoutes(permittedRoutes);

  return <div>{element}</div>;
};

export default AppRoutes;
