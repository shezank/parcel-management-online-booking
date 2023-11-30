import axios from 'axios';
import React from 'react';

const axiosPublice = axios.create({
    baseURL: 'https://percel-management-web-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublice;
};

export default useAxiosPublic;