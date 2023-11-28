import React, { useState } from 'react';
import useAxiosSecure from '../../Hoocks/useAxiosSecure/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

const UpdateBooking = () => {
    const parcel = useLoaderData();
    const [parcelWeight, setParcelWeight] = useState(0);
    const [price, setPrice] = useState(0);

    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();


    const handleWeight = e => {
        const weight = e.target.value;
        if (weight <= 2) {
            const parcelPrice = weight * 50;
            setPrice(parcelPrice)
        }
        else if (weight > 2) {
            const parcelPrice = weight * 150;
            setPrice(parcelPrice)
        }
        setParcelWeight(weight);
    }

    const onSubmit = (data) => {
        console.log(data.parcelDeliveryPrice);
        const parcelUpdate = { ...data, parcelWeight: parcelWeight, status: parcel.status, parcelDeliveryPrice: price? price : data.parcelDeliveryPrice }
        console.log(parcelUpdate)
        axiosSecure.patch(`/parcelBooks/${parcel._id}`, parcelUpdate)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success(`${data.Name} Update Your Booking Information`)
                }
            })
    }
    return (
        <div className='max-w-4xl mx-auto my-20'>
            <h1 className='text-3xl font-semibold text-center mb-10'>Update Your Parcel Booking</h1>
            <form className='bg-slate-200 p-5 rounded-lg' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex gap-5'>
                    {/* Your Booking Name */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Booking name?</span>
                        </label>
                        <input

                            value={parcel.Name}
                            {...register("Name")}
                            type="text"


                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    {/* Your Email Address */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Email?</span>
                        </label>
                        <input

                            value={parcel.email}
                            {...register("email")}
                            type="text"
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    {/* Your Phone Number */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Phone Number?</span>
                        </label>
                        <input
                            {...register("phone", { required: true, maxLength: 15 })}
                            type="text"
                            value={parcel.phone}
                            placeholder="Your Phone Number"
                            className="input input-bordered w-full max-w-xs" />

                    </div>
                </div>
                <div className='flex gap-5'>
                    {/* Your Parcel Type */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Parcel Type?</span>
                        </label>
                        <input

                            {...register("parcelType", { required: true })}
                            type="text"
                            value={ parcel.parcelType}
                            placeholder="Your Parcel Type"

                            className="input input-bordered w-full max-w-xs" />

                    </div>
                    {/* Your Parcel Weight */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Parcel Weight?</span>
                        </label>
                        <input
                            onChange={handleWeight}
                            type="number"
                            Value={parcelWeight? parcelWeight : parcel.parcelWeight}
                            placeholder="Your Parcel Weight"
                            className="input input-bordered w-full max-w-xs" />

                    </div>
                    {/* Receiver’s Name */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Receiver’s Name?</span>
                        </label>
                        <input
                            {...register("reciverName", { required: true })}
                            type="text"
                            value={parcel.reciverName}
                            placeholder="Receiver’s Name"
                            className="input input-bordered w-full max-w-xs" />

                    </div>
                </div>
                <div className='flex gap-5'>
                    {/* Receiver's Phone Number */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Receiver's Phone Number?</span>
                        </label>
                        <input

                            {...register("reciverPhoneNumber", { required: true })}
                            type="text"
                            value={parcel.reciverPhoneNumber}
                            placeholder="Receiver's Phone Number"
                            className="input input-bordered w-full max-w-xs" />

                    </div>
                    {/* Parcel Delivery Address */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Parcel Delivery Address?</span>
                        </label>
                        <input

                            {...register("parcelDeliveryAddress", { required: true })}
                            type="text"
                            value={parcel.parcelDeliveryAddress}
                            placeholder="Parcel Delivery Address"
                            className="input input-bordered w-full max-w-xs" />

                    </div>
                    {/* Requested Delivery Date */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Parcel Requested Delivery Date?</span>
                        </label>
                        <input
                        {...register("parcelDeliveryDate", { required: true })}
                            type="text"
                            value={parcel.parcelDeliveryDate}
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>
                <div className='flex gap-5'>
                    {/* Delivery Address Latitude */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Delivery Address Latitude?</span>
                        </label>
                        <input

                            {...register("deliveryAddressLatitude", { required: true })}
                            type="text"
                            value={parcel.deliveryAddressLatitude}
                            placeholder="Delivery Address Latitude"
                            className="input input-bordered w-full max-w-xs" />

                    </div>
                    {/* Delivery Address longitude */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Delivery Address longitude?</span>
                        </label>
                        <input

                            {...register("deliveryAddressLongitude", { required: true })}
                            type="text"
                            value={parcel.deliveryAddressLongitude}
                            placeholder="Delivery Address longitude"
                            className="input input-bordered w-full max-w-xs" />

                    </div>
                    {/* Parcel Deliver Price */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Parcel Delivery Price Amount?</span>
                        </label>
                        <input
                            readOnly
                            type="number"
                            {...register("parcelDeliveryPrice")}
                            value={price ? price : parcel?.parcelDeliveryPrice}
                            placeholder="Parcel Delivery Price Amount"
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>

                <input className='btn my-5' type="submit" value={"Update Booking"} />
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateBooking;