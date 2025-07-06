import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateSubjectMutation, useUpdateSubjectMutation } from "_services/modules/subject";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { SubjectsFormsI } from "_interfaces/subject.interfaces";
import { Params } from "_interfaces/class.interface";
import { useGetPendingLeaveRequestQuery, useRejectLeaveRequestMutation } from "_services/modules/leave-request";
import { LeaveRequestI } from "_interfaces/leave-requests.interface";

const useLeaveRequest = (searchParams : Params, id: string) => {
  const [reject] = useRejectLeaveRequestMutation();

  const {data, refetch, isLoading } = useGetPendingLeaveRequestQuery(searchParams, {skip: !searchParams.page && !searchParams.limit});

  const navigate = useNavigate();

  const schema = yup
    .object({}).required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    control,
  } = useForm<LeaveRequestI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const _RejectLeaveRequest = async (data: LeaveRequestI) => {
    try {
      const res = await reject({id}).unwrap();
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleReject = handleSubmit(_RejectLeaveRequest);

  return { handleReject, register, errors, watch, leave_request: data, reset, control, isLoading };
};

export default useLeaveRequest;


