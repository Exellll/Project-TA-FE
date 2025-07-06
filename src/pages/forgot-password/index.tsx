import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import CIconInput from "components/input/CIconInput";
import { IoMailOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import Loading from "../../assets/images/loading.json";
import Lottie from "lottie-react";
import useResetPasswordForm from "hooks/auth/useResetPasswordForm";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);
  const [step, setStep] = useState<number>(1);
  const {
    register,
    handleSendEmail,
    errors,
    handleResetPassword,
    isLoading,
    isLoadingPassword,
    watch,
  } = useResetPasswordForm({ setStep, token, setErrorPassword });
  const newPass = watch("newPassword");

  useEffect(() => {
    if (token) {
      setStep(2);
    }
  }, [token]);

  useEffect(() => {
    setErrorPassword("");
  }, [newPass]);

  return (
    <div className="flex flex-col">
      {step === 3 ? (
        <>
          <div className={`flex flex-col gap-8`}>
            <h1
              className={`text-5xl font-[700] text-[#1A354B] relative w-full`}
            >
              Reset Password
            </h1>
            <small className="text-sm font-normal text-[#03014C]">
              Please check your email to reset your password
            </small>
          </div>
          <Lottie animationData={Loading} loop={true} width={500} />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-8 mb-10">
            <h1 className="text-5xl font-[700] text-[#1A354B]">
              {step === 1 ? "Forgot Password" : "Reset Password"}
            </h1>
            <small className="text-sm font-normal text-[#03014C]">
              {step === 1
                ? "Enter your registered email below to receive password reset intruction"
                : "Please enter your new password"}
            </small>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 1) {
                handleSendEmail();
              } else {
                handleResetPassword();
              }
            }}
            className="font-poppins"
          >
            <div className="flex flex-col h-[220px] pt-8 justify-around w-full mb-20">
              {step === 1 && (
                <CIconInput
                  register={register("email")}
                  errors={errors.email}
                  leftIcon={
                    <IoMailOutline
                      className={`w-6 h-6 cursor-pointer ${
                        errors.email ? "text-[#FF204E]" : "text-[#03014C]"
                      }`}
                    />
                  }
                  type={"email"}
                  placeholder="Enter email"
                />
              )}
              {step === 2 && (
                <>
                  <CIconInput
                    register={register("password")}
                    errors={errors.password}
                    leftIcon={
                      <MdLockOutline
                        className={`w-6 h-6 cursor-pointer ${
                          errors.password ? "text-[#FF204E]" : "text-[#03014C]"
                        }`}
                      />
                    }
                    rightIconActive={
                      <EyeIcon
                        className={`w-6 h-6 cursor-pointer ${
                          errors.password ? "text-[#FF204E]" : "text-[#03014C]"
                        }`}
                        onClick={() => {
                          setHidePassword(false);
                        }}
                      />
                    }
                    rightIconInactive={
                      <EyeSlashIcon
                        className={`w-6 h-6 cursor-pointer ${
                          errors.password ? "text-[#FF204E]" : "text-[#03014C]"
                        }`}
                        onClick={() => {
                          setHidePassword(true);
                        }}
                      />
                    }
                    showRightIcon={hidePassword}
                    type={hidePassword ? "password" : "text"}
                    placeholder="New Password"
                  />
                  <CIconInput
                    register={register("newPassword")}
                    errors={errorPassword}
                    leftIcon={
                      <MdLockOutline
                        className={`w-6 h-6 cursor-pointer ${
                          errorPassword ? "text-[#FF204E]" : "text-[#03014C]"
                        }`}
                      />
                    }
                    rightIconActive={
                      <EyeIcon
                        className={`w-6 h-6 cursor-pointer ${
                          errorPassword ? "text-[#FF204E]" : "text-[#03014C]"
                        }`}
                        onClick={() => {
                          setHidePassword2(false);
                        }}
                      />
                    }
                    rightIconInactive={
                      <EyeSlashIcon
                        className={`w-6 h-6 cursor-pointer ${
                          errorPassword ? "text-[#FF204E]" : "text-[#03014C]"
                        }`}
                        onClick={() => {
                          setHidePassword2(true);
                        }}
                      />
                    }
                    showRightIcon={hidePassword2}
                    type={hidePassword2 ? "password" : "text"}
                    placeholder="Confirm Password"
                  />
                </>
              )}
              <section className="flex justify-center">
                <p className="text-[#FF204E] text-base font-semibold">
                  {errorPassword}
                </p>
              </section>
            </div>
            <Button
              type="submit"
              className="bg-[#173044] hover:bg-[#173044]/90 w-full text-white text-base font-semibold rounded-md py-6 items-center h-full shadow-xl"
              loading={isLoading || isLoadingPassword}
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
