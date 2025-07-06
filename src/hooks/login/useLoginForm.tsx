import { LoginReqI } from "_interfaces/auth-api.interfaces";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "store";
import { useLoginMutation } from "_services/modules/auth";
import { saveTokenAuth } from "store/auth";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";

const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }).required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<LoginReqI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const _login = async (data: LoginReqI) => {
    try {
      const res = await login(data).unwrap();
      dispatch(saveTokenAuth(res));
      if (res) {
        navigate("/dashboard");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleLogin = handleSubmit(_login);

  return { handleLogin, register, errors, watch, isLoading };
};

export default useLoginForm;
