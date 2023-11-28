import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hoocks/useAxiosSecure/useAxiosSecure';

const DaliveryMans = () => {
    

    const deliverManRole = "Delivery Man";
    const axisoSecure = useAxiosSecure();
    const { data: deliveryMans } = useQuery({
        queryKey: ["delivery-Mans", deliverManRole],
        queryFn: async () => {
            const res = await axisoSecure.get(`/users/${deliverManRole}`)
            console.log(deliveryMans);
            return res.data;
        }
    })
    return (
        <div className='m-10'>
            <h1 className='text-3xl font-bold text-center'>Your Booking Parcel: {deliveryMans?.length} </h1>
            <div className='m-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Delivery Man's Name</th>
                                <th>Phone No</th>
                                <th>Number of parcel delivered</th>
                                <th>Average review</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                deliveryMans?.map((deliveryMan, idx) => <tr key={deliveryMan?._id} className="bg-base-200">
                                    <th>{idx +1}</th>
                                    <td>{deliveryMan?.name}</td>
                                    <td>{deliveryMan?.phone}</td>
                                    <td>Total Delivery</td>
                                    <td>Review</td>
                                    
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DaliveryMans;