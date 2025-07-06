import { Input } from "react-daisyui";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import CInput from ".";
interface props {
  register: UseFormRegisterReturn<any>;
  leftIcon?: React.ReactElement;
  rightIconActive?: React.ReactElement;
  rightIconInactive?: React.ReactElement;
  showRightIcon?: boolean;
  errors?: FieldError | string;
  type: string;
  placeholder: string;
}
const CIconInput: React.FC<props> = ({
  register,
  rightIconActive,
  rightIconInactive,
  leftIcon,
  showRightIcon,
  errors,
  type,
  placeholder,
}) => {
  return (
    <div className="w-full">
      <div className="relative">
        <CInput
          {...register}
          className={`placeholder:text-sm font-semibold placeholder:font-normal ${
            errors
              ? "placeholder:text-[#FF204E] text-[#FF204E] border-[#FF204E]"
              : "placeholder:text-[#03014C] text-[#03014C] border-[#03014C]"
          } w-full p-8 ${leftIcon ? "pl-14" : ""}`}
          placeholder={placeholder}
          type={type}
        />
        <div className="absolute left-6 top-5 text-neutral-500">{leftIcon}</div>
        <div className="absolute right-6 top-5 text-neutral-500">
          {showRightIcon ? rightIconActive : rightIconInactive}
        </div>
      </div>
    </div>
  );
};

export default CIconInput;
