import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSubmit = (Id) => {
    const axiosSecure = useAxiosSecure()
    const { data: submit, isPending: issubmitLoading, refetch } = useQuery({
        queryKey: ['issubmit'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submission/${Id}`);
            return res.data;
        }
    });
    return [submit, issubmitLoading, refetch]
};

export default useSubmit;