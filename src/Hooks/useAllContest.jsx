import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useAllContest = () => {
    const axiosSecure = useAxiosSecure();
    // eslint-disable-next-line no-unused-vars
    const { data: Contest, isPending: isContestLoading, refetch } = useQuery({
        queryKey: ['isContest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allcontests`);
            return res.data;
        }
    });

    return [Contest, isContestLoading, refetch]
};

export default useAllContest;