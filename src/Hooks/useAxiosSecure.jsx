import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://end-game-server-delta.vercel.app',
    withCredentials: true,
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;