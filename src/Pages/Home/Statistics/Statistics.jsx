import React, { useState } from 'react';
import useAxiosSecure from '../../../Hoocks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hoocks/useAxiosPublic/useAxiosPublic';
import CountUp from 'react-countup';

const Statistics = () => {
   
    const axiosSequre = useAxiosSecure();
    const axiosPublice = useAxiosPublic();
    const {data: Count = {}, users, refetch} = useQuery({
        queryKey: ['count-All'],
        queryFn:  async() =>{
         const res = await axiosPublice.get('/Countall')
         console.log(res.data)
         return res.data;
        
        }
    })

    

    return (
        <div >
            <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-full lg:mx-auto md:px-24 lg:px-8 lg:py-20">
                <div class="flex justify-evenly  grid-cols-2  md:grid-cols-4">
                    <div class="text-center ">
                        <h6 class="text-4xl text-blue-400 font-bold lg:text-5xl xl:text-6xl">
                            
                            <CountUp end={`${Count.bookingsCount}00`} />
                            </h6>
                        <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                            Booking
                        </p>
                    </div>
                    <div class="text-center ">
                        <h6 class="text-4xl  text-blue-400 font-bold lg:text-5xl xl:text-6xl">
                            
                            <CountUp end={`${Count.deliveryCount}00`} />
                            </h6>
                        <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                            Delivered
                        </p>
                    </div>
                    <div class="text-center ">
                        <h6 class="text-4xl  text-blue-400 font-bold lg:text-5xl xl:text-6xl">
                            
                            <CountUp end={`${Count.usersCount}00`} />
                            
                            </h6>
                        <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                            Using Apps
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;