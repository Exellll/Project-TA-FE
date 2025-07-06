import { useGetListSubjectQuery } from "_services/modules/subject";
import { useEffect, useState } from "react";


const useGetDataForm = (id: string) => {
    const { data, isLoading } = useGetListSubjectQuery({ page: 1, limit: 20, search: "" });
    const [subjects,setSubjects] = useState([]);

    // useEffect(() => {
    //     if(data){
    //         setSubjects(data);
    //     }
    // });
}

export default useGetDataForm;