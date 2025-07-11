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
  const errorClass = errors
    ? "placeholder:text-[#FF204E] text-[#FF204E] border-[#FF204E]"
    : "placeholder:text-[#03014C] text-[#03014C] border-[#03014C]";

  return (
    <div className="w-full">
      <div className="relative">
        {/* Input */}
        <CInput
          {...register}
          className={`w-full pl-12 pr-12 py-3 text-sm font-semibold rounded-md border placeholder:font-normal placeholder:text-sm ${errorClass}`}
          placeholder={placeholder}
          type={type}
        />

        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#03014C]">
            {leftIcon}
          </div>
        )}

        {/* Right Icon */}
        {(rightIconActive || rightIconInactive) && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#03014C]">
            {showRightIcon ? rightIconActive : rightIconInactive}
          </div>
        )}
      </div>
    </div>
  );
};

export default CIconInput;
