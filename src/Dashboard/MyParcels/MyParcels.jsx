import React, { useContext } from 'react';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hoocks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';


const MyParcels = () => {
    const { user } = useContext(AuthContext);
    const axiosSequre = useAxiosSecure()
    const { data: parcelbooks, refetch } = useQuery({
        queryKey: ['parcelbooks', user.email],
        queryFn: async () => {
            const res = await axiosSequre.get(`/parcelbooks/${user.email}`);

            return res.data;
        }
    })

    const handleCancelStatus = (parcel) => {

        swal({
            title: "Are you sure?",
            text: `You Want To Cancell Your ${parcel.parcelType} Booking`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axiosSequre.patch(`/parcelbooks/statusUpdate/${parcel._id}`)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                refetch()
                                swal(`Your ${parcel.parcelType} Booking has been Cancell!`, {
                                    icon: "success",
                                });
                            }
                        })
                } else {
                    swal(`Your ${parcel.parcelType} Booking is safe!`);
                }
            });
    }

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
                                <th>Parcel Type</th>
                                <th>Requested Delivery Date</th>
                                <th>Booking Date</th>
                                <th>Delivery Men ID</th>
                                <th>Booking Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                parcelbooks?.map((parcelbook, idx) => <tr key={parcelbook._id} className="bg-base-200">
                                    <th>{idx + 1}</th>
                                    <td>{parcelbook.parcelType}</td>
                                    <td>{parcelbook.parcelDeliveryDate}</td>
                                    <td>{(parcelbook.createdAt).slice('T')}</td>
                                    <td>{parcelbook.deliveryManID}</td>
                                    <td className={parcelbook.status === 'Cancel' && 'w-32 text-center text-red-700' || parcelbook.status === 'Pending' && 'w-32 text-center text-blue-600' || parcelbook.status === 'On The Way' && 'w-32 text-center text-green-400' || parcelbook.status === 'Delivery' && 'w-32 text-center text-green-700'}>{parcelbook.status}</td>
                                    <td>
                                        <button onClick={() => handleCancelStatus(parcelbook)} disabled={parcelbook.status !== "Pending"} className='btn mr-2'> Cancel</button>
                                        <Link to={`/dashboard/parcelupdate/${parcelbook._id}`}><button disabled={parcelbook.status !== "Pending"} className='btn'>Update</button></Link>
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

export default MyParcels;