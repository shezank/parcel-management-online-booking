import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../Hoocks/useAxiosSecure/useAxiosSecure';

const DaliveryMans = () => {
    const parcelbooks = ["a", 'b'];

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
            <h1 className='text-3xl font-bold text-center'>Your Booking Parcel: {parcelbooks?.length} </h1>
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
                                <th>Action</th>
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
                                    <td>
                                        {/* <button onClick={() => handleCancelStatus(parcelbook._id)} disabled={parcelbook.status !== "pending"} className='btn mr-2'> Cancel</button> */}
                                        <Link to={`/dashboard/parcelupdate/`}><button className='btn'>Update</button></Link>
                                    </td>
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