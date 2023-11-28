import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from '../../Hoocks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const BookParcel = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [parcelWeight, setParcelWeight] = useState(0);
    const [price, setPrice] = useState(0);
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const handleWeight = e => {
        const weight = e.target.value;
        console.log(weight)
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
    const onSubmit = async (data) => {
        const bookParcel = { ...data, parcelWeight: parcelWeight, parcelDeliveryPrice: price, status: 'Pending' }
        console.log(bookParcel)
        const res = await axiosSecure.post('/parcelBooks', bookParcel)
        if (res.data.insertedId) {
            toast.success(`${user.displayName} Successfully Booking Your Parcel`)
            // reset();
        }

    }
    return (
        <div className='max-w-4xl mx-auto my-20'>
            <h1 className='text-3xl font-semibold text-center mb-10'>Booking Your Parcel</h1>

            <form className='bg-slate-200 p-5 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-5'>
                    {/* Your Booking Name */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Booking name?</span>
                        </label>
                        <input
                            readOnly
                            value={user.displayName}
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
                            readOnly
                            value={user.email}
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
                            placeholder="Your Phone Number"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.phone && errors.phone.type === "required" && (
                            <span className='text-red-500'>Required Your Phone Number</span>
                        )}
                        {errors.phone && errors.phone.type === "maxLength" && (
                            <span className='text-red-500'>Your Number Max Lenght 15 Digit</span>
                        )}
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
                            placeholder="Your Parcel Type"

                            className="input input-bordered w-full max-w-xs" />
                        {errors.parcelType && errors.parcelType.type === "required" && (
                            <span className='text-red-500'>Required Your Parcel Type</span>)}

                    </div>
                    {/* Your Parcel Weight */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Parcel Weight?</span>
                        </label>
                        <input
                            required
                            onChange={handleWeight}
                            type="number"
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
                            placeholder="Receiver’s Name"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.phone && errors.phone.type === "required" && (
                            <span className='text-red-500'>Required Receiver’s Name</span>
                        )}

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
                            placeholder="Receiver's Phone Number"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.reciverPhoneNumber && errors.reciverPhoneNumber.type === "required" && (
                            <span className='text-red-500'>required Receiver's Phone Number</span>)}

                    </div>
                    {/* Parcel Delivery Address */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Parcel Delivery Address?</span>
                        </label>
                        <input

                            {...register("parcelDeliveryAddress", { required: true })}
                            type="text"
                            placeholder="Parcel Delivery Address"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.parcelDeliveryAddress && errors.parcelDeliveryAddress.type === "required" && (
                            <span className='text-red-500'>Required Your Parcel Delivery Address </span>)}
                    </div>
                    {/* Requested Delivery Date */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Parcel Requested Delivery Date?</span>
                        </label>
                        {/* <DatePicker className="input input-bordered w-full max-w-xs" selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                        <input
                            {...register("parcelDeliveryDate")}
                            type="date"
                            defaultValue={startDate}
                            placeholder="Parcel Delivery Address"
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
                            placeholder="Delivery Address Latitude"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.deliveryAddressLatitude && errors.deliveryAddressLatitude.type === "required" && (
                            <span className='text-red-500'>Required Delivery Address Latitude</span>)}

                    </div>
                    {/* Delivery Address longitude */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Delivery Address longitude?</span>
                        </label>
                        <input

                            {...register("deliveryAddressLongitude", { required: true })}
                            type="text"
                            placeholder="Delivery Address longitude"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.deliveryAddressLongitude && errors.deliveryAddressLongitude.type === "required" && (
                            <span className='text-red-500'>Required Your Delivery Address longitude </span>)}
                    </div>
                    {/* Parcel Deliver Price */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Parcel Delivery Price Amount?</span>
                        </label>
                        <input
                            readOnly
                            type="number"
                            value={price}
                            placeholder="Parcel Delivery Price Amount"
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>

                <input className='btn my-5' type="submit" value={"Book"} />
            </form>
            <ToastContainer />
        </div>
    );
};

export default BookParcel;