import React, { useContext } from 'react';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hoocks/useAxiosPublic/useAxiosPublic';
import { ToastContainer, toast } from 'react-toastify';

const image_Hosting_Key = import.meta.env.VITE_Image_BB
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_Hosting_Key}`

const MyProfile = () => {

    const { user, updateUserProfile } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm();
    const axiosPublice = useAxiosPublic();
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublice.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            console.log(res.data.data.display_url);
            updateUserProfile(res.data.data.display_url)
                .then(() => { })
                .catch(error => console.log(error))
        }
        toast.success('Successfully Update Your Profile Photo')
        reset();
    }
    return (

        <div className='bg-slate-200'>
            <div className='max-w-4xl mx-auto my-20'>

                <h1 className='text-center text-3xl font-semibold py-5'>{user ? user.displayName : "Your"} Profile</h1>
                <div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex justify-center my-10 gap-10'>
                            <div>
                                <img className=' bg-black h-40 border-blue-500 border-4' src={user.photoURL} alt="" />
                            </div>

                            <div>
                                <input
                                    {...register("image", { require: true })}

                                    type="file"
                                    className="file-input file-input-bordered my-8" />

                                <br />
                                <button type='submit' className='btn btn-outline'>Update Profile Picture</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MyProfile;