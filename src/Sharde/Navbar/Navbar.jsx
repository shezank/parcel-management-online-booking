import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TrustlineLogo from '../../assets/trustline_logo.jpg'
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAdmin from '../../Hoocks/useAdmin/useAdmin';
import useDeliveryMan from '../../Hoocks/useDeliveryMan/useDeliveryMan';
import useUser from '../../Hoocks/useUser/useUser';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isUser] = useUser();
    const [isAdmin] = useAdmin();
    const [isDeliveryMan] = useDeliveryMan();
    // const isAdmin = true;
    const navlinks = <>
        <NavLink to='/'><li><button className='text-xl font-semibold'>Home</button></li></NavLink>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlinks}
                    </ul>
                </div>
                <img src={TrustlineLogo} alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end">

                {user ? <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                {user ? user?.displayName : 'anynomus'}
                                <span className="badge">New</span>
                            </a>
                        </li>


                        {user ?
                            <>
                                {isAdmin && <Link to='/dashboard/adminHome'><li><button>Dashboard</button></li></Link>}
                                {isUser && <Link to='/dashboard/userHome'><li><button>Dashboard</button></li></Link>}
                                {isDeliveryMan && <Link to='/dashboard/deliveryManHome'><li><button>Dashboard</button></li></Link>}
                            </>
                            :
                            <span className="loading loading-bars loading-lg"></span>

                        }





                        <button onClick={() => logout()}>Logout</button>

                    </ul>
                </div> :
                    <NavLink to='/login'><button className='btn'>Login</button></NavLink>
                }
            </div>
        </div>
    );
};

export default Navbar;