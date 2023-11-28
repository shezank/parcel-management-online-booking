import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import SocialAuth from '../../Sharde/SocialAuth/SocialAuth';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';

const Login = () => {
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const captureRef = useRef(null);
    const [disable, setDisable] = useState(true);

    const { login } = useContext(AuthContext)
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const user = { email, password };
        console.log(user);
        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                swal("Good job!", "Successfully Login Your Account!", "success");
                navigate(from, { replace: true });
            })
            .catch(error => {
                const errorMassage = error.message;
                console.log(errorMassage)
            })



    }

    const handleValidate = (e) => {
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value);
        if (validateCaptcha(user_captcha_value)) {
            setDisable(false);
        }
        else {
            setDisable(true)
        }
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Login now!</h1>

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">

                            <LoadCanvasTemplate />

                            <input type="text" name='capture' onBlur={handleValidate} placeholder="Validate" className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-6">
                            <button disabled={disable} className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className='text-center '><small>Do Not Have Account?  </small><Link className='underline' to={'/register'}>Create a New Account</Link></p>
                    <div className="divider"></div>
                    <SocialAuth></SocialAuth>
                </div>
            </div>
        </div>
    );
};

export default Login;