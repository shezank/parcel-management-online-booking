import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { updateProfile } from 'firebase/auth';
import useAxiosPublic from '../../Hoocks/useAxiosPublic/useAxiosPublic';
import SocialAuth from '../../Sharde/SocialAuth/SocialAuth';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';


const Register = () => {
    const axiosPublice = useAxiosPublic()
    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                updateProfile(user, {
                    displayName: data.name, photoURL: data.photourl
                }).then(() => {
                    const user = {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        role: data.role
                    }
                    axiosPublice.post('users', user)
                        .then(res => {
                            if (res.data) {
                                swal("Good job!", "You Successfully Register Your Account!", "success");
                                navigate(from, { replace: true });
                            }
                        })
                }).catch((error) => {
                    console.error(error)
                });
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Register now!</h1>

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Name*</span>
                            </label>
                            <input type="text" name='name'
                                {...register("name", {
                                    required: true,
                                    minLength: 4,
                                    maxLength: 20
                                })}

                                placeholder="Your Name" className="input input-bordered" />
                            {errors.name?.type === 'required' && <span className='text-red-500'>name is required</span>}
                            {errors.name?.type === 'minLength' && <span className='text-red-500'>name is use minimum  4 charecters</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL*</span>
                            </label>
                            <input type="text" name='name'
                                {...register("photourl", {
                                    required: true,
                                })}

                                placeholder="Your Photo URL" className="input input-bordered" />
                            {errors.photourl?.type === 'required' && <span className='text-red-500'>Photo URL is required</span>}


                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Email*</span>
                            </label>
                            <input type="email" name='email'
                                {...register("email", { required: true })}
                                placeholder="email" className="input input-bordered" />
                            {errors.email && <span className='text-red-500'>Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Phone No*</span>
                            </label>
                            <input type="text" name='phone'
                                {...register("phone", {
                                    required: true,
                                })}

                                placeholder="Your Phone No" className="input input-bordered" />
                            {errors.photourl?.type === 'required' && <span className='text-red-500'>Photo URL is required</span>}


                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password*</span>
                            </label>
                            <input type="password" name='password'
                                {...register("password", {
                                    required: true,
                                    pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
                                })}
                                placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'pattern' && <span className='text-red-500'>Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className=''>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Please Seleted Your Option</span>
                                </label>
                                <select  {...register("role", { required: true })} className="select select-bordered">
                                    <option value={'User'} selected>As A User</option>
                                    <option value={'Delivery Man'} >As A Delivery Man</option>
                                </select>
                                {errors.role?.type === 'require' && <span className='text-red-500'>Selected Your Role Option</span>}

                            </div>

                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className='text-center'><small>Already Have A Account?  </small><Link className='underline' to={'/login'}>Login</Link></p>
                    <div className="divider"></div>
                    <SocialAuth></SocialAuth>
                </div>
            </div>
        </div>
    );
};

export default Register;