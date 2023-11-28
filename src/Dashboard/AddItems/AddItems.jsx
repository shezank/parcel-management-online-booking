import React from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../Shard/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../Hooks/useAxiosPublic/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const image_Hosting_Key = import.meta.env.VITE_Image_BB
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_Hosting_Key}`

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const menuItems = {
                name: data.name,
                recipe: data.recipe,
                category: data.catagory,
                price: parseFloat(data.price),
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItems)
            if (menuRes.data.insertedId) {
                reset();
                toast.success(`${data.name} Add Your Manu Items`)
            }
        }
    }

    return (
        <div className='m-10'>
            <SectionTitle
                subHeading={'---What is new?---'}
                heading={'ADD AN ITEM'}
            ></SectionTitle>
            <div className='bg-slate-200 p-20'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            {...register("name", { require: true })}
                            type="text"
                            placeholder="Recipe Mame"
                            className="input input-bordered w-full" />

                    </div>
                    <div className='flex'>
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select default {...register("catagory")} className="select select-bordered w-full max-w-xs">
                                <option disabled defaultValue={'default'}>Selected Product Catagory</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="shop">Shop</option>
                                <option value="dessert">Dessert</option>
                                <option value="drink">Drink</option>
                            </select>

                        </div><div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                {...register("price", { require: true })}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>

                        </label>
                        <textarea
                            {...register("recipe", { require: true })}
                            className="textarea textarea-bordered h-24"
                            placeholder="Recipe Details"></textarea>

                    </div>
                    <input
                        {...register("image", { require: true })}
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs my-8" />

                    <br />
                    <button className='btn btn-outline'>Add Item</button>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddItems;