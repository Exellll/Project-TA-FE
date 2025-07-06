import { useDeleteStaffMutation } from "_services/modules/staff";


const useDeleteStaffForm = () => {

    const [ useDelete , {isLoading}] = useDeleteStaffMutation();
    

    return { useDelete, isLoading };
}

export default useDeleteStaffForm;