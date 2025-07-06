import { ResetPasswordForm } from "_interfaces/auth-api.interfaces";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "_services/errorHandler";
import {
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
} from "_services/modules/auth";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
interface props {
  setStep: Dispatch<SetStateAction<number>>;
  token: string | null;
  setErrorPassword: Dispatch<SetStateAction<string>>;
}
const useResetPasswordForm = ({ setStep, token, setErrorPassword }: props) => {
  const navigate = useNavigate();
  const [requestEmail, { isLoading }] = useRequestResetPasswordMutation();
  const [resetPasswordMutation, { isLoading: isLoadingPassword }] =
    useResetPasswordMutation();
  const schema = yup.object({}).required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    control,
  } = useForm<ResetPasswordForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const sendEmail = async (data: ResetPasswordForm) => {
    try {
      const payload = {
        email: data.email,
      };
      const res = await requestEmail(payload).unwrap();
      if (res.success) {
        toast.success("Email Sent");
        setStep(3);
      }
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const resetPassword = async (data: ResetPasswordForm) => {
    try {
      if (data.newPassword !== data.password) {
        setErrorPassword("Password Doesn't match");
      } else {
        const payload = {
          password: data.password,
          token: token as string,
        };
        if (token) {
          const res = await resetPasswordMutation(payload).unwrap();
          if (res.success) {
            toast.success("Password Successfully Changed");
            navigate("/");
          }
        }
      }
    } catch (error: any) {
      toast.error(error.data.message[0]);
      errorHandler(error);
    }
  };

  const handleSendEmail = handleSubmit(sendEmail);
  const handleResetPassword = handleSubmit(resetPassword);

  return {
    handleSubmit,
    register,
    errors,
    watch,
    control,
    handleSendEmail,
    handleResetPassword,
    isLoading,
    isLoadingPassword,
  };
};

export default useResetPasswordForm;
