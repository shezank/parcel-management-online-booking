import React from 'react';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hoocks/useAxiosSecure/useAxiosSecure';
import AdminChart from './AdminChart';

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const { data: parcelDeliveryDates = {} } = useQuery({
        queryKey: ['parcel-Delivery-dates'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcelBooks`);
            console.log(res.data)
            return res.data
        }
    })

    return (
        <div>
            <h1 className='text-2xl font-semibold'>Hi, Welcome {user?.displayName ? user.displayName : 'back'}</h1>
            <div>
                   <AdminChart></AdminChart>
            </div>
        </div>
    );
};

export default AdminHome;