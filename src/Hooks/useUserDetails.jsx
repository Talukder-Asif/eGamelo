import { useContext } from "react";
import { AuthContext } from "../Authantication/AuthProvider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserDetails = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    // eslint-disable-next-line no-unused-vars
    const { data: User, isPending: isUserLoading, refetch } = useQuery({
        queryKey: [user?.email, 'isUser'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            return res.data;
        }
    });

    return [User, isUserLoading, refetch]
};

export default useUserDetails;