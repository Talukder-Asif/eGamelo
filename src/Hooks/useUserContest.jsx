import { useContext } from "react";
import { AuthContext } from "../Authantication/AuthProvider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useUserContest = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    // eslint-disable-next-line no-unused-vars
    const { data: Contest, isPending: isContestLoading, refetch } = useQuery({
        queryKey: ['isUsersContest'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${user?.email}`);
            return res.data;
        }
    });

    return [Contest, isContestLoading, refetch]
};

export default useUserContest;