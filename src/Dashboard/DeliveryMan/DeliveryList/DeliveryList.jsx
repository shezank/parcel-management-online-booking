import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hoocks/useAxiosSecure/useAxiosSecure';
import { AuthContext } from '../../../Sharde/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hoocks/useAxiosPublic/useAxiosPublic';
import LocationMap from './LocationMap';

const DeliveryList = () => {

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSequre = useAxiosSecure()
    const { data: parcelbooks, refetch } = useQuery({
        queryKey: ['parcelbooks', user.email],
        queryFn: async () => {
            const userMan = await axiosPublic.get(`/users/delimeryman/${user.email}`)
            console.log(userMan.data._id)
            const res = await axiosSequre.get(`/parcelbooks/deliveryList/${userMan.data._id}`);
            console.log(res.data)
            return res.data;
        }
    })

    const handleDeliverylStatus = (parcel) => {
        axiosSequre.patch(`/parcelbooks/statusUpdate/delivery/${parcel._id}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    swal(`Your ${parcel.parcelType} Booking has been Delivered!`, {
                        icon: "success",
                    });
                }
            })
    }


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
                                    <td>{parcelbook.reciverName}</td>
                                    <td>{parcelbook.phone}</td>
                                    <td>{parcelbook.parcelDeliveryDate}</td>
                                    <td>{parcelbook.approximateDeliveryDate}</td>
                                    <td>{parcelbook.reciverPhoneNumber}</td>
                                    <td>{parcelbook.parcelDeliveryAddress}</td>
                                    <td>
                                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                        <button className="btn btn-success text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>See Location</button>
                                        <dialog id="my_modal_3" className="modal">
                                            <div className="modal-box">
                                                <LocationMap></LocationMap>
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                                <h3 className="font-bold text-lg">Hello!</h3>
                                                <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                            </div>
                                        </dialog>
                                    </td>
                                    <td>
                                        <button onClick={() => handleCancelStatus(parcelbook)} disabled={parcelbook.status === "Delivered"} className='btn btn-primary mr-2'> Cancel</button>
                                    </td>
                                    <td> <button onClick={() => handleDeliverylStatus(parcelbook)} disabled={parcelbook.status === "Delivered"} className='btn btn-accent mr-2 text-white'>Delivered</button></td>
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