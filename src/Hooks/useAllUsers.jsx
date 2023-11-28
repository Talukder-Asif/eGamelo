import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllUsers = () => {
    const axiosSecure = useAxiosSecure();
    // eslint-disable-next-line no-unused-vars
    const { data: Users, isPending: isUsersLoading, refetch } = useQuery({
        queryKey: ['Users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    return [Users, isUsersLoading, refetch]
};

export default useAllUsers;