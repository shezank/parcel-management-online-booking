import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';

const axisoSecure = axios.create({
    baseURL: 'https://percel-management-web-server.vercel.app'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext) 
    axisoSecure.interceptors.request.use(function(config){
        const  token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

    axisoSecure.interceptors.response.use(function(response){
        return response ;
    }, async (error)=>{
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logout();
            navigate('/login');
        }
        return Promise.reject(error);
    })

    return axisoSecure;
};

export default useAxiosSecure;