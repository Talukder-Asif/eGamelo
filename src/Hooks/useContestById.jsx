import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useContestById = (Id) => {

    const axiosPublic = useAxios()
    const { data: contest, isPending: isContestLoading, refetch } = useQuery({
        queryKey: ['isContest'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contest/${Id}`);
            return res.data;
        }
    });
    return [contest, isContestLoading, refetch]
};

export default useContestById;