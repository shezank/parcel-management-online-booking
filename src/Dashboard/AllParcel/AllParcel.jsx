import React from 'react';
import useAxiosSecure from '../../Hoocks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const AllParcel = () => {
    const [id, setId] = useState('');
    const axiosSequre = useAxiosSecure()
    const { data: parcelbooks, refetch } = useQuery({
        queryKey: ['parcelbooks'],
        queryFn: async () => {
            const res = await axiosSequre.get(`/parcelbooks`);
            console.log(res.data)
            return res.data;
        }
    })

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

    const handleCancelStatus = (id) => {
        axiosSequre.patch(`/parcelbooks/statusUpdate/${id}`)
            .then(res => {
                console.log(res.data)
                refetch()
            })

    }

    const handeleAssign = async (e) => {
        e.preventDefault();
        const form = e.target;
        const status = 'On The Way';
        const date = form.date.value;
        const parcelId = form.parcelId.value;
        const assign = { approximateDeliveryDate: date, status, deliveryManID: id };
        console.log(assign);
        const res = await axiosSequre.patch(`/parcelBooks/assign/${parcelId}`, assign)
        console.log(res.data);
        if (res.data.modifiedCount) {
            toast.success(`${user.displayName} Successfully Booking Your Parcel`)
            reset();
        }

    }


    const handelDeliveryManId = e => {
        const val = e.target.value;
        console.log(val);
        setId(val);

    }

    return (
        <div className='m-10'>
            <h1 className='text-3xl font-bold text-center'>User Booking Parcel: {parcelbooks?.length} </h1>
            <div className='m-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Booking User</th>
                                <th>Booking Phone No</th>
                                <th>Booking Date</th>
                                <th>Request Delivery Date</th>
                                <th>Cost</th>
                                <th>Status</th>
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
                                    <td>{parcelbook.createdAt}</td>
                                    <td>{parcelbook.parcelDeliveryDate}</td>
                                <td>{parcelbook.parcelDeliveryPrice}</td>
                                    <td className={parcelbook.status === 'Cancel' && 'w-32 text-center text-red-700' || parcelbook.status === 'Pending' && 'w-32 text-center text-blue-600' || parcelbook.status === 'On The Way' && 'w-32 text-center text-green-400' || parcelbook.status === 'Delivery' && 'w-32 text-center text-green-700'}>{parcelbook.status}</td>
                                    <td>
                                        {/* <button onClick={() => handleCancelStatus(parcelbook._id)} disabled={parcelbook.status !== "pending"} className='btn mr-2'> Cancel</button> */}
                                        <button className="btn" onClick={() => document.getElementById(parcelbook._id).showModal()}>Manage</button>
                                        {/* You can open the modal using document.getElementById('ID').showModal() method */}

                                        <dialog id={parcelbook._id} className="modal">
                                            <div className="modal-box">
                                                <h1 className='text-center text-xl font-semibold my-5'>Mange Delivery: {parcelbook.Name}</h1>
                                                <form onSubmit={handeleAssign} method="dialog">

                                                    {/* if there is a button in form, it will close the modal */}
                                                    <div className="form-control  w-full max-w-xl ">
                                                        <label className="label">
                                                            <span className="label-text">Parcel Reciver User Id?</span>
                                                        </label>
                                                        <input
                                                            readOnly
                                                            value={parcelbook._id}
                                                            name='parcelId'
                                                            className="input input-bordered w-full" />
                                                    </div>
                                                    <div className='flex gap-5'>

                                                        {/* Parcel Delivery Man */}
                                                        <div className="form-control w-full max-w-xs">

                                                            <label className="label">
                                                                <span className="label-text">Select Delivery Man?</span>
                                                            </label>

                                                            <select value={id} onChange={handelDeliveryManId} className="input input-bordered w-full max-w-xs">
                                                                {
                                                                    deliveryMans.map(man => <option key={man._id} value={man._id}>{man.name}</option>)
                                                                }

                                                            </select>

                                                        </div>

                                                        {/* Requested Delivery Date */}
                                                        <div className="form-control w-full max-w-xs">
                                                            <label className="label">
                                                                <span className="label-text">Approximate delivery date?</span>
                                                            </label>
                                                            <input
                                                                name='date'
                                                                type="date"
                                                                className="input input-bordered w-full max-w-xs" />
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-center mt-5'>
                                                        <input className='btn text-center' type="submit" value='Assign' />
                                                    </div>
                                                </form>
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>

                                                <p className="py-4"> HINT: Press ESC key or click on ✕ button to close</p>

                                            </div>
                                        </dialog>
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

export default AllParcel;