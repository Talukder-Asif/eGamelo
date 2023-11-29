import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://end-game-server-delta.vercel.app'
})

const useAxios = () => {
    return axiosPublic;
};

export default useAxios;