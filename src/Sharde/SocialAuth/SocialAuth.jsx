import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hoocks/useAxiosPublic/useAxiosPublic';

const SocialAuth = () => {
    const {googleLogin} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    const axiosPublice = useAxiosPublic()

    const HandleSocial = (social) =>{
        social()
        .then(result =>{
          const user =  result.user;
          console.log(user)
          const socialUser = {
            name: result.user?.displayName,
            email: result.user?.email
          }
          axiosPublice.post('/users', socialUser )
          .then(res => {
            const user = res.data;
            console.log(user)
          })
          navigate(from, { replace: true });
        })
    }
    return (
        <button onClick={()=> HandleSocial(googleLogin)} className="btn btn-primary rounded-t-none">
            <FaGoogle></FaGoogle>
            Google
        </button>
    );
};

export default SocialAuth;