import React, { useContext } from 'react';
import { FaBookOpen, FaCartArrowDown, FaFirstOrder, FaHome, FaIceCream, FaList, FaRProject, FaRunning, FaStar, FaStreetView, FaUser, FaUserCircle, FaWallet } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hoocks/useAdmin/useAdmin';

import useDeliveryMan from '../Hoocks/useDeliveryMan/useDeliveryMan';
import useUser from '../Hoocks/useUser/useUser';


const Dashboard = () => {
    const [isUser] = useUser();
    const [isAdmin] = useAdmin()
    const [isDeliveryMan] = useDeliveryMan();
    return (
        <div className='flex'>
            <div className='w-72 min-h-screen bg-red-500'>
                <h1 className='text-center text-2xl text-white'>Bistro Boss Dashboard</h1>
                <ul className='menu space-y-5'>
                    {isAdmin && <>
                        <li className='bg-slate-100 text-xl font-bold'><NavLink to='/dashboard/adminHome'> <FaHome></FaHome> Admin </NavLink></li>
                        <li className='bg-slate-100 text-xl font-bold'><NavLink to='/dashboard/allparcel'> <FaBookOpen></FaBookOpen>Parcels</NavLink></li>
                        <li className='bg-slate-100 text-xl font-bold'><NavLink to='/dashboard/deliverymans'> <FaRunning></FaRunning> Delivery Mans</NavLink></li>
                        <li className='bg-slate-100 text-xl font-bold'><NavLink to='/dashboard/allusers'> <FaUser></FaUser>Users</NavLink></li>
                        <hr />
                        <li className='bg-slate-100 text-xl font-bold'><NavLink to='/'> <FaHome></FaHome> Home</NavLink></li>
                        
                    </>
                    }
                    {isUser &&
                        <>
                            <li className='bg-slate-100 text-xl font-bold'><NavLink className='rounded-none' to='/dashboard/userHome'> <FaHome></FaHome> User </NavLink></li>
                            <li className='bg-slate-100 text-xl font-bold'><NavLink className='rounded-none' to='/dashboard/myProfile'> <FaUserCircle></FaUserCircle> My Profile </NavLink></li>
                            <li className='bg-slate-100 text-xl font-bold'><NavLink className='rounded-none' to='/dashboard/bookParcel'> <FaBookOpen></FaBookOpen> Book A Parcel </NavLink></li>
                            <li className='bg-slate-100 text-xl font-bold'><NavLink className='rounded-none' to='/dashboard/myParcel'> <FaFirstOrder></FaFirstOrder> My Parcel </NavLink></li>

                            <hr />
                            <li className='bg-slate-100 text-xl font-bold'><NavLink className='rounded-none' to='/'> <FaHome></FaHome> Home</NavLink></li>
                            
                        </>}
                    {isDeliveryMan &&
                        <>
                            <li className='bg-slate-100 text-xl font-bold'><NavLink className='rounded-none' to='/dashboard/deliveryManHome'> <FaHome></FaHome> Home </NavLink></li>
                            <li className='bg-slate-100 text-xl font-bold'><NavLink className='rounded-none' to='/dashboard/deliveryList'> <FaList></FaList> Delivery List </NavLink></li>
                            <li className='bg-slate-100 text-xl font-bold'><NavLink className='rounded-none' to='/dashboard/reviews'> <FaStar></FaStar> Review </NavLink></li>


                            <hr />
                            <li className='bg-slate-100 text-xl font-bold'><NavLink className='rounded-none' to='/'> <FaHome></FaHome> Home</NavLink></li>
                            
                        </>}


                </ul>
            </div>
            <div className='flex-1 bg-blue-200'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;