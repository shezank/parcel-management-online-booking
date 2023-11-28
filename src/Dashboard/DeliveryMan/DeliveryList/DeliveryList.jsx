import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hoocks/useAxiosSecure/useAxiosSecure';
import { AuthContext } from '../../../Sharde/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const DeliveryList = () => {

    const { user } = useContext(AuthContext);
    const axiosSequre = useAxiosSecure()
    const { data: parcelbooks, refetch } = useQuery({
        queryKey: ['parcelbooks', user.email],
        queryFn: async () => {
            const res = await axiosSequre.get(`/parcelbooks/deliveryList/${user._id}`);
            console.log(res.data)
            return res.data;
        }
    })
    return (
        <div className='m-5'>
            <h1 className='text-3xl font-bold text-center'>Your Booking Parcel: {parcelbooks?.length} </h1>
            <div className='m-5'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Booking Name</th>
                                <th>Recivers Name</th>
                                <th>Booking Phone No</th>
                                <th>Request Delivery Date</th>
                                <th>Approximate Delivery Date</th>
                                <th>Reciver Phone No</th>
                                <th>Reciver Address</th>
                                <th>View Location Button</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                parcelbooks?.map((parcelbook, idx) => <tr key={parcelbook._id} className="bg-base-200">
                                    <th>{idx + 1}</th>
                                    <td>{parcelbook.Name}</td>
                                    <td>{parcelbook.phone}</td>
                                    <td>{parcelbook.parcelDeliveryDate}</td>
                                    <td>{parcelbook.parcelDeliveryDate}</td>
                                    <td>{parcelbook.parcelDeliveryPrice}</td>
                                    <td className='text-center text-lg font-semibold'>{parcelbook.status}</td>
                                    <td>
                                        {/* <button onClick={() => handleCancelStatus(parcelbook._id)} disabled={parcelbook.status !== "pending"} className='btn mr-2'> Cancel</button> */}
                                        <Link to={`/dashboard/parcelupdate/${parcelbook._id}`}><button disabled={parcelbook.status !== "pending"} className='btn'>Update</button></Link>
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

export default DeliveryList;