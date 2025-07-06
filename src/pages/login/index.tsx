import { useState } from "react";
import { Button } from "react-daisyui";
import useLoginForm from "hooks/login/useLoginForm";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, UserIcon } from "@heroicons/react/24/outline";
import { MdLockOutline } from "react-icons/md";
import CIconInput from "components/input/CIconInput";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const { register, handleLogin, errors, isLoading } = useLoginForm();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col gap-8 mb-10">
        <h1 className="text-5xl font-[700] text-[#1A354B]">Log In</h1>
        <small className="text-sm font-normal text-[#03014C]">
          Enter to continue and explore.
        </small>
      </div>
      <form
        onSubmit={handleLogin}
        className="font-poppins"
      >
        <div className="flex flex-col h-[200px] pt-8 justify-around w-full">
          <CIconInput
            register={register("email")}
            errors={errors.email}
            leftIcon={
              <UserIcon
                className={`w-6 h-6 cursor-pointer ${
                  errors.email ? "text-[#FF204E]" : "text-[#03014C]"
                }`}
              />
            }
            type={"email"}
            placeholder="Enter email"
          />
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
            placeholder="Password"
          />
        </div>
        <section className="flex flex-row justify-end w-full text-center mt-2 mb-20">
          <p
            className="text-sm font-[700] text-[#03014C] cursor-pointer"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password?
          </p>
        </section>
        <Button
          type="submit"
          className="bg-[#173044] hover:bg-[#173044]/90 w-full text-white text-base font-semibold rounded-md py-6 items-center h-full shadow-xl"
          loading={isLoading}
        >
          Login
        </Button>
        <section className="flex flex-row justify-start w-full text-center mt-10 gap-2">
          <p className="text-sm font-[700] text-[#03014C]">
            Don't have an account?{" "}
            <span
              onClick={() => {
                navigate("/register");
              }}
              className="text-[#3B7EAD] cursor-pointer hover:text-[#3B7EAD]/80"
            >
              Create an Account
            </span>
          </p>
        </section>
      </form>
    </div>
  );
};

export default Login;

